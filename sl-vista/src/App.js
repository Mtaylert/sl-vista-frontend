import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Header from './header';


function App() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/call-terminal');
  };

  const handleHistoryClick = () => {
    navigate('/call-history');
  };

  return (

    <div>

    <Header />
    <div className="App flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">SalesLoft Call Assistant</h1>
      <button
        className="bg-green-500 px-4 py-2 rounded mb-4 w-48"
        onClick={handleButtonClick}
      >
        My Caller Terminal
      </button>

      <button
        className="bg-green-500 px-4 py-2 rounded mb-4 w-48"
        onClick={handleHistoryClick}
      >
        Call Themes
      </button>
    </div>
  </div>
  );
}

export default App;
