import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock Router Navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/' }),
  };
});

// Import promptBuilder helper
import { buildCulturePrompt } from '../services/promptBuilder';

// Import Badge UI
import Badge from '../components/ui/Badge';

// Import Loading UI
import Loading from '../components/ui/Loading';

// Import ItineraryTab
import ItineraryTab from '../components/results/ItineraryTab';

// Import CultureTab
import CultureTab from '../components/results/CultureTab';

// Import FoodTab
import FoodTab from '../components/results/FoodTab';

// Import HiddenGemsTab
import HiddenGemsTab from '../components/results/HiddenGemsTab';

// Import WeatherTab
import WeatherTab from '../components/results/WeatherTab';

// Import PackingTab
import PackingTab from '../components/results/PackingTab';

// Mock TripContext
const mockExecuteSearch = vi.fn();
vi.mock('../context/TripContext', () => {
  return {
    useTrip: () => ({
      destination: 'Kyoto',
      duration: 5,
      interests: ['History', 'Food'],
      tripData: {
        destination: { name: 'Kyoto', country: 'Japan', summary: 'Ancient city' },
        story: 'Kyoto is full of temples and shrines.',
        funFacts: ['Fact 1', 'Fact 2'],
        etiquette: [{ do: 'Do this', dont: 'Dont do that', context: 'Because culture' }],
        itinerary: [
          {
            day: 1,
            theme: 'Historical Temple Tour',
            morning: { activity: 'Visit temple', location: 'Golden Pavilion', culturalSignificance: 'Zen shrine' },
            afternoon: { activity: 'Drink tea', location: 'Tea House', culturalSignificance: 'Tea ceremony' },
            evening: { activity: 'Eat dinner', location: 'Gion Quarter', culturalSignificance: 'Local food' }
          }
        ],
        food: [{ name: 'Saffron Flatbread', description: 'Yummy flatbread', category: 'Street Food', whyTry: 'Ancient snack' }],
        packing: [{ category: 'Clothing', items: ['T-shirt', 'Shoes'] }]
      },
      weatherData: {
        forecast: [
          { date: '2026-07-05', maxTemp: 28, minTemp: 18, rainProb: 10, weatherCode: 1 }
        ]
      },
      gems: [
        { name: 'Ancient Temple', lat: 35.0116, lon: 135.7681, kinds: 'historic,temple', rate: 3, description: 'Quiet temple' }
      ],
      activeTab: 'itinerary',
      setActiveTab: vi.fn(),
      loading: false,
      loadingStatus: 'Consulting AI Ambassador...',
      isDemo: true,
      error: null,
      executeSearch: mockExecuteSearch,
    })
  };
});

import SearchForm from '../components/landing/SearchForm';

