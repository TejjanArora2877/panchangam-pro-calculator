# Panchangam Pro Calculator

A precise Vedic Panchang calculator built with React + TypeScript + Vite.  
This application computes core Panchang elements using astronomical coordinates and ecliptic longitude calculations.

## 🔭 Features

- 📍 GPS-based location detection with manual override
- 📅 Date & time based Panchang calculation
- 🌙 Tithi, Nakshatra, Yoga, Vara
- ♈ Sun & Moon Rashi
- ⏱ Sunrise, Sunset, Moonrise, Moonset
- 🌗 Moon phase detection
- 🌐 Multilingual support (English / Hindi / Marathi)
- 🌙 Dark / Light theme
- 📄 PDF export support
- ⚡ Fast Vite-powered UI

## 🧮 Calculation Method

- Uses astronomical azimuth & altitude data
- Converts to ecliptic longitude
- Applies refraction correction
- Computes Panchang elements using classical angular divisions:
  - Tithi = 12° Moon–Sun separation
  - Nakshatra = 13°20′ Moon longitude
  - Yoga = 13°20′ (Sun + Moon sum)

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- Tailwind-style utility CSS
- Astronomy API (ipgeolocation.io)
- Vercel hosting

## 🚀 Live Demo

Deployed on Vercel:  
(https://panchangam-pro-calculator.vercel.app/)

## ▶️ Run Locally

```bash
npm install
npm run dev

Environment Variable
Create .env.local:
VITE_IPGEOLOCATION_API_KEY=your_key_here

Author
Tejjan Arora
Shah and Anchor Kutchhi Engineering College

Mentor
Sarika Rane
Professor at Shah and Anchor Kutchhi Engineering College

📚 Academic Project

Built as a Vedic astronomy + software engineering project combining astronomical coordinate conversion with traditional Panchang computation.

---

# ✅ Then Commit Update

In VS Code terminal:

```bash
git add README.md
git commit -m "Replace README with project documentation"
git push