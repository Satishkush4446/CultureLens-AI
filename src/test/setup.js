import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock Leaflet as it contains references to global window/document components that break under jsdom
vi.mock('leaflet', () => {
  return {
    default: {
      Icon: {
        Default: {
          prototype: {}
        }
      },
      divIcon: vi.fn(),
      map: vi.fn(() => ({
        setView: vi.fn(),
        remove: vi.fn(),
      })),
      tileLayer: vi.fn(() => ({
        addTo: vi.fn(),
      })),
      marker: vi.fn(() => ({
        addTo: vi.fn(() => ({
          bindPopup: vi.fn(),
        })),
      })),
    }
  };
});

// Mock react-leaflet using standard React.createElement to avoid parser/JSX compile errors in pure JS files
vi.mock('react-leaflet', () => {
  return {
    MapContainer: ({ children }) => React.createElement('div', { 'data-testid': 'map-container' }, children),
    TileLayer: () => React.createElement('div', { 'data-testid': 'tile-layer' }),
    Marker: ({ children }) => React.createElement('div', { 'data-testid': 'marker' }, children),
    Popup: ({ children }) => React.createElement('div', { 'data-testid': 'popup' }, children),
    useMap: () => ({
      setView: vi.fn(),
    }),
  };
});

// Mock window.matchMedia (unsupported in jsdom but used by some components)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
