# ⏱️ Magic Timer

A smart Pomodoro-inspired productivity timer designed to **prevent burnout by tracking a complete workday**. When all progress indicators are filled, you're done—no endless hyperfocus spirals. Designed and developed by Lars Munck, © 2025.

---

## 🎯 Problem It Solves

People with ADHD and hyperfocus tendencies often work without breaks, leading to burnout and fatigue. Magic Timer solves this by:

- Creating a **structured, visible workday boundary** (~7 hours)
- Encouraging manageable worksprints and regular breaks to maintain focus and energy
- Rewards a star and long break for each ~ 2 hour set completed
- Giving clear feedback when the workday is complete
- Preventing the "just one more task" trap with a concrete endpoint

## ✨ Features

- **Circular minute countdown:** Each minute appears as a dot in a circle. Dots light up/expire as time progresses, with direction changing based on timer type.
- **Central timer button:** Large, tactile button showing remaining minutes. Click to start work/break cycles. It displays "work" as red and "break" as green.
- **Star indicators:** 4 stars at the top represent completed work/break sets. 1 star = 2 hours 15 minutes. Stars fill as you complete cycles.
- **Progress pills:** 8 visual pills represent each timer block (25/5/25/5/25/5/25/20 min). Pills fill as you complete cycles.
- \*📸 Screenshots

![Magic Timer Demo](screenshot1.png)
_Main timer interface with minute countdown dots and progress pills_

![Magic Timer Completed](screenshot2.png)
_Completed workday with all stars filled_

---

## Screenshots

![Magic Timer Screenshot](screenshot1.png)
![Magic Timer Screenshot](screenshot2.png)

---

## Installation

1. **Clone the repo:**

   ```bash
   git clone https://github.com/TrooperLooper/MagicTimer.git
   cd MagicTimer
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the app:**
   ```bash
   npm run dev
   ```
   (Or use `npm start` if configured.)

---

## Usage

- Click the central button to start the timer.
- The minute dots count down, as you work or take a break.
- Complete cycles to light up pills and stars as you progress.
- When all stars are lit, your workday is complete!

---

## 🛠 Tech Stack

- **React 19** (with Hooks)
- **Vite** (ultra-fast build tool)
- **JavaScript ES6+**
- **SVG graphics** (custom-designed UI elements)
- **CSS3** (responsive layout)
- **Jest & React Testing Library** (unit testing)

### Architecture

- **Modular components** – Each UI element is an independent React component
- **State management** – Centralized state in App.jsx using `useState` and `useEffect`
- **Interval-based timer** – Uses `setInterval` for precise minute tracking
- **SVG visualization** – Dynamic dots, pills, and stars updated in real-time

---

## 🧪 Testing

Run unit tests with:

```bash
npm test
```

**Test Suite Status:** ✅ **40 tests passing** (28 passing + 12 skipped TDD-style tests)
- 2 test suites: utility functions + timer hook tests  
- Jest + React Testing Library configured
- Tests written in TDD style (expected behavior documented before implementation)

Tests cover:
- Timer countdown logic and state transitions
- Work/break cycle progression  
- Star and pill advancement
- Session locking when workday completes
- Utility function validation (7 helper functions tested)

---

### Learning Outcomes

Building Magic Timer taught me:

- Advanced React state management with Hooks (`useState`, `useEffect`, `useRef`)
- SVG manipulation and dynamic rendering
- Interval-based timing and cleanup patterns
- Component composition and prop drilling
- Responsive design without frameworks
- Practice UX design for ADHD-friendly interfaces

---

## License

All rights reserved © 2025 Lars Munck

---

## Credits

- **Design & Development:** Lars Munck
- **SVG & Custom Assets:** Created by Lars Munck
- **Audio:** Chime sound from Universfield @ [Pixabay](https://pixabay.com)
- **Built with:** React, Vite, and JavaScript

---

## Ideas for Further Improvement

### High Priority

- ✅ Extract constants and magic numbers to `constants.js`
- ✅ Refactor timer logic into custom `usePomodoro` hook
- ✅ Add error handling for missing audio files
- ✅ Move inline CSS to external stylesheet
- ✅ Improve accessibility (ARIA labels, keyboard support)
- ⏳ Set up Jest testing suite

### Medium Priority

- Add TypeScript for type safety
- Implement component PropTypes validation
- Add JSDoc comments to all functions
- Refactor App.jsx timer logic into custom `usePomodoro` hook

### Feature Requests & Future Enhancements

#### Settings Panel
- User-configurable workday length (choose how many "stars"/sets per day)
- Options: 1 set (~2 hours), 2 sets (~4 hours), 3 sets (~7 hours), 4 sets (~8 hours)
- Save preferences to localStorage

#### Flexible Star System
- **Partial workdays:** Add half-star SVG support for incomplete sets
  - Example: 3.5 sets = 7 hours 30 minutes workday
  - Visual indicator shows progress toward next full set
- **Pills adjustment:** Automatically recalculate pill displays based on user's chosen workday length

#### Animations
- **Micro-interactions:** Button pulse/glow on timer completion using [motion.dev](https://motion.dev/docs/quick-start)
- **Pill bounces:** New completed pill bounces into view (satisfying feedback)
- **Star sparkle:** Stars twinkle when a full set completes
- **Celebratory animations:** Special animation when entire workday is complete

#### Additional Features

- Dark mode toggle
- Persistent progress tracking (localStorage)
- Export daily stats / workout summary
- Keyboard shortcuts (Space to start, Esc to reset)
- Create React Native mobile app version

---

## Credits

- **Design & Development:** Lars Munck
- **SVG & UI assets:** Custom
- **Soundclip: Universfield @ pixabay**

---

## License

All rights reserved © 2025 Lars Munck

---
