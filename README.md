# JS Investor Web

Prezentačný web pre `ivanjasik.sk` postavený na React + Vite + TypeScript + Tailwind CSS.

## Tech Stack

- React 18
- Vite 5
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router

## Lokálne spustenie

Požiadavky:
- Node.js 20+ (odporúčané LTS)
- npm 10+

Inštalácia a štart:

```bash
npm install
npm run dev
```

Aplikácia beží štandardne na `http://localhost:5173`.

## Dôležité skripty

- `npm run dev` - vývojový server
- `npm run build` - produkčný build
- `npm run preview` - lokálny náhľad produkčného buildu
- `npm run lint` - ESLint kontrola
- `npm run test` - testy (Vitest)

Pre TypeScript kontrolu používame:

```bash
npx tsc -p tsconfig.app.json --noEmit
```

## Deploy

Odporúčaný postup pred deployom:

1. `npm install`
2. `npm run lint`
3. `npx tsc -p tsconfig.app.json --noEmit`
4. `npm run build`
5. Overiť artefakty v `dist/`

Build výstup je v priečinku `dist/` a je pripravený na statický hosting.

## SEO a statické súbory

- SEO metadata sú v `index.html`
- Sitemap je v `public/sitemap.xml`
- Open Graph obrázok je nastavený cez `meta` tagy v `index.html`

## Fallbacky a prevádzkové poznámky

- **Kritický fallback pri výpadku analytiky:** Umami script v `index.html` je `defer`; ak cloud neodpovedá, web musí zostať funkčný. Pri problémoch script dočasne odstráň z head.
- **Fallback pri chybe deployu:** rollback na posledný funkčný commit/tag a redeploy.
- **Fallback pri nefunkčnom builde:** skontrolovať najprv `lint`, potom TypeScript check a až potom bundling.
- **Fallback pri poškodených assetoch:** overiť cesty v `src/assets` a referencie v komponentoch/`index.html`.
- **Routing fallback:** hosting musí smerovať neznáme route na `index.html` (SPA fallback), inak nebudú fungovať priame URL.

## Čo robiť pri výpadku (runbook)

1. Skontrolovať, či ide o lokálny problém alebo produkciu.
2. Overiť posledný deploy a posledný commit, ktorý zmenu zaviedol.
3. Spustiť lokálne:
   - `npm install`
   - `npm run lint`
   - `npx tsc -p tsconfig.app.json --noEmit`
   - `npm run build`
4. Ak je problém v konkrétnej zmene, rollbacknúť na posledný stabilný commit.
5. Po obnovení služby vytvoriť krátky incident záznam: príčina, dopad, fix, prevencia.

## Kontakty

- **Produkt/Web obsah:** Ivan Jasik
- **Technická údržba:** vývojár/repozitár maintainer
- **Doména:** `ivanjasik.sk`

Poznámka: konkrétne mená/emaily doplňte podľa interného procesu alebo do privátnej dokumentácie.
