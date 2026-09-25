# DSO Liquid Glass Study

Next.js demo of the [DSO Figma screen](https://www.figma.com/design/HDKkmAbZLVTnUshUIqXIZy/DSO?node-id=1137-43652) with a working timeline, exploration modes, asset chips, place selection, map controls, and adjustable glass treatment.

## Run on your Mac

```bash
mkdir -p "$HOME/Documents/Vizzio/Git"
cd "$HOME/Documents/Vizzio/Git"
git clone https://github.com/silvizzio/glass-demo.git
cd glass-demo
npm install
npm run dev
```

Open http://localhost:3000. Use Node.js 20.9 or newer. If you have already cloned the project, run `git pull --ff-only` from `glass-demo` instead of cloning again.

## GPU glass mode

The normal view is a CSS preview so that you can inspect the layout on any browser. The **Enable GPU glass** control mounts `@liquid-dom/react` `LiquidCanvas`, with a background `Html` node and `GlassContainer`/`Glass` shapes at the same positions as the UI panels. It is a real liquid-dom rendering path, not a CSS effect labeled as WebGPU.

For the live refracting background and DOM-backed image, use a current Chrome version with WebGPU. Set `chrome://flags/#canvas-draw-element` to **Enabled** and restart Chrome. This experimental flag is currently required by liquid-dom for HTML-in-Canvas. Then turn on **Enable GPU glass**. If WebGPU is unavailable or the renderer fails, the page keeps its CSS preview and shows the reason in the glass controls.

The background, logos, and media come from the Figma frame assets already in this repository. Copies in `public/` let Next.js serve them directly. The earlier single-file prototype remains available at `index.html` with its assets in `assets/`.

## Checks

```bash
npm run typecheck
npm run build
```

## Library for index.html

`vendor/liquid-dom-core.js` is `@liquid-dom/core` built from GitHub master (commit dd342ab). The single-file prototype `index.html` loads it. Do not replace it with the npm release 0.1.1: that release uses the old Chrome copy API, and all panels render empty.

## Render modes (index.html)

The single-file demo has three renderers for the same UI. Use the switch at top center, the keys `1`, `2`, `3`, or `?glass=` in the URL.

| Mode | URL | Library | Browsers |
| --- | --- | --- | --- |
| Liquid DOM | `?glass=dom` | [liquid-dom](https://github.com/AndrewPrifer/liquid-dom), WebGPU | Desktop Chrome with `chrome://flags/#canvas-draw-element` enabled |
| SVG glass | `?glass=svg` | [liquid-glass-web-react](https://github.com/PallavAg/liquid-glass-web-react) engine, SVG `feDisplacementMap` | Chrome, Safari, Firefox, desktop and mobile |
| CSS | `?glass=css` | None, CSS `backdrop-filter` | All |

Default: Liquid DOM when the browser supports it, else SVG glass. Add `?tune` for optics sliders of the active mode.

`vendor/liquid-glass-engine.js` is the plain-DOM engine of liquid-glass-web-react (commit 8c61545), built without React.
