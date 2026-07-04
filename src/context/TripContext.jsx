/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';
import { geocodeDestination, fetchWeather, fetchOpenTripGems, generateCulturalItinerary } from '../services/api';

const TripContext = createContext();
export const useTrip = () => useContext(TripContext);

// ── Rich demo data shown when API fails or key is missing ──────────────────
const DEMO_TRIP_DATA = {
  destination: {
    name: 'Kyoto',
    country: 'Japan',
    summary: 'A city where centuries of imperial history, Zen philosophy, and meticulous artistry converge in every temple garden and tea house.',
  },
  story: `Kyoto whispers its stories through centuries of carefully preserved tradition. Once Japan's imperial capital for over a millennium, it breathes with a quiet dignity found nowhere else on Earth. Every moss-covered stone pathway, every bamboo grove, and every precisely raked Zen garden carries the weight of a thousand years of culture.\n\nTo walk through Kyoto's Higashiyama district at dawn, before the tour groups arrive, is to step directly into another era. Geiko still traverse ancient alleyways in traditional attire, artisan workshops still produce the same Nishiki textiles they have for generations, and temple bells still mark the rhythm of daily life as they have since the 8th century.`,
  funFacts: [
    'Kyoto was removed from the atomic bomb target list in 1945 partly because US Secretary of War Henry Stimson had honeymooned there and personally intervened.',
    'The city has over 1,600 Buddhist temples and 400 Shinto shrines — more than any comparable city on Earth.',
    'The word "Kyoto" literally means "Capital City" — when the capital moved to Tokyo in 1869, the new city was named "Eastern Capital" to distinguish it.',
  ],
  etiquette: [
    { do: 'Bow slightly when greeting — a 15-degree bow is appropriate for strangers.', dont: 'Never tip in restaurants or taxis — it is considered rude in Japanese culture.', context: "Japan's culture of omotenashi (selfless hospitality) means service is given with pride, not for monetary reward." },
    { do: 'Remove shoes before entering homes, ryokan, or temple interiors.', dont: 'Do not eat or drink while walking — it is considered impolite in public spaces.', context: 'Public decorum and cleanliness are deeply embedded Japanese social values dating back to Edo-period civic codes.' },
    { do: 'Queue patiently in single-file lines for trains, escalators, and shops.', dont: 'Do not speak loudly on public transport — silence or very quiet voices are expected.', context: 'Japanese public transport culture prizes collective comfort — phone calls in particular are considered anti-social.' },
  ],
  itinerary: [
    {
      day: 1,
      theme: 'Imperial Gardens & Zen Philosophy',
      morning: { activity: 'Visit Kinkaku-ji (Golden Pavilion) before 8am to see it mirrored in the still pond without crowds.', location: 'Kinkaku-ji Temple', culturalSignificance: 'Built in 1397 as a retirement villa for Shogun Ashikaga Yoshimitsu, it represents the pinnacle of Muromachi-period architectural beauty.' },
      afternoon: { activity: 'Explore the dry rock garden at Ryoan-ji and meditate on the arrangement of 15 stones.', location: 'Ryoan-ji Zen Garden', culturalSignificance: 'Dating to the late 15th century, this garden is considered the finest example of kare-sansui (dry landscape) design in the world.' },
      evening: { activity: 'Wander through the Gion district at twilight and observe geiko on their way to ochaya tea houses.', location: 'Gion District', culturalSignificance: "Gion has been Kyoto's geisha district since the 17th century, representing the living preservation of classical Japanese performing arts." },
    },
    {
      day: 2,
      theme: 'Bamboo Groves & Mountain Shrines',
      morning: { activity: 'Walk the Arashiyama Bamboo Grove at first light — the sound of wind through bamboo is surreal.', location: 'Arashiyama Bamboo Grove', culturalSignificance: 'Bamboo forests hold deep significance in Japanese culture, symbolizing strength, flexibility, and longevity.' },
      afternoon: { activity: 'Hike the 10,000 torii gates of Fushimi Inari-taisha up Mount Inari.', location: 'Fushimi Inari Shrine', culturalSignificance: 'Founded in 711 AD and dedicated to Inari, the Shinto god of rice and commerce. Each gate is donated by a Japanese business.' },
      evening: { activity: 'Experience a traditional kaiseki dinner at a riverside restaurant in Pontocho Alley.', location: 'Pontocho Alley', culturalSignificance: "Pontocho has been Kyoto's finest dining street since the 17th century, famed for atmospheric restaurants and geiko culture." },
    },
    {
      day: 3,
      theme: 'Temples, Tofu & Tea Ceremony',
      morning: { activity: 'Visit Nijo Castle and listen to the famous "nightingale floors" squeak underfoot as a security system.', location: 'Nijo Castle', culturalSignificance: 'Built in 1603 for Shogun Tokugawa Ieyasu, the floor design was intentional — it made silent approach by assassins impossible.' },
      afternoon: { activity: 'Participate in an authentic matcha tea ceremony with a licensed tea master.', location: 'En tea ceremony house', culturalSignificance: "The Way of Tea (Chado) was codified in the 16th century by master Sen no Rikyu, who elevated a simple act into Japan's highest art form." },
      evening: { activity: 'Visit the Philosopher\'s Path as fireflies emerge along the canal at dusk.', location: "Philosopher's Path", culturalSignificance: 'Named after philosopher Nishida Kitaro who walked this route in meditation daily — lined with 500 cherry trees and historical temples.' },
    },
  ],
  food: [
    { name: 'Kaiseki Ryori', description: 'A multi-course haute cuisine with 7-12 courses highlighting seasonal ingredients, impeccable presentation, and centuries of culinary tradition.', category: 'Traditional Dish', whyTry: 'Considered the apex of Japanese culinary art — each plate reflects deep aesthetic principles of color, flavor, and seasonality.' },
    { name: 'Yudofu (Hot Tofu)', description: 'Silken tofu gently simmered in kombu broth, served with dipping sauces — a Zen Buddhist temple staple from Nanzen-ji.', category: 'Traditional Dish', whyTry: 'Born directly from monastery kitchens, this represents centuries of shojin ryori plant-based culinary philosophy.' },
    { name: 'Matcha Parfait', description: 'Layers of ceremonial-grade matcha ice cream, red bean paste, mochi, and crunchy toppings in a tall glass.', category: 'Street Food', whyTry: "Kyoto's tea culture dates to 1191 AD when monks brought powdered green tea from China — this modern treat honors that heritage." },
    { name: 'Sake from Fushimi', description: "Light, delicate sake produced in Fushimi district using the region's uniquely soft spring water.", category: 'Local Beverage', whyTry: 'Fushimi has been producing sake for over 400 years — the soft water creates a distinctively smooth, refined taste profile.' },
  ],
  packing: [
    { category: 'Clothing', items: ['Comfortable walking shoes (cobblestone paths need support)', 'Lightweight breathable layers', 'Respectful attire for temple visits (covered shoulders/knees)', 'Compact rain jacket or umbrella', 'Socks without holes (removing shoes is frequent)'] },
    { category: 'Essentials', items: ['IC Card (Suica/ICOCA) for trains', 'Cash in yen (many traditional places are cash-only)', 'Pocket hand towel (restrooms often lack paper towels)', 'Small day bag for temple hopping', 'Insect repellent for bamboo grove walks'] },
    { category: 'Tech & Accessories', items: ['Universal Japan Type A/B adapter', 'Portable phone charger', 'Offline maps downloaded (Google Maps)', 'Google Translate with Japanese downloaded offline'] },
    { category: 'Documents', items: ['Passport + 2 photocopies', 'Japan tourist visa if applicable', 'Travel insurance documents', 'Hotel booking confirmations (printed)', 'Emergency contact card in Japanese'] },
  ],
};

