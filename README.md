# Lisboa Crypto Map

Mapa interactivo en HTML, CSS y JS vanilla para descubrir negocios de Lisboa que aceptan criptomonedas. El contenido se alimenta desde `data/businesses.json` y se renderiza en distintas vistas: home, fichas individuales y subpáginas por zona.

## Características
- Leaflet con markers dinámicos desde JSON.
- Listado responsivo con llamadas a Google Maps y WhatsApp.
- Fichas individuales por negocio (`business.html?id=...`).
- Subpáginas para zonas clave: Baixa, Alfama y Parque das Nações.
- Formulario para agregar nuevos negocios (demo local sin backend).

## Estructura
- `index.html`: home con mapa y listado.
- `zones/*.html`: subpáginas filtradas por zona.
- `business.html`: ficha de detalle.
- `assets/css/style.css`: estilos minimalistas.
- `assets/js/app.js`: lógica de render y Leaflet.
- `data/businesses.json`: fuente de datos.

Abre `index.html` en un servidor estático (ej. `python -m http.server`) para evitar restricciones de CORS al cargar el JSON.
