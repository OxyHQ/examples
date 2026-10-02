import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BloomProvider } from '@oxy.so/bloom/provider';
import { OxyProvider } from '@oxy.so/services';
import { OXY_API_URL, OXY_CLIENT_ID } from './oxy-config';
import { App } from './App.tsx';
import './styles.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Missing #root element in index.html');
}

createRoot(container).render(
  <StrictMode>
    <BloomProvider>
    <OxyProvider baseURL={OXY_API_URL} clientId={OXY_CLIENT_ID}>
      <App />
    </OxyProvider>
    </BloomProvider>
  </StrictMode>,
);
