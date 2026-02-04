# devflow-app
Developer Productive tracker
DevFlow is a lightweight, browser-based web app designed to help developers and tech teams track focus time, task switching, and burnout risks. Built with vanilla HTML, CSS, and JavaScript, it's beginner-friendly yet demonstrates practical problem-solving for real dev pain points like context switching (Slack → code → meetings) and unclear time allocation. No frameworks, servers, or fees required—runs offline with data stored locally in your browser.

Why build this? As a junior developer , I wanted a simple tool to quantify productivity without the complexity of paid apps like Toggl. It's portfolio-ready, showing skills in UX, state management, and data persistence.

## Features
- **Focus Session Tracker**: Start/stop a timer with custom labels (e.g., "Bug Fixing"). Real-time HH:MM:SS display using `setInterval`.
- **Task Switching Counter**: Log interruptions with a button—tracks how fragmented your focus is.
- **Burnout Warnings**: Real-time alerts (e.g., if focus >2 hours or switches >5) and daily checks (>8 hours or >20 switches).
- **Daily Summary Dashboard**: Aggregates today's time (HH:MM:SS), switches, and productivity score (100 - (switches * 5), clamped 0-100).
- **Automatic Weekly Reports**: Overviews past 7 days with totals, averages, and warnings—no manual trigger needed.
- **Data Reset**: Button to clear yesterday's data (protects today's progress until next day).
- **Dark Mode UI**: Sleek glassmorphism design for a modern, dev-friendly look.

## Tech Stack
- **HTML**: Structure and UI elements.
- **CSS**: Styling with flexbox, transitions, and blur effects (no libraries).
- **JavaScript**: Core logic, timers (`setInterval`, `Date.now()`), localStorage for persistence, dynamic HTML updates.
- No dependencies—pure vanilla for simplicity and learning.

## Installation/Setup
1. Clone or download the repo:
   https://github.com/Katlego-Codes/devflow-app.git
2. Open `index.html` in any browser (e.g., Chrome).
3. That's it! The app runs locally. Data persists via `localStorage`—clear browser storage to reset everything.

## Usage
- Enter a session label and click "Start Focus".
- Log switches as they happen.
- Stop to save and update summaries.
- View daily/weekly insights automatically.
- Reset old data via the button (yesterday only).

For testing: Run short sessions, check consoles for errors, or simulate weeks by editing dates in localStorage (Inspect > Application).

## Deployment
 Access at https://katlego-codes.github.io/devflow-app).
 Deploy steps:
- Push to GitHub.
- Settings > Pages > Source: main/root.

## Future Improvements
- Add React for better state management.
- Cloud sync (e.g., Firebase) for multi-device use.
- Charts (Chart.js) for trends in reports.
- Export data to CSV/PDF.

## Contributing
Fork the repo, make changes, and PR! Issues welcome for bugs or ideas.

## License
No Licence

Built by Mpho (Katlego) in Johannesburg. Feedback? Connect on LinkedIn! 🚀     
