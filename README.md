# glass-demo

Liquid glass demo of the DSO kiosk frame (Figma node 1137:43652, "UI 5") built with [liquid-dom](https://github.com/AndrewPrifer/liquid-dom) in one HTML file. No build step.

## Run

```sh
cd ~/Documents/Vizzio/Git/glass-demo
python3 -m http.server 5173 --bind 127.0.0.1
```

Open http://127.0.0.1:5173 in desktop Chrome.

## Browser requirements

Liquid glass needs WebGPU and the HTML-in-Canvas API.

1. Open `chrome://flags/#canvas-draw-element`.
2. Set it to **Enabled**.
3. Restart Chrome.

If the page does not find the API (iPhone, Safari, or Chrome without the flag), it shows the same UI with CSS frosted panels.

## URL options

| Option | Result |
| --- | --- |
| `?tune` | Shows sliders for the glass optics. "Copy values" copies JSON for the `OPTICS` object in `index.html`. |
| `?fallback` | Forces the CSS frosted version, for side-by-side comparison. |

## Interaction

Mode tabs, timeline stops and arrows, asset chips, map controls, zoom in and out on the render, detail card close (reopen from District IO in Areas of interest), and gallery thumbnails.

## Files

| Path | Content |
| --- | --- |
| `index.html` | Markup, CSS, and the module script |
| `assets/` | Assets exported from the Figma frame |
