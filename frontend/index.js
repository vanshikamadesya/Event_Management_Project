// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // This wraps the entire app with Router
import App from './App';  // Import the App component (which contains your routes)
import './index.css';  

const root = ReactDOM.createRoot(document.getElementById('root'));  // Make sure 'root' exists in index.html
root.render(
  <BrowserRouter>  {/* This wraps the entire App in BrowserRouter for routing */}
    <App />
  </BrowserRouter>
);
