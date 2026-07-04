import { useEffect, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet default icon broken paths in Vite/webpack bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom colored SVG markers by category
const createCustomIcon = (color = '#0EA5E9', letter = '•') =>
  L.divIcon({
    className: '',
    html: `
      <div style="
        position: relative;
        width: 28px;
        height: 36px;
        filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
      ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 36" width="28" height="36">
          <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="${color}"/>
          <circle cx="14" cy="14" r="7" fill="white" fill-opacity="0.25"/>
        </svg>
        <div style="
          position: absolute;
          top: 8px;
          left: 0;
          width: 28px;
          text-align: center;
          font-size: 11px;
          font-weight: bold;
          color: white;
          line-height: 1;
          pointer-events: none;
        ">${letter}</div>
      </div>
    `,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });

function getMarkerConfig(kinds = '') {
  const k = kinds.toLowerCase();
  if (k.includes('museum') || k.includes('cultural')) return { color: '#14B8A6', letter: 'M' };
  if (k.includes('historic') || k.includes('monument')) return { color: '#F59E0B', letter: 'H' };
  if (k.includes('religion') || k.includes('temple')) return { color: '#A855F7', letter: 'T' };
  if (k.includes('nature') || k.includes('natural')) return { color: '#22C55E', letter: 'N' };
  if (k.includes('architecture')) return { color: '#0EA5E9', letter: 'A' };
  return { color: '#F97316', letter: '★' };
}

// Pans the map when center coordinates change
function MapRecenter({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], 13, { animate: true });
    }
  }, [lat, lon, map]);
  return null;
}

const MapView = memo(function MapView({ coords, gems }) {
  const center = coords
    ? [coords.lat, coords.lon]
    : [20, 0]; // world fallback

  const zoom = coords ? 13 : 2;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      {/* Dark CartoDB tile */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      {/* Recenter when coords change */}
      {coords && <MapRecenter lat={coords.lat} lon={coords.lon} />}

      {/* Destination center marker */}
      {coords && (
        <Marker
          position={[coords.lat, coords.lon]}
          icon={createCustomIcon('#F97316', '★')}
        >
          <Popup>
            <div className="text-center" style={{ fontFamily: 'system-ui', color: '#E2E8F0', background: 'transparent' }}>
              <strong style={{ color: '#F97316', fontSize: '13px' }}>📍 Your Destination</strong>
            </div>
          </Popup>
        </Marker>
      )}

      {/* Gems / POI markers */}
      {gems && gems.map((gem, idx) => {
        if (!gem.lat || !gem.lon) return null;
        const { color, letter } = getMarkerConfig(gem.kinds);
        return (
          <Marker
            key={idx}
            position={[gem.lat, gem.lon]}
            icon={createCustomIcon(color, letter)}
          >
            <Popup>
              <div style={{ fontFamily: 'system-ui', minWidth: '160px', padding: '4px' }}>
                <p style={{ fontWeight: '700', fontSize: '13px', color: '#F8FAFC', marginBottom: '4px' }}>{gem.name}</p>
                {gem.kinds && (
                  <span style={{
                    display: 'inline-block',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: '600',
                    background: `${color}20`,
                    color: color,
                    border: `1px solid ${color}40`,
                  }}>
                    {gem.kinds.split(',')[0]}
                  </span>
                )}
                {gem.description && (
                  <p style={{ marginTop: '6px', fontSize: '11px', color: '#94A3B8', lineHeight: '1.5' }}>
                    {gem.description.slice(0, 80)}...
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
});

export default MapView;
