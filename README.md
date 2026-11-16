# Trakop – web stranica

Statična web stranica za **Obrt Trakop** – usluge iskopa mini bagerom, Visoko i okolina.

Čisti HTML i CSS. Nema build koraka ni zavisnosti.

## Pokretanje lokalno

Najjednostavnije: dvaput kliknite na `start.bat` (pokreće server i otvara stranicu) ili na `index.html`.

Ili preko lokalnog servera:

```bash
npm start          # http://localhost:5173
# ili
python -m http.server 5173
```

## Struktura

```
index.html          sva stranica
assets/styles.css   stilovi i animacija bagera
assets/favicon.svg  ikonica
```

## Šta još treba dopuniti

- Fotografije: zamijenite prazna polja (`.ph`, `.phd`) pravim slikama radova.
- Podaci o bageru: težina, dubina kopanja, širina, kašike (polja `[__]`).
- Mjesta u kojima radite i radno vrijeme.

## Objavljivanje

Radi na bilo kojem statičkom hostingu: GitHub Pages, Netlify, Vercel ili Cloudflare Pages.
