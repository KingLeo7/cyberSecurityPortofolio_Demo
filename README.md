# Cybersecurity Portfolio Demo

An interactive portfolio for Rudra Prasad Rath, presented as a cybersecurity command center. It highlights AI security, defensive engineering, case studies, technical skills, experience, and contact information.

## Features

- Six dashboard sections with mouse and keyboard navigation.
- Interactive terminal-style contact panel and case-study views.
- Responsive command-center interface with live-style telemetry.
- A separate, print-friendly resume page.

## Run locally

This is a static site and does not require a build step or package installation. From this directory, start a local web server:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000> in a browser. Opening `index.html` directly may also work, but a local server provides more consistent behavior.

## Navigation

Use the sidebar buttons or press **1–6** to switch between the dashboard sections. Use the **View / Print Resume** button to open the resume page, which can be printed from the browser.

## Project files

- `index.html` — Main portfolio dashboard.
- `style.css` — Dashboard layout and styling.
- `script.js` — Navigation, case-study rendering, telemetry, and terminal interactions.
- `resume.html` — Print-friendly resume page.
- `resume.pdf` — PDF resume.
- `backup_v1/` — Earlier versions of the dashboard assets.

The dashboard loads Inter and JetBrains Mono fonts from Google Fonts; an internet connection is needed for those web fonts.
