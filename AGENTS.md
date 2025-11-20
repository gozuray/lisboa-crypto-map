# AGENTS.md — Lisboa Crypto Map (Professional Version)

agents:

  architect:
    enforce_folder_structure: true
    allowed_frameworks:
      - HTML
      - CSS
      - Vanilla JavaScript
      - Leaflet.js (map only)
    avoid_frameworks:
      - React
      - Angular
      - Svelte
      - Vue
    frontend_patterns:
      use:
        - Components (modular JS)
        - JSON-driven content
        - SEO-friendly structure
      avoid:
        - Inline styling
        - Heavy frameworks
        - Non-accessible HTML

  developer:
    code_style: "modern_frontend"
    javascript_rules:
      indentation: 2
      naming_convention: "camelCase"
      dom_manipulation: "modular"
      async_rules:
        - avoid unnecessary async
    forbidden_practices:
      - modifying core components without purpose
      - writing duplicated selectors
      - mixing responsibilities inside one file
    must_follow:
      - keep pages SEO optimized
      - responsive design always
      - use semantic HTML (header, section, footer)
      - lightweight assets

  designer:
    enforce_ui_rules: true
    guidelines:
      - minimalistic UI
      - pastel or neutral color palette
      - readable typography
      - mobile-first layout
      - consistent spacing system (8px scale)

  seo_reviewer:
    enabled: true
    rules:
      - titles and meta descriptions required
      - alt text on all images
      - structured data recommended
      - avoid duplicate content
      - clean URLs required

  accessibility_reviewer:
    enabled: true
    rules:
      - WCAG AA compliance
      - proper aria labels
      - high contrast option supported

  optimizer:
    auto_optimize:
      - reduce CSS duplication
      - compress images
      - remove unused JS
