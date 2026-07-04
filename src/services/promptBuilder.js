/**
 * Builds the structured prompt for the Gemini API.
 * Injects user inputs and weather forecast summaries to request a clean, parseable JSON response.
 */
export const buildCulturePrompt = (destination, duration, interests, weatherSummary = null) => {
  const interestsList = interests && interests.length > 0 ? interests.join(', ') : 'general sightseeing';
  
  let weatherContext = '';
  if (weatherSummary) {
    weatherContext = `The current 7-day weather forecast is: Max Temp ${weatherSummary.maxTemp}°C, Min Temp ${weatherSummary.minTemp}°C, Rain Probability ${weatherSummary.rainProb}%. `;
  }

  return `
You are a native cultural ambassador, expert local historian, and professional travel curator.
Create a highly authentic, culturally rich travel experience for a visit to "${destination}" for a duration of ${duration} days, focusing on these interests: ${interestsList}.
${weatherContext}

Your response MUST be a single, valid JSON object with EXACTLY the following structure, and NO other text, markdown formatting, or HTML tags outside of the JSON structure itself. Do not wrap the JSON in \`\`\`json \`\`\` code block backticks. Simply return the raw JSON text.

JSON Schema:
{
  "destination": {
    "name": "Name of the destination",
    "country": "Name of the country",
    "summary": "A 1-sentence cultural summary"
  },
  "story": "A beautiful, immersive 2-paragraph narrative describing the destination's cultural soul, history, and modern identity, written in an engaging, poetic style.",
  "funFacts": [
    "Fact 1: A surprising, lesser-known historical or cultural fact about this place.",
    "Fact 2: Another surprising historical or cultural fact.",
    "Fact 3: A third unique cultural fact."
  ],
  "etiquette": [
    {
      "do": "Cultural DO action (e.g. 'Remove shoes before entering temples')",
      "dont": "Cultural DONT action (e.g. 'Do not stick chopsticks vertically in rice')",
      "context": "Short historical or cultural explanation of why this rule exists."
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "theme": "Daily theme title (e.g., 'Historical Heart & Ancient Temples')",
      "morning": {
        "activity": "Detailed description of a culturally immersive morning activity",
        "location": "Name of the location (e.g., 'Kinkaku-ji Temple')",
        "culturalSignificance": "Explanation of the historical/cultural importance of this spot."
      },
      "afternoon": {
        "activity": "Detailed description of a culturally immersive afternoon activity",
        "location": "Name of the location",
        "culturalSignificance": "Explanation of the historical/cultural importance of this spot."
      },
      "evening": {
        "activity": "Detailed description of a culturally immersive evening activity",
        "location": "Name of the location",
        "culturalSignificance": "Explanation of the historical/cultural importance of this spot."
      }
    }
  ],
  "food": [
    {
      "name": "Name of the dish or drink",
      "description": "Authentic description, how it's prepared, and its flavor profile.",
      "category": "Street Food or Traditional Dish or Local Beverage",
      "whyTry": "The cultural background or story behind this food item."
    }
  ],
  "packing": [
    {
      "category": "Clothing",
      "items": ["Item 1 (weather appropriate)", "Item 2", "Item 3"]
    },
    {
      "category": "Essentials",
      "items": ["Item 1", "Item 2"]
    },
    {
      "category": "Tech & Accessories",
      "items": ["Item 1", "Item 2"]
    }
  ]
}

Ensure:
1. The response is clean, perfectly formatted JSON, and parses correctly.
2. The places mentioned in the itinerary locations represent REAL historical, cultural, or natural sites.
3. The itinerary has exactly ${duration} day entries.
4. The packing list directly reflects the weather context (e.g. if rain is mentioned, include rainwear; if cold, specify warm layers; if hot, specify sun protection).
`;
};
