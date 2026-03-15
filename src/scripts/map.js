import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * map.js — Leaflet map initialization with CartoDB Dark Matter tiles
 * Clinics data loaded from the JSON script tag injected by MapSection.astro
 */

// Wait for DOM to be ready
function initMap() {
  if (!document.getElementById('study-map')) return;

  /** @type {Array<{name:string,address:string,city:string,cp:string,coords:[number,number],status:string}>} */
  const clinics = /** @type {any} */ (window).__mapClinics ?? [];
  if (!clinics.length) return;

  // Argentina center
  const map = L.map('study-map', {
    center: [-34.6, -62.0],
    zoom:   5,
    zoomControl: true,
    attributionControl: true,
    scrollWheelZoom: false, // UX: don't hijack page scroll
  });

  // CartoDB Dark Matter tiles — free, no API key required
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }
  ).addTo(map);

  // Custom marker icon using CSS (no image assets required)
  const markerHtml = `
    <div style="
      width:14px;height:14px;
      border-radius:50%;
      background:#76E5FC;
      border:2px solid rgba(118,229,252,0.4);
      box-shadow:0 0 12px 3px rgba(118,229,252,0.4);
    "></div>
  `;

  const icon = L.divIcon({
    html: markerHtml,
    className: '',
    iconSize:   [14, 14],
    iconAnchor: [7, 7],
    popupAnchor:[0, -10],
  });

  const clinicCards = document.querySelectorAll('.clinic-card');

  // Add markers
  clinics.forEach((clinic, i) => {
    const marker = L.marker(clinic.coords, { icon })
      .addTo(map)
      .bindPopup(`
        <strong>${clinic.name}</strong>
        ${clinic.address}, CP ${clinic.cp}<br/>
        ${clinic.city}
      `);

    // Card → map interaction
    clinicCards[i]?.addEventListener('click', () => {
      map.setView(clinic.coords, 13, { animate: true });
      marker.openPopup();

      // Active card highlight
      clinicCards.forEach(c => c.classList.remove('active'));
      clinicCards[i]?.classList.add('active');
    });

    // Marker → card interaction
    marker.on('click', () => {
      clinicCards.forEach(c => c.classList.remove('active'));
      clinicCards[i]?.classList.add('active');
      clinicCards[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  // Fit all markers on load
  const group = L.featureGroup(
    clinics.map(c => L.marker(c.coords))
  );
  map.fitBounds(group.getBounds().pad(0.15));

  // Force tile re-render in case container size wasn't computed yet
  setTimeout(() => map.invalidateSize(), 200);
}

initMap();
