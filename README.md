# UI Style Archive & Codebook

An interactive open-source developer codebook and style catalog showcasing **15 major UI design trends** in modern web history. This project provides live HTML/CSS render sandboxes, copy-pasteable styling scripts, color palettes, and optimized **AI Theme Transformation Recipes** for each trend.

## 🌟 Included Design Trends
1. **Art Deco** — Luxury geometric lines overlaying jet-black marble stone backgrounds (1920s Roots).
2. **Skeuomorphism** — Realistic textures (leather, metal), stitching, bevels, and physical dials (Early Mobile Bridge).
3. **Y2K / Frutiger Aero** — Optimistic glossy bubbles, water reflections, and sky/grass gradients (Glossy Tech Optimism).
4. **Neomorphism** — Soft extruded plastic panels using double box-shadow offset tokens (Minimal Skeuomorphic Hybrid).
5. **Claymorphism** — Cute, fluffy 3D-inflated clay components using pastels and double inner shadows (Volumetric Cartoon).
6. **Minimalism** — Content-first layout prioritizing grid alignment and high-contrast typography (The Purist Standard).
7. **Bento Grid** — Grid layout partitioning visual data cleanly into rounded card containers (Modular Organizer).
8. **Material You** — Google's organic dynamic color sheets with circular floating buttons (Organic Adaptive flat).
9. **Glassmorphism** — Frosted glass refractions over colorful drifting light blobs (Translucent depth standard).
10. **Liquid Glass** — Continuous keyframe morphs of glass-frosted blobs simulating fluid refraction (Organic liquid morphs).
11. **Spatial UI** — Pass-through dark obsidian panels that tilt in 3D perspective to track mouse movements (AR/visionOS volumetric future).
12. **Brutalism** — High-contrast flat yellow panels with thick solid borders and hard offset shadows (Raw reaction outlines).
13. **Maximalism** — Vibrant patterns, neon gradients, rotated elements, and visual chaos (Slanted creative overflow).
14. **Cyberpunk UI** — High-contrast neon pink/cyan scanlines, retro-tech grids, and status tags (Dystopian cyberspace).
15. **Sci-Fi HUD** — Wireframe blueprints, cyan tech borders, and diagnostic telemetry indicators (Tactical scanner screens).

---

## 🛠️ Key Features
- **Live Sandboxes**: Interact with credit cards, dials, sliders, morphing blobs, and 3D tilting panels directly on screen.
- **Unified Theme Specification Recipes**: Copy structured prompt instructions specifically optimized for LLMs (Claude, Gemini, GPT) to instantly transform *any* existing website's look-and-feel.
- **Interactive Code Inspector**: Click tabs to instantly review and copy the exact HTML and CSS classes used to render the sandbox widgets.
- **One-Click Swatches**: Copy Hex codes directly by clicking on the palette circles.

---

## 🚀 How to Run Locally

You can run this project locally without any dependencies or compile steps! Simply clone this repository and open `index.html` in your web browser:

```bash
# Clone the repository
git clone https://github.com/your-username/ui-style-archive.git

# Navigate into the folder
cd ui-style-archive

# Start a local web server (optional, allows clipboard copying to work smoothly)
# If you have Python:
python -m http.server 8000

# Or if you have Node/npm:
npx serve .
```

Then visit `http://localhost:8000` (or `http://localhost:3000` if using serve).

---

## 📝 How to Adapt to Other Websites

1. **Grab the Tokens**: Go to the CSS variables in the inspect tab of your chosen style and import them into your global stylesheet.
2. **Apply CSS Classes**: Copy the HTML structure from the sandbox code panel and match the custom classes in your layout.
3. **Use the Theme Recipe**: Copy the prompt specification and feed it to an AI coding assistant (like Gemini or Claude) along with your website files, instructing it to rebuild your components using the specified styles.
