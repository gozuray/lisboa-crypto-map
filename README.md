# Lisboa Crypto Map

Mapa interactivo en HTML, CSS y JS vanilla para descubrir negocios de Lisboa que aceptan criptomonedas. El contenido se alimenta desde `data/businesses.json` o desde el endpoint `/api/businesses` y se renderiza en distintas vistas: home, fichas individuales y subpáginas por zona.

## Características
- Leaflet con markers dinámicos desde JSON.
- Búsqueda y filtros combinados (zona, categoría, tokens, verificado, promo, open now, RayPay).
- Tarjetas enriquecidas con badges, rating, horarios, tokens SOL/USDC/USDT/BTC/ETH y accesos rápidos a WhatsApp y Google Maps.
- Fichas individuales por negocio (`business.html?id=...`) con galería y mapa embebido.
- Subpáginas para zonas clave: Baixa, Alfama y Parque das Nações.
- Formulario para agregar nuevos negocios (demo local sin persistencia).
- Backend opcional en Node.js + Express para servir el JSON y registrar estadísticas de clics.

## Estructura
- `index.html`: home con mapa, filtros, rutas sugeridas y listado.
- `zones/*.html`: subpáginas filtradas por zona.
- `business.html`: ficha de detalle.
- `assets/css/style.css`: estilos minimalistas y mobile-first.
- `assets/js/app.js`: lógica de render, filtros, Leaflet y tracking básico.
- `data/businesses.json`: fuente de datos con campos extendidos (tokens, verified, promo, photos, rating, open_now).
- `server.js`: backend Express opcional para `/api/businesses` y `/api/click`.

## Uso
1. **Estático**: abre `index.html` con un servidor local simple (ej. `python -m http.server`) y los datos se cargan desde `data/businesses.json`.
2. **Backend opcional**:
   - Instala dependencias: `npm install`
   - Inicia el servidor: `npm start`
   - Abre `http://localhost:3000/index.html` para consumir `/api/businesses` y enviar métricas a `/api/click`.

El proyecto se diseñó modular para replicar la experiencia en otras ciudades únicamente cambiando el dataset JSON.
