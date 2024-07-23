import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CallTerminal from './call_terminal';
import TopicAnalysis from './call_topic_analysis';
import './index.css'; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/call-terminal" element={<CallTerminal />} />
        <Route path="/call-history" element={<TopicAnalysis />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
