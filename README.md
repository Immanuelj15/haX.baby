# Pip's Midnight Dream OS 🌙✨
**Track 1: Pip, the Skull Baby** — *haX.baby Hackathon: "Baby's First Website — Meet the Baby"*

> “I build the dreams you fall asleep inside.”

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio-Native%20Synth-F5C96B)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Track](https://img.shields.io/badge/haX.baby-Track%201%20Pip-A34063)](https://hax.baby/)

---

## 🌟 Creative Concept & Product Vision

**Pip's Midnight Dream OS** is a magical retro-computer interface styled like a lost, lovingly crafted personal website from the Midnight Nursery. 

Pip is a sweet skull baby with smooth porcelain features, warm glowing amber eyes, and a bedtime nightcap decorated with stars and a pink bow. As a **Junior Dream Engineer** at the Midnight Nursery (Sector Cloud-09), Pip creates custom lullabies, bedside nightlights, cozy bedtime folios, and delivers bedtime dreams to little creatures sleeping in burrows, nests, and hollow trees.

This website was handcrafted during the haX.baby hackathon sprint to honor Pip's official character canon—never scary, always cozy, gentle, and overflowing with early-web nostalgia combined with modern frontend craft.

---

## 🧸 Key Features & Interactive Architecture

### 1. Retro Floating OS Navigation Dock
- Styled like a vintage pastel operating-system toolbar.
- Real-time active section tracking across the single-page experience.
- Instant Day/Night theme toggle with smooth CSS variable transitions.
- Global Web Audio mute/play toggle with audio status indicators.
- Quick-access button to Pip's secret dream room.
- Fully responsive mobile drawer navigation without horizontal overflow.

### 2. Memorable Hero Viewport
- **Eyebrow:** `MIDNIGHT NURSERY // DREAM ENGINEER NO. 001`
- **Heading:** *“Your dreams are in tiny, careful hands.”*
- **Tagline:** *“I build the dreams you fall asleep inside.”*
- **Official Character Avatar:** High-resolution 3D clay-style Pip sitting happily on a cloud (`pip_avatar_cloud.png`).
- **Interactive Character:**
  - Pointer/mouse tracking with clamped 3D perspective tilt.
  - Interactive speech bubbles that cycle Pip's sleepy bedtime thoughts on click.
  - Discoverable tap counter: **Clicking Pip 5 times unlocks the secret Easter Egg room!**

### 3. Character Profile: Meet Pip (Nursery Dossier)
- Styled as a vintage nursery personnel record (`NURSERY_RECORD_001_PIP.DOC`).
- High-resolution official character portrait (`pip_portrait.png`).
- Canonical identity, personality badges (Curious, Sleepy, Clumsy, Easily Delighted, Gentle & Friendly).
- Favorite things & nursery quirk (easily captivated by sparkling stardust).
- Interactive **Qualification Meters**: Stardust Blending (98%), Cloud Fluffing (95%), Nightmare Dispelling (100%), Staying Awake Past 9 PM (14%).

### 4. Dream Projects (Four Fully-Functional Inventions)
- **Project 1: The Lullaby Lab**
  - Features the official Lullaby Music Box artwork (`pip_lullaby_box.png`) with animated spinning brass key.
  - **Native Web Audio API Synthesizer:** Pure pentatonic celesta, music box bell harmonics, and ADSR envelope. No external audio files or copyright concerns.
  - 3 Sound Character presets: *Celesta Music Box*, *Starlight Chimes*, *Midnight Harp*.
  - Real-time animated waveform frequency visualizer.
  - Volume slider and visible Play/Pause/Mute controls. Clean oscillator cleanup on stop.
- **Project 2: The Nightlight Collection**
  - Features the official Dream Lantern artwork (`pip_dream_lantern.png`).
  - 3 Interactive lighting modes: *Moon Glow* (warm amber), *Cloud Glow* (lavender mist), *Star Glow* (celestial peach).
  - Real dynamic lighting aura that updates the lantern glow and surrounding card ambience.
- **Project 3: Midnight Dream Delivery Routes**
  - Custom interactive SVG route map with rooftops, glowing windows, crescent moon, and forest checkpoints (*Bramble Bunny Burrow*, *Old Oak Owl Hollow*, *Mossy Bear Den*, *Teacup Mouse Cottage*, *Starling Pine Crest*).
  - **"Launch Delivery Star"** engine: Animates a stardust parcel along the cubic Bézier trajectory with real-time telemetry updates.
  - Checkpoint inspector displaying recipient names, dream package descriptions, and delivery status.
- **Project 4: Bedtime Storybook ("The Star that Shivered")**
  - Illustrated flip-book window with vintage typography and drop caps.
  - 3 story folios about Twiglet the shivering star and Pip's cloud loom.
  - Page-turn animations with both button and keyboard (Left/Right Arrow) navigation.

### 5. Multi-Scene Origin Story: “The Night the Moon Forgot to Glow”
- Interactive chapter scrubber across 4 illustrated scenes:
  1. *Chapter I: The Quiet Nursery* (The night dreams went missing)
  2. *Chapter II: The Unfinished Dream Box* (Discovering the stardust chest)
  3. *Chapter III: The First Delivery* (Rooftop leaps and lantern routes)
  4. *Chapter IV: The Midnight Promise* (The Junior Dream Engineer's oath)
- Concise, heartwarming storytelling under 70 words per chapter.

### 6. The Midnight Guestbook & Wish Wall (Bonus Side Quest)
- Community bedtime note wall with transparent local-storage disclaimer.
- Input validation (nickname, 140-char max message limit, wish category tag selector).
- Safe text rendering with zero risk of HTML/script injection (XSS-safe).
- Pre-populated with heartwarming creature notes.
- Interactive wish liking system and audio chimes on wish submission.

### 7. Retro Odometer Visitor Counter
- Vintage segmented digital display honestly labeled as a local session counter.

### 8. Secret Dream Room Easter Egg
- Discoverable by tapping Pip 5 times or pressing the key icon in the navigation.
- Pastel confetti explosion via `canvas-confetti` (respects `prefers-reduced-motion`).
- Secret message from Pip: *“You found the dream I was saving just for you. Keep a little wonder in your pocket.”*
- Interactive **Pocket Starlight Charm Dispenser** granting collectible bedtime blessings.

---

## 🎨 Design Tokens & Palette

| Token | Day Mode | Night Mode | Intended Feel |
|---|---|---|---|
| **Warm Cream** | `#fff8f1` | `#fff8f1` (text) | Morning sunlight & cozy pajamas |
| **Rich Berry** | `#a34063` | `#e26d95` | Sweet strawberry jam & nightcap bows |
| **Deep Midnight Navy** | `#17172f` (accents) | `#121226` (bg) | Slumbering starry night sky |
| **Moonlight Gold** | `#d8961d` | `#f5c96b` | Lantern glow & warm eye pinpricks |
| **Soft Blush Pink** | `#f8dce5` | `rgba(220, 210, 245, 0.12)` | Fluffy cloud cheeks & cotton candy |
| **Lavender** | `#f1edfb` | `#dcd2f5` | Soothing evening mist |

---

## 💻 Tech Stack & Zero-Bloat Architecture

- **Core:** React 19 + Vite 8
- **Styling:** Vanilla CSS with custom properties, tokens, and retro OS window styling (Zero Tailwind bloat)
- **Audio:** Native Web Audio API (ADSR gain nodes, biquad filter, sine/triangle oscillators)
- **Icons:** `lucide-react`
- **Effects:** `canvas-confetti` (with reduced-motion safeguards)
- **Typography:** `Fredoka`, `Nunito`, `Lora`, and `VT323` (Google Fonts)

---

## 🚀 Local Setup & Development

### Prerequisites
- Node.js 18+ (tested on Node v22.19.0)
- npm 9+

### Commands
```bash
# 1. Clone repository or open project folder
cd hax

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173/
```

### Production Build & Preview
```bash
# Compile optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🚢 Deployment Guide

This project is built as a static Single-Page Application (SPA) with zero server dependencies, making it deployable anywhere in under 60 seconds:

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Accept default build settings (`npm run build`, output directory: `dist`).

### Deploy to Netlify
1. Drag and drop the `dist/` folder into Netlify Drop, OR
2. Link your GitHub repository with Build Command `npm run build` and Publish Directory `dist`.

### Deploy to GitHub Pages
1. In `vite.config.js`, set `base: './'`.
2. Run `npm run build`.
3. Push the contents of `dist` to your `gh-pages` branch.

---

## 🏆 haX.baby Submission Verification Checklist

- [x] **Character Canon Respected:** Pip the Skull Baby is cute, sleepy, gentle, friendly — never scary or grotesque.
- [x] **Official Assets Included:** High-resolution hero avatar, character portrait, lullaby box, dream lantern, and cozy badge.
- [x] **Minimum Portfolio Requirements:** Complete introduction, persona dossier, skills, story, and projects.
- [x] **Four Interactive Projects:** Lullaby Lab (audio), Nightlights (lighting), Delivery Route (SVG map), Bedtime Story (folios).
- [x] **Day/Night Mode Toggle:** Seamless CSS variable switching with persistent memory.
- [x] **Native Sound Experience:** Web Audio API with visible play/pause/mute controls and volume slider.
- [x] **Secret Easter Egg:** 5-tap trigger on Pip unlocking the secret stardust stash with confetti and charm dispenser.
- [x] **Bonus Side Quests:** Local guestbook with input validation and honest session counter.
- [x] **Accessibility & Responsiveness:** Verified on mobile (360px/375px), tablet, and desktop viewports with reduced motion support.
- [x] **Visible Attribution:** Third-party fonts, tools, and official haX.baby assets credited in footer.

---

## 📜 Credits & Attributions

- **Character Concept & Assets:** [haX.baby](https://hax.baby/) Track 1 — Pip, the Skull Baby.
- **Typography:** *Fredoka* & *Nunito* by Google Fonts.
- **Crafted with care:** At the Midnight Nursery for all creatures who need a peaceful night's sleep.
