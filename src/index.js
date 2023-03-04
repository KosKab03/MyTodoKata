import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

const container = document.getElementById('todoapp');
const MainSection = ReactDOM.createRoot(container);
MainSection.render(<App />);
