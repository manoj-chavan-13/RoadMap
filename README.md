# 🚀 Roadmap OS

**Roadmap OS** is a premium, multi-page learning dashboard and student hub that empowers learners, specifically in DevOps and DSA, to track their progress, manage their daily routines, and maintain consistent focus. 

## 🎯 Purpose
The main objective of Roadmap OS is to provide a single, unified environment where students and professionals can visually track their long-term learning goals while having integrated tools to manage their everyday study sessions. 

## 🧩 Problem It Solves
Self-learning complex topics like DevOps or Data Structures and Algorithms requires navigating massive amounts of information. Learners often lose track of what they have completed, struggle to structure their daily time, and lack the focus required to sit down and study. 

Roadmap OS solves this by combining **long-term macro tracking** (Interactive Roadmaps) with **short-term micro execution** (Timetable Kanban, Pomodoro Timer, and Calendar Tracker).

## ✨ Key Features
- **Multi-Page Architecture:** Cleanly separated views for `devops.html`, `dsa.html`, `timetable.html`, `tools.html`, and `calendar.html` ensuring lightweight navigation.
- **Interactive Macro Roadmaps:** 
  - Track progression across DevOps Engineering and DSA Mastery.
  - Drag-and-drop to reorder and prioritize your study modules.
  - Inline editing of topics and modules.
- **Student Hub (Micro Execution):** 
  - **Daily Routine (Kanban):** Drag-and-drop tasks between columns (e.g., Weekdays, Weekends, Targets) to plan your day.
  - **Focus & Time:** Built-in Pomodoro timer, Stopwatch, and an Alarm system with native browser notifications and vibration to keep you disciplined.
  - **Consistency Tracker:** A GitHub-style contribution calendar to visually log your daily study streaks and hold yourself accountable.
- **100% Client-Side:** Uses `localStorage` to securely save your progression and custom entries without requiring a backend database.
- **Premium UI/UX:** Built with Tailwind CSS, featuring modern aesthetics, smooth drag-and-drop animations, dynamic glow effects, and a seamless Dark/Light mode toggle.

## 🛠️ Basic Usage

### Getting Started
1. Clone the repository to your local machine.
2. Navigate to the `RoadMap` project directory.
3. Open `index.html` (or `timetable.html`) in your modern web browser (Google Chrome, Firefox, Edge, etc.). No servers, installations, or build steps are required!

### Workflow Example
1. **Plan Your Path:** Open `devops.html` or `dsa.html`. Review the predefined roadmap. Add custom subtopics using the **"Add Subtopic"** button, or edit existing ones by clicking their text to write inline.
2. **Set Your Schedule:** Head to the **Daily Routine** tab (`timetable.html`). Drag topics into your `Weekdays` or `Weekends` columns to plan your immediate tasks.
3. **Execute and Focus:** Navigate to **Focus & Time** (`tools.html`). Set your Pomodoro timer for 25 minutes and begin your deep work session.
4. **Log Your Progress:** At the end of the day, mark your tasks as complete in the Roadmap, and click today's date in the **Consistency Tracker** (`calendar.html`) to grow your study streak!

## ⚙️ Project Structure
- `index.html` - Core entry point/redirect to the dashboard.
- `devops.html` / `dsa.html` - Interactive learning tracker pages.
- `timetable.html` / `tools.html` / `calendar.html` - Productivity and execution boards.
- `app.js` - Core logic for routing, state management, UI rendering, drag-and-drop functionality, and the study tools.
- `data.js` - Stores default initialization payloads for DevOps, DSA, and routines.
- `styles.css` - Custom scrollbars, animations, and premium styling overlays.

## 🤝 Contributing
Contributions are always welcome! Since the project leverages standard HTML, Javascript, and Tailwind CSS, simply fork the repository, make your interface or logic optimizations, and submit a pull request!