const DEMO_GEMS = [
  { name: 'Kinkaku-ji (Golden Pavilion)', lat: 35.0394, lon: 135.7292, kinds: 'historic,monuments', rate: 3, description: 'Iconic three-story golden pavilion reflecting in Mirror Pond — a UNESCO World Heritage Site.' },
  { name: 'Fushimi Inari Shrine', lat: 34.9671, lon: 135.7727, kinds: 'religion,cultural', rate: 3, description: '10,000 vermillion torii gates winding up Mount Inari — open 24 hours with breathtaking night views.' },
  { name: 'Ryoan-ji Zen Garden', lat: 35.0345, lon: 135.7182, kinds: 'historic,cultural', rate: 3, description: 'World-famous dry rock garden with 15 stones — only 14 visible from any single viewpoint.' },
  { name: 'Arashiyama Bamboo Grove', lat: 35.0167, lon: 135.6714, kinds: 'nature,cultural', rate: 2, description: 'A dense forest of towering bamboo with an otherworldly sound when wind passes through.' },
  { name: 'Nijo Castle', lat: 35.0142, lon: 135.7481, kinds: 'historic,architecture', rate: 2, description: '17th-century shogun castle with famous nightingale floors that squeak to warn of intruders.' },
];

const DEMO_WEATHER = {
  summary: { maxTemp: 32, minTemp: 22, rainProb: 45 },
  forecast: [
    { date: '2026-07-04', maxTemp: 32, minTemp: 23, rainProb: 30, weatherCode: 2 },
    { date: '2026-07-05', maxTemp: 30, minTemp: 22, rainProb: 60, weatherCode: 61 },
    { date: '2026-07-06', maxTemp: 28, minTemp: 21, rainProb: 80, weatherCode: 65 },
    { date: '2026-07-07', maxTemp: 31, minTemp: 22, rainProb: 20, weatherCode: 1 },
    { date: '2026-07-08', maxTemp: 34, minTemp: 24, rainProb: 10, weatherCode: 0 },
    { date: '2026-07-09', maxTemp: 33, minTemp: 23, rainProb: 15, weatherCode: 0 },
    { date: '2026-07-10', maxTemp: 29, minTemp: 21, rainProb: 50, weatherCode: 51 },
  ],
};

