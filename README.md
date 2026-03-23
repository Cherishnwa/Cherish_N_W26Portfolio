# Cherish Nwansi — Portfolio

Personal portfolio website for COMP3078 · George Brown College.

---

## 📂 Project Structure

```
cherish_portfolio/
│
├── index.html          ← Main page — all sections live here
├── css/
│   └── style.css       ← All styles — colours, layout, fonts
├── js/
│   └── main.js         ← All interactive features
├── images/
│   ├── profile.jpg     ← YOUR PHOTO (add this file!)
│   ├── capstone-main.png   ← Capstone screenshot (add this!)
│   └── ...             ← Other project screenshots
└── Cherish_Nwansi_CV.pdf  ← YOUR CV (add this file!)
```

---

## 🚀 How to Open in VS Code

1. Unzip `cherish_portfolio.zip`
2. Open VS Code
3. **File → Open Folder** → select the `cherish_portfolio` folder
4. Install the **Live Server** extension (search in Extensions panel)
5. Right-click `index.html` → **Open with Live Server**
6. Your portfolio opens in the browser and auto-refreshes on save ✓

---

## ✏️ What to Edit

### 1. Add Your Photo
- Save your portrait as `images/profile.jpg`
- In `index.html`, find both `<img src="https://avatars...">` tags and change to:
  ```html
  <img src="images/profile.jpg" alt="Cherish Nwansi" />
  ```

### 2. Add Your Real Contact Details
Search `index.html` for these placeholders and update:
- `your.email@georgebrown.ca` → your real email
- `https://linkedin.com/in/yourprofile` → your LinkedIn URL

### 3. Add Your CV
- Save your resume as `Cherish_Nwansi_CV.pdf` in the root folder
- The download buttons in the nav, hero, and résumé sections are already wired up

### 4. Add Project Screenshots
- Save screenshots as `images/python-labs.png`, `images/fullstack.png`, etc.
- In each project card in `index.html`, change:
  ```html
  <img src="images/person-m-3.webp" ...>
  ```
  to:
  ```html
  <img src="images/python-labs.png" ...>
  ```

### 5. Add Live Demo Links
Each project card has a **Live Demo** button:
```html
<a href="#" target="_blank" class="btn-sm-primary">
  <i class="bi bi-play-circle"></i> Live Demo
</a>
```
Replace `href="#"` with your actual deployed URL, e.g.:
```
href="https://cherishnwa.github.io/comp2152_labs"
```
If a project has no live demo, delete that `<a>` tag.

### 6. Fill in the Capstone Section
Search `index.html` for `[Your Capstone Project Title]` and replace all
`[bracketed placeholders]` with your real capstone content.

Add your capstone screenshot:
```html
<img src="images/capstone-main.png" alt="Capstone" class="capstone-main-img" />
```

### 7. Add More Projects
Copy the commented-out project template in `index.html`:
```html
<!-- ── PROJECT TEMPLATE ──
<div class="project-card fade-in" data-cat="fullstack">
  ...
</div>
-->
```
Uncomment it, fill in your details, and add the appropriate `data-cat` value.

### 8. Change Colours
Open `css/style.css` — the top section has all colour variables:
```css
:root {
  --pk:  #C2185B;   /* deep pink */
  --ph:  #E91E8C;   /* hot pink  */
  ...
}
```
Change any hex value to retheme the whole site instantly.

---

## 🔧 Sections Overview

| Section | ID | Notes |
|---|---|---|
| Navigation | `#navbar` | Sticky, mobile responsive |
| Hero | `#hero` | Photo, typed text, badges |
| Stats Strip | `#statsStrip` | Animated counters |
| About | `#about` | Bio, GitHub card, skills |
| What I Build | `#services` | 4 speciality cards |
| Résumé | `#resume` | Skill bars, donut chart, timelines |
| Projects | `#projects` | Filter tabs + cards with demo links |
| Capstone | `#capstone` | Dedicated highlight section |
| Contact | `#contact` | Form + social links |
| Footer | `footer` | Links + copyright |

---

## 📦 No Dependencies to Install

Everything loads from CDN — just open `index.html` in Live Server.
No `npm install`, no build step required.

---

© 2025 Cherish Nwansi · COMP3078 · George Brown College