describe('CultureLens AI Unit & Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 1. Prompt Builder Tests
  describe('Prompt Builder Helper', () => {
    it('generates prompt containing destination and duration', () => {
      const prompt = buildCulturePrompt('Paris', 3, ['History'], { maxTemp: 25, minTemp: 15, rainProb: 20 });
      expect(prompt).toContain('Paris');
      expect(prompt).toContain('3 days');
      expect(prompt).toContain('History');
      expect(prompt).toContain('Max Temp 25°C');
    });

    it('handles null weatherSummary gracefully', () => {
      const prompt = buildCulturePrompt('Kyoto', 5, ['Food']);
      expect(prompt).toContain('Kyoto');
      expect(prompt).not.toContain('Max Temp');
    });
  });

  // 2. Badge Component
  describe('Badge UI Component', () => {
    it('renders with text and maps theme categories correctly', () => {
      const { container } = render(<Badge text="Historic Site" type="historic" />);
      expect(screen.getByText('Historic Site')).toBeInTheDocument();
      expect(container.firstChild).toHaveClass('text-purple-400');
    });

    it('handles defaults gracefully', () => {
      const { container } = render(<Badge text="Random Specialty" type="unknown" />);
      expect(screen.getByText('Random Specialty')).toBeInTheDocument();
      expect(container.firstChild).toHaveClass('text-slate-400');
    });
  });

  // 3. Loading Component
  describe('Loading UI Component', () => {
    it('displays statusText and alert descriptions correctly', () => {
      render(<Loading statusText="Checking local calendar..." />);
      expect(screen.getByText('Checking local calendar...')).toBeInTheDocument();
      expect(screen.getByText('Configuring Your CultureLens')).toBeInTheDocument();
    });
  });

  // 4. SearchForm Component
  describe('SearchForm Component & User Flow', () => {
    it('shows validation message on empty submission', () => {
      render(<SearchForm />);
      const button = screen.getByRole('button', { name: /Reveal Local Culture/i });
      fireEvent.click(button);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Please enter a destination name/i)).toBeInTheDocument();
      expect(mockExecuteSearch).not.toHaveBeenCalled();
    });

    it('submits correctly when inputs are filled', () => {
      render(<SearchForm />);
      const input = screen.getByLabelText(/Where do you want to experience\?/i);
      fireEvent.change(input, { target: { value: 'Kyoto' } });

      const button = screen.getByRole('button', { name: /Reveal Local Culture/i });
      fireEvent.click(button);

      expect(mockExecuteSearch).toHaveBeenCalledWith('Kyoto', 5, [], mockNavigate);
    });

    it('toggles selection status on interest chips', () => {
      render(<SearchForm />);
      const chip = screen.getByText('History & Temples').closest('button');
      expect(chip).toHaveAttribute('aria-pressed', 'false');

      fireEvent.click(chip);
      expect(chip).toHaveAttribute('aria-pressed', 'true');
    });
  });

  // 5. ItineraryTab Component
  describe('ItineraryTab Component', () => {
    it('renders itinerary days and slots with locations', () => {
      const itineraryMock = [
        {
          day: 1,
          theme: 'Historical Temple Walk',
          morning: { activity: 'Visit temple', location: 'Golden Pavilion', culturalSignificance: 'Zen shrine' }
        }
      ];
      render(<ItineraryTab itinerary={itineraryMock} />);
      expect(screen.getByText('Day 1')).toBeInTheDocument();
      expect(screen.getByText('Historical Temple Walk')).toBeInTheDocument();
      expect(screen.getByText('Visit temple')).toBeInTheDocument();
      expect(screen.getByText('Golden Pavilion')).toBeInTheDocument();
      expect(screen.getByText('Zen shrine')).toBeInTheDocument();
    });
  });

  // 6. CultureTab Component
  describe('CultureTab Component', () => {
    it('renders stories, fun facts, and etiquette tables', () => {
      const tripDataMock = {
        story: 'Kyoto is Japan\'s ancient capital. Beautiful city.',
        funFacts: ['Fact 1: Tipped once', 'Fact 2: Wooden joints'],
        etiquette: [{ do: 'Do bow', dont: 'Dont tip', context: 'omotenashi' }]
      };
      render(<CultureTab tripData={tripDataMock} />);
      expect(screen.getByText('Kyoto is Japan\'s ancient capital. Beautiful city.')).toBeInTheDocument();
      expect(screen.getByText('Fact 1: Tipped once')).toBeInTheDocument();
      expect(screen.getByText('Do bow')).toBeInTheDocument();
      expect(screen.getByText('Dont tip')).toBeInTheDocument();
      expect(screen.getByText(/Why:/i)).toBeInTheDocument();
      expect(screen.getByText(/omotenashi/i)).toBeInTheDocument();
    });
  });

  // 7. FoodTab Component
  describe('FoodTab Component', () => {
    it('renders local delicacies list and background details', () => {
      const foodMock = [
        { name: 'Saffron Flatbread', description: 'Thin bread charred on stone', category: 'Street Food', whyTry: 'Merchant trail staple' }
      ];
      render(<FoodTab food={foodMock} />);
      expect(screen.getByText('Saffron Flatbread')).toBeInTheDocument();
      expect(screen.getByText('Thin bread charred on stone')).toBeInTheDocument();
      expect(screen.getByText('Street Food')).toBeInTheDocument();
      expect(screen.getByText('Why You Must Try This')).toBeInTheDocument();
      expect(screen.getByText('Merchant trail staple')).toBeInTheDocument();
    });
  });

  // 8. HiddenGemsTab Component
  describe('HiddenGemsTab Component', () => {
    it('renders gems with kind badges and coordinates', () => {
      const gemsMock = [
        { name: 'Ancient Temple', kinds: 'historic,temple', rate: 3, description: 'Quiet temple', lat: 35.01, lon: 135.76 }
      ];
      render(<HiddenGemsTab gems={gemsMock} />);
      expect(screen.getByText('Ancient Temple')).toBeInTheDocument();
      expect(screen.getByText('Historic')).toBeInTheDocument();
      expect(screen.getByText('Quiet temple')).toBeInTheDocument();
      expect(screen.getByText('35.0100, 135.7600')).toBeInTheDocument();
    });
  });

  // 9. WeatherTab Component
  describe('WeatherTab Component', () => {
    it('calculates average stats and daily forecast items correctly', () => {
      const weatherMock = {
        forecast: [
          { date: '2026-07-05', maxTemp: 30, minTemp: 20, rainProb: 10, weatherCode: 0 },
          { date: '2026-07-06', maxTemp: 26, minTemp: 18, rainProb: 50, weatherCode: 3 }
        ]
      };
      render(<WeatherTab weatherData={weatherMock} />);
      // Stat check
      expect(screen.getByText('30°C')).toBeInTheDocument(); // Max
      expect(screen.getByText('18°C')).toBeInTheDocument(); // Min
      expect(screen.getByText('30%')).toBeInTheDocument(); // Avg Rain (10 + 50)/2 = 30
      // 7-day headers
      expect(screen.getByText('Today')).toBeInTheDocument();
      expect(screen.getByText('Clear Sky')).toBeInTheDocument();
      expect(screen.getByText('Partly Cloudy')).toBeInTheDocument();
    });
  });

  // 10. PackingTab Component
  describe('PackingTab Component', () => {
    it('renders categories and tracks progress on checkbox clicks', () => {
      const packingMock = [
        {
          category: 'Clothing',
          items: ['Rain jacket', 'Sun hat']
        }
      ];
      render(<PackingTab packing={packingMock} />);
      expect(screen.getByText('Clothing')).toBeInTheDocument();
      expect(screen.getByText('Rain jacket')).toBeInTheDocument();
      expect(screen.getByText('Sun hat')).toBeInTheDocument();

      // Progress bar start
      expect(screen.getByText('0 / 2')).toBeInTheDocument();

      // Check first item
      const item = screen.getByText('Rain jacket').closest('[role="checkbox"]');
      expect(item).toHaveAttribute('aria-checked', 'false');

      fireEvent.click(item);
      expect(item).toHaveAttribute('aria-checked', 'true');
      expect(screen.getByText('1 / 2')).toBeInTheDocument();

      // Trigger via keydown
      const otherItem = screen.getByText('Sun hat').closest('[role="checkbox"]');
      fireEvent.keyDown(otherItem, { key: ' ', code: 'Space' });
      expect(otherItem).toHaveAttribute('aria-checked', 'true');
      expect(screen.getByText('2 / 2')).toBeInTheDocument();
      expect(screen.getByText(/All packed!/i)).toBeInTheDocument();
    });
  });
});
