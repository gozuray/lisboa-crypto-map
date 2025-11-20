# Lisboa Crypto Map

Interactive HTML, CSS and vanilla JS map to discover Lisbon businesses that accept cryptocurrency. Content is sourced from `data/businesses.json` and rendered across multiple views: home, individual detail pages and zone subpages.

## Features
- Leaflet with dynamic markers loaded from JSON.
- Responsive list with Google Maps and WhatsApp links.
- Individual business pages (`business.html?id=...`).
- Subpages for key zones: Baixa, Alfama and Parque das Nações.
- Form for adding new businesses (local demo without backend).

## Structure
- `index.html`: home with map and list.
- `zones/*.html`: subpages filtered by zone.
- `business.html`: detail page.
- `assets/css/style.css`: minimal styles.
- `assets/js/app.js`: rendering logic and Leaflet setup.
- `data/businesses.json`: data source.

Open `index.html` in a static server (e.g. `python -m http.server`) to avoid CORS restrictions when loading the JSON.
