import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Header from './header';


function App() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/call-terminal');
  };

  return (

    <div>

    <Header />
    <div className="App flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">SalesLoft Call Assistant</h1>
      <button
        className="bg-green-500 px-4 py-2 rounded mb-4"
        onClick={handleButtonClick}
      >
        Open Caller Terminal
      </button>
    </div>
  </div>
  );
}

export default App;
