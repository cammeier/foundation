import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Foundation Frontend</h1>
        <p>A basic React app built with Webpack</p>
        
        <div className="counter-section">
          <h2>Counter Demo</h2>
          <p>Current count: <span className="count">{count}</span></p>
          <div className="button-group">
            <button onClick={() => setCount(count + 1)}>
              Increment
            </button>
            <button onClick={() => setCount(count - 1)}>
              Decrement
            </button>
            <button onClick={() => setCount(0)}>
              Reset
            </button>
          </div>
        </div>

        <div className="info-section">
          <h3>Features:</h3>
          <ul>
            <li>✅ React 18</li>
            <li>✅ Webpack 5</li>
            <li>✅ Babel transpilation</li>
            <li>✅ CSS loading</li>
            <li>✅ Hot reloading</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;

