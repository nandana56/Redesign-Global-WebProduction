import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ── Suppress harmless WebGL noise that appears after context-loss recovery ──
// Chrome emits these at the GL driver level; they cannot be caught in Three.js.
const _origError = console.error.bind(console);
console.error = (...args) => {
  const msg = args[0];
  if (typeof msg === 'string' &&
    (msg.includes('Texture is immutable') ||
     msg.includes('GL_INVALID_OPERATION') ||
     msg.includes('WebGL: INVALID_OPERATION'))) {
    return; // swallow — purely cosmetic after context loss
  }
  _origError(...args);
};

const _origWarn = console.warn.bind(console);
console.warn = (...args) => {
  const msg = args[0];
  if (typeof msg === 'string' && msg.includes('THREE.Clock')) {
    return; // THREE.Clock deprecation — comes from R3F internals, not our code
  }
  _origWarn(...args);
};

// StrictMode is intentionally removed: it double-mounts effects in dev which
// exhausts the browser WebGL context limit (~8 contexts) with 20+ Canvas elements.
createRoot(document.getElementById('root')).render(<App />);
