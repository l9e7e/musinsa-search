import React from 'react';
import ReactDOM from 'react-dom/client';
import MusisnaSearchApp from './MusisnaSearchApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MusisnaSearchApp />
  </React.StrictMode>
);