const DEMO_COORDS = { lat: 35.0116, lon: 135.7681, displayName: 'Kyoto, Japan' };
// ──────────────────────────────────────────────────────────────────────────

export const TripProvider = ({ children }) => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState(5);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [error, setError] = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  const [coords, setCoords] = useState(null);
  const [tripData, setTripData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [gems, setGems] = useState([]);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [activePin, setActivePin] = useState(null);

  const startNewTrip = () => {
    setTripData(null);
    setWeatherData(null);
    setGems([]);
    setCoords(null);
    setError(null);
    setIsDemo(false);
    setActiveTab('itinerary');
    setActivePin(null);
  };

  // Load demo data with a realistic delay so the loader is visible
  const activateDemoMode = (searchDest, searchDuration, searchInterests, navigate) => {
    setIsDemo(true);
    const destName = searchDest || 'Kyoto';
    setLoadingStatus('Loading cultural intelligence (Demo Mode)...');
    setTimeout(() => {
      setDestination(destName);
      setDuration(searchDuration);
      setInterests(searchInterests);
      const days = Math.max(1, Math.min(searchDuration, DEMO_TRIP_DATA.itinerary.length));
      setTripData({
        ...DEMO_TRIP_DATA,
        destination: { ...DEMO_TRIP_DATA.destination, name: destName },
        itinerary: DEMO_TRIP_DATA.itinerary.slice(0, days),
      });
      setWeatherData(DEMO_WEATHER);
      setGems(DEMO_GEMS);
      setCoords(DEMO_COORDS);
      setLoading(false);
      setLoadingStatus('');
      navigate('/dashboard');
    }, 2000);
  };

  const executeSearch = async (searchDest, searchDuration, searchInterests, navigate) => {
    setLoading(true);
    setError(null);
    startNewTrip();
    setDestination(searchDest);
    setDuration(searchDuration);
    setInterests(searchInterests);

    const hasGeminiKey = !!import.meta.env.VITE_GEMINI_API_KEY;
    if (!hasGeminiKey) {
      activateDemoMode(searchDest, searchDuration, searchInterests, navigate);
      return;
    }

    try {
      setLoadingStatus('Locating destination on the map...');
      const location = await geocodeDestination(searchDest);
      setCoords({ lat: location.lat, lon: location.lon, displayName: location.displayName });

      setLoadingStatus('Fetching weather forecast & nearby attractions...');
      const [weatherResult, gemsResult] = await Promise.allSettled([
        fetchWeather(location.lat, location.lon),
        fetchOpenTripGems(location.lat, location.lon, searchDest),
      ]);

      const weather = weatherResult.status === 'fulfilled' ? weatherResult.value : null;
      const gemsData = gemsResult.status === 'fulfilled' ? gemsResult.value : [];
      setWeatherData(weather);
      setGems(gemsData);

      setLoadingStatus('AI Cultural Ambassador is crafting your journey...');
      const aiData = await generateCulturalItinerary(
        searchDest, searchDuration, searchInterests, weather?.summary || null
      );

      setTripData(aiData);
      setLoading(false);
      setLoadingStatus('');
      navigate('/dashboard');
    } catch (err) {
      console.error('Trip generation error:', err.message);
      // Gracefully fall back to demo instead of crashing
      activateDemoMode(searchDest, searchDuration, searchInterests, navigate);
    }
  };

  return (
    <TripContext.Provider value={{
      destination, duration, interests,
      loading, loadingStatus, error, isDemo,
      coords, tripData, weatherData, gems,
      activeTab, activePin,
      setActiveTab, setActivePin,
      executeSearch, startNewTrip, setError,
    }}>
      {children}
    </TripContext.Provider>
  );
};
