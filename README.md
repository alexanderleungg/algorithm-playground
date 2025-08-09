# Algorithm Playground

**Algorithm Playground** is an interactive web app that animates classic sorting algorithms—Bubble Sort, Merge Sort, Quick Sort, Insertion Sort, Selection Sort—and graph traversals (DFS, BFS). Users can input custom data or generate random arrays, then explore each algorithm step-by-step using playback controls and adjustable speed. Want to go further? Use the **custom-code mode** to write your own algorithms and visualize them live.

## ✨ Features
- **Animated Visualizations**: Watch how sorting and traversal algorithms work under the hood.
- **Flexible Input**: Enter your own data or generate random arrays for exploration.
- **Playback Controls**: Pause, play, step through, and adjust playback speed.
- **Custom-Code Mode**: Write and visualize your unique algorithm logic in real-time.

## 📁 Project Structure
```
algorithm-playground/
├── public/                     # Static assets (HTML, icons, etc.)
├── src/                        # React / TypeScript source files
├── package.json                # Project metadata & dependencies
├── package-lock.json           # Exact dependency versions
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS setup
└── postcss.config.js           # PostCSS configuration
```

## 🚀 Setup & Run Locally
1. **Clone the repo**
   ```bash
   git clone https://github.com/alexanderleungg/algorithm-playground.git
   cd algorithm-playground
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start development server**
   ```bash
   npm start
   ```
4. **Open in browser**
   Navigate to `http://localhost:3000` to interact with the app.

## 🛠 How It Works
- Built with **React** and **TypeScript**, plus **Tailwind CSS** for styling.
- Visualizations use step-by-step animation via state updates.
- Custom-code mode accepts JS-like logic and executes it safely in a controlled environment to render algorithm animations.


---
*Crafted with care by Alexander Leung.*

