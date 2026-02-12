# Magic Workday Timer

A smart Pomodoro-inspired productivity timer designed to **prevent burnout by tracking a complete workday**. Classic pomodoro timers focus on short work/break cycles, but often miss the bigger picture of a full workday. This app tells you when you're done— no endless hyperfocus spirals. Designed and developed by Lars Munck, as part of fullstack studies at Sundsgården Folhögskola© 2025.

---
<img src="screenshot1.png" alt="Magic Workday Timer Demo" style="height:400px;"><br>
<em>Main timer interface with minute countdown dots and progress pills</em>

<img src="screenshot2.png" alt="Magic Workday Timer Completed" style="height:400px;"><br>
<em>Completed workday with all stars filled</em>
---


## What the app can help with

People with ADHD and hyperfocus tendencies often work without breaks, leading to burnout and fatigue. Magic Workday Timer solves this by:

- Creating a **structured, visible workday boundary** (~7 hours)
- Ensuring manageable worksprints and mandatory breaks to maintain focus and energy
- Rewards a star and a longer break for each ~ 2 hour set completed
- Giving clear feedback when the workday is complete
- Preventing the "just one more task" trap with a concrete endpoint

## Features

- **Circular minute countdown:** Each minute appears as a dot in a circle. Dots light up/expire as time progresses, with direction changing based on timer type.
- **Central timer button:** Large, tactile button showing remaining minutes. Click to start work/break cycles. It displays "work" as red and "break" as green.
- **Star indicators:** 4 stars at the top represent completed work/break sets. 1 star = 2 hours 15 minutes. Stars fill as you complete cycles.
- **Progress pills:** 8 visual pills represent each timer block (25/5/25/5/25/5/25/20 min). Pills fill as you complete cycles.
- **Fully responsive design:** Optimized for desktop (400×400px), tablets (320×320px), and mobile phones (280×280px). All UI elements scale gracefully across screen sizes.

---

#### Accessibility & Keyboard Navigation

Magic Workday Timer is built with accessibility in mind:

- **ARIA Labels:** All interactive elements include descriptive ARIA labels for screen readers
  - Button states: "Start work session" or "Start break session"
  - Timer running state: "Timer running. Work session in progress."
  - Progress indicators: "Timer steps progress: X of 8 completed"
  - Star indicators: "Workday progress: X of 3 sets completed"
- **Semantic HTML:** Proper use of `<button>`, `<role="progressbar">` and other semantic elements
- **Keyboard Shortcuts:**

  - **Space Key:** Start/pause the timer (works when timer is not running)
  - Full keyboard navigation support for all interactive elements

  It could be further improved with contrasting colors and focus indicators.
  But for now, I have chosen a discreet design, that dont attract too much attention.

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
- The minute dots count down, as you work (25 minutes) or take a break (5 or 20 minutes).
- Complete cycles to light up pomodoro-pills and stars (1 star =8 pills) as you progress.
- When all stars are lit, your workday is complete!

---

## 🛠 Tech Stack

- **React 19** (with Hooks)
- **TypeScript** (full type safety, 100% TypeScript codebase)
- **Vite** (ultra-fast build tool)
- **SVG graphics** (custom-drawn UI elements with responsive viewBox)
- **CSS3** (mobile-first responsive design with media queries)
- **Jest & React Testing Library** (unit testing)

### Architecture

- **Custom Hook Pattern** – `usePomodoro` hook encapsulates all timer logic for reusability
- **Modular components** – Each UI element is an independent React component with strict TypeScript types
- **Centralized state** – State management via custom hook using `useState` and `useEffect`
- **Type-safe** – Full TypeScript implementation with 9+ shared interfaces for components and utilities
- **Optimized effects** – Split `useEffect` dependencies to prevent unnecessary re-renders
- **Utility functions** – 7 reusable helper functions for timer logic, audio, and formatting
- **SVG visualization** – Dynamic dots, pills, and stars updated in real-time
- **Error handling** – Graceful fallbacks for missing images and audio files

---

## 🧪 Testing

Run unit tests with:

```bash
npm test
```

**TDD Tests:** ✅ 40 passing / 0 failing

TDD tests cover:

- Timer countdown logic and state transitions
- Work/break cycle progression
- Star and pill advancement
- Session locking when workday completes
- Utility function validation (7 helper functions tested)

---

### Learning Outcomes

Building Magic Timer gave me valuable experience with:

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

## Ideas for Further Improvement

#### Settings Panel

- User-configurable workday length (choose how many "stars"/sets per day)
- Options: 1 set (~2 hours), 2 sets (~4 hours), 3 sets (~7 hours), 4 sets (~8 hours)
- Save preferences to localStorage

#### Flexible Star System

- **Partial workdays:** Add half-star SVG support for incomplete sets
  - Example: 3.5 sets = 7 hours 30 minutes workday
  - Visual indicator shows progress toward next full set
- **Pills adjustment:** Automatically recalculate pill displays based on user's chosen workday length

#### Additional Features

- Persistent progress tracking (localStorage)
- graphs of daily/weekly productivity
- Export daily stats / workout summary
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
