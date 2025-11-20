# Lisboa Crypto Map

Interactive map built with HTML, CSS, and vanilla JS to discover Lisbon businesses that accept cryptocurrencies. Content is sourced from `data/businesses.json` or the `/api/businesses` endpoint and rendered across multiple views: home, individual profiles, and zone subpages.

## Features
- Leaflet with dynamic markers sourced from JSON.
- Combined search and filters (area, category, tokens, verified, promo, open now, RayPay).
- Enriched cards with badges, rating, hours, tokens SOL/USDC/USDT/BTC/ETH, and quick access to WhatsApp and Google Maps.
- Individual business profiles (`business.html?id=...`) with gallery and embedded map.
- Subpages for key areas: Baixa, Alfama, and Parque das Nações.
- Form to add new businesses (local demo without persistence).
- Optional Node.js + Express backend to serve JSON and log click statistics.

## Structure
- `index.html`: home with map, filters, suggested routes, and listing.
- `zones/*.html`: subpages filtered by area.
- `business.html`: detail profile.
- `assets/css/style.css`: minimalist, mobile-first styles.
- `assets/js/app.js`: rendering logic, filters, Leaflet, and basic tracking.
- `data/businesses.json`: data source with extended fields (tokens, verified, promo, photos, rating, open_now).
- `server.js`: optional Express backend for `/api/businesses` and `/api/click`.

## Usage
1. **Static**: open `index.html` with a simple local server (e.g., `python -m http.server`) and data will load from `data/businesses.json`.
2. **Optional backend**:
   - Install dependencies: `npm install`
   - Start the server: `npm start`
   - Open `http://localhost:3000/index.html` to consume `/api/businesses` and send metrics to `/api/click`.

The project is designed to replicate the experience in other cities by simply swapping the JSON dataset.
