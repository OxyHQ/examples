import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WebOxyProvider } from '@oxyhq/auth';
import { App } from './App.tsx';
import './styles.css';

const OXY_API_URL = import.meta.env.VITE_OXY_API_URL ?? 'https://api.oxy.so';
const OXY_AUTH_WEB_URL = import.meta.env.VITE_OXY_AUTH_WEB_URL;

const container = document.getElementById('root');
if (!container) {
  throw new Error('Missing #root element in index.html');
}

createRoot(container).render(
  <StrictMode>
    <WebOxyProvider baseURL={OXY_API_URL} authWebUrl={OXY_AUTH_WEB_URL}>
      <App />
    </WebOxyProvider>
  </StrictMode>,
);
