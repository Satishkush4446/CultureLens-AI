import axios from 'axios';
import { buildCulturePrompt } from './promptBuilder';

// Safe check environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const OPENTRIPMAP_API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY || '';

/**
 * Geocodes a place name into coordinates using OpenStreetMap Nominatim (Free, no key)
 */
export const geocodeDestination = async (query) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: query,
        format: 'json',
        limit: 1,
      },
      headers: {
        'User-Agent': 'CultureLensAI-Hackathon/1.0',
      }
    });

    if (response.data && response.data.length > 0) {
      const result = response.data[0];
      return {
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        displayName: result.display_name,
      };
    }
    throw new Error('Destination not found. Please try a different name.');
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error(error.response?.data?.message || 'Geocoding failed. Check connection.');
  }
};

/**
 * Fetches 7-day weather forecast from Open-Meteo (Free, no key)
 */
export const fetchWeather = async (lat, lon) => {
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode',
        timezone: 'auto',
      }
    });

    const daily = response.data.daily;
    if (daily) {
      // Calculate a quick aggregate summary to feed into Gemini
      const maxTemp = Math.max(...daily.temperature_2m_max);
      const minTemp = Math.min(...daily.temperature_2m_min);
      const rainProb = Math.max(...daily.precipitation_probability_max);
      
      const forecastDays = daily.time.map((time, idx) => ({
        date: time,
        maxTemp: daily.temperature_2m_max[idx],
        minTemp: daily.temperature_2m_min[idx],
        rainProb: daily.precipitation_probability_max[idx],
        weatherCode: daily.weathercode[idx],
      }));

      return {
        summary: { maxTemp, minTemp, rainProb },
        forecast: forecastDays,
      };
    }
    return null;
  } catch (error) {
    console.error('Weather API error:', error);
    return null; // Graceful fallback
  }
};

/**
 * Fetches cultural & historical POIs using OpenTripMap (Free tier)
 * Or generates high-quality fallbacks if key is missing or API errors.
 */
export const fetchOpenTripGems = async (lat, lon, destinationName = '') => {
  if (!OPENTRIPMAP_API_KEY) {
    console.warn('OpenTripMap key missing. Using simulated gems.');
    return getFallbackGems(lat, lon, destinationName);
  }

  try {
    const response = await axios.get('https://api.opentripmap.com/0.1/en/places/radius', {
      params: {
        radius: 8000, // 8km radius
        lon: lon,
        lat: lat,
        kinds: 'museums,historic,cultural,religion,monuments,architecture',
        limit: 15,
        apikey: OPENTRIPMAP_API_KEY,
      }
    });

    if (response.data && response.data.features && response.data.features.length > 0) {
      return response.data.features.map(feature => ({
        name: feature.properties.name || 'Unnamed Historic Site',
        lat: feature.geometry.coordinates[1],
        lon: feature.geometry.coordinates[0],
        kinds: feature.properties.kinds || 'cultural',
        rate: feature.properties.rate || 1,
      })).filter(gem => gem.name !== 'Unnamed Historic Site');
    }
    
    return getFallbackGems(lat, lon, destinationName);
  } catch (error) {
    console.error('OpenTripMap API error:', error);
    return getFallbackGems(lat, lon, destinationName);
  }
};

/**
 * Simulates high-quality, geographically localized fallback points.
 * Ensures the Map is populated and beautiful even without a key.
 */
const getFallbackGems = (lat, lon, destinationName) => {
  const categories = ['temple', 'museum', 'monument', 'landmark', 'garden'];
  const baseName = destinationName.split(',')[0];
  
  return [
    {
      name: `${baseName} Cultural Heritage Center`,
      lat: lat + 0.005,
      lon: lon + 0.003,
      kinds: 'museums,cultural',
      rate: 3,
    },
    {
      name: `Old Town Ancient Square`,
      lat: lat - 0.004,
      lon: lon - 0.006,
      kinds: 'historic,architecture',
      rate: 3,
    },
    {
      name: `Sanctuary of Local Spirits`,
      lat: lat + 0.002,
      lon: lon - 0.004,
      kinds: 'religion,historic',
      rate: 2,
    },
    {
      name: `Imperial Garden Vista`,
      lat: lat - 0.003,
      lon: lon + 0.005,
      kinds: 'nature,monuments',
      rate: 2,
    },
    {
      name: `Artisanal Craft Market`,
      lat: lat + 0.006,
      lon: lon - 0.002,
      kinds: 'cultural,architecture',
      rate: 2,
    }
  ];
};

/**
 * Request structured trip planning from Gemini API
 */
export const generateCulturalItinerary = async (destination, duration, interests, weatherSummary) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API Key is missing. Please set VITE_GEMINI_API_KEY in your environment variables.');
  }

  const prompt = buildCulturePrompt(destination, duration, interests, weatherSummary);

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const candidates = response.data?.candidates;
    if (candidates && candidates.length > 0) {
      let rawText = candidates[0].content?.parts[0]?.text;
      if (rawText) {
        // Strip out any markdown code blocks (e.g. ```json ... ```)
        rawText = rawText.trim();
        if (rawText.startsWith('```json')) {
          rawText = rawText.substring(7);
        } else if (rawText.startsWith('```')) {
          rawText = rawText.substring(3);
        }
        if (rawText.endsWith('```')) {
          rawText = rawText.substring(0, rawText.length - 3);
        }
        rawText = rawText.trim();

        try {
          const parsedData = JSON.parse(rawText);
          return parsedData;
        } catch (jsonErr) {
          console.error('Failed to parse Gemini output as JSON:', rawText);
          throw new Error('The AI generated a response that could not be parsed. Please try again.');
        }
      }
    }
    throw new Error('No content returned from Gemini.');
  } catch (error) {
    console.error('Gemini generateContent error:', error);
    throw new Error(error.response?.data?.error?.message || error.message || 'Gemini generation failed.');
  }
};
