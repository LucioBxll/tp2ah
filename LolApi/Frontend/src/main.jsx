import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './context/UserContext';
import { AppRouter } from './router/AppRouter';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <AppRouter />
    </UserProvider>
  </React.StrictMode>
);
