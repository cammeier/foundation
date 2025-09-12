# Foundation Frontend

A basic React application built with Webpack (no Vite).

## Features

- ⚛️ React 18
- 📦 Webpack 5
- 🔧 Babel transpilation
- 🎨 CSS loading
- 🔥 Hot reloading
- 📱 Responsive design

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   
   Or use the dev script with auto-open:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main React component
│   ├── App.css             # Component styles
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── webpack.config.js       # Webpack configuration
├── .babelrc               # Babel configuration
└── package.json           # Dependencies and scripts
```

## Available Scripts

- `npm start` - Start development server
- `npm run dev` - Start development server with auto-open
- `npm run build` - Build for production

The app will be available at `http://127.0.0.1:8080` when running the development server.
