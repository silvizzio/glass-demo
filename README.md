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

The single-file demo has four renderers for the same UI. Use the switch at top center, the keys `1` to `4`, or `?glass=` in the URL. All modes use the same plain 20 px rounded-rect corners.

| Mode | URL | Technique | Browsers |
| --- | --- | --- | --- |
| Liquid DOM | `?glass=dom` | [liquid-dom](https://github.com/AndrewPrifer/liquid-dom), WebGPU | Desktop Chrome with `chrome://flags/#canvas-draw-element` enabled |
| SVG backdrop | `?glass=backdrop` | `backdrop-filter: url(#svg-filter)`, after [rebane2001's gist](https://gist.github.com/rebane2001/8ba35ad6e1b17c4cb5b2b2431d9e992c) | Chromium browsers (Chrome, Edge, Arc) |
| WebGL glass | `?glass=webgl` | [ybouane/liquidglass](https://github.com/ybouane/liquidglass) 1.0.3, WebGL 1 refraction shader over a captured backdrop | Chrome, Safari, Firefox, Edge, desktop and mobile |
| glasscn | `?glass=glasscn` | Port of the `liquid-refract` variant of [glasscn](https://github.com/kostyniuk/glasscn-components) (MIT): SDF bezel displacement map in `backdrop-filter`, blur, saturation, iOS-style rim | Chromium browsers (Chrome, Edge, Arc) |

Default: Liquid DOM when the browser supports it, else WebGL glass. Add `?tune` for optics sliders of the active mode.

In WebGL glass mode the stage is laid out in screen px (the library measures boxes with both `getBoundingClientRect` and `offsetWidth`, so a CSS transform on the root misaligns the glass). Panel content keeps the design size with CSS `zoom`. The live map is mirrored into a 2D canvas that the library draws directly.

`vendor/liquidglass.js` is the published bundle of `@ybouane/liquidglass@1.0.3` (MIT).

## Background (index.html)

The glass is computed live from the pixels behind each panel. To show this, the background moves.

| Control | Result |
| --- | --- |
| **Map** (default) or `M` | Live Mapbox satellite map of Dubai Silicon Oasis (`?bg=map`) |
| **Image** or `I` | The static Figma render (`?bg=image`) |
| Drag | Pan the map or the render |
| Wheel or pinch | Zoom at the pointer |
| Double-click | Reset the view |
| + and − | Zoom in steps |
| Handle on the District IO card | Move the card over the background |
| No input for 5 seconds | Ambient drift: the map rotates slowly, the render floats. Stops at the first touch. Off with reduced motion. |

## Glass tone (index.html)

Every mode has a dark base (default) and a light base. Use **Dark | Light** in the top-center bar, the keys `D` and `L`, or `?tone=dark|light` in the URL. The switch is live, with no reload. Text stays white in both tones; the light tone adds a stronger text shadow.

| Mode | Dark base | Light base |
| --- | --- | --- |
| Liquid DOM | black tint 28%, specular 0.25 | white tint 14%, specular 0.45 |
| SVG backdrop | black panel tint 28%, darkness layer 40, lightness 8 | white panel tint 10%, darkness 8, lightness 40 |
| WebGL glass | black fill 20%, brightness −0.12, saturation −0.1 | white fill 14%, brightness +0.06, saturation +0.1 |
| glasscn | black fill 28%, rim light 0.18, rim dark 0.35 | white fill 8%, rim light 0.35, rim dark 0.15 |

The presets are in `TONE_PRESETS` in `index.html`. With `?tune`, the sliders edit the active tone, and "Copy values" includes the tone name.
