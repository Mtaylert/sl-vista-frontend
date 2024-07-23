import React from 'react';
import './App.css';
import Header from './header';


function CallTerminal() {
  return (

    <div>

<Header />
    <div className="App flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">SalesLoft Call Assistant</h1>
      <ul className="list-disc list-inside space-y-4">
      
        <div className='flex items-start'>
          <input type="checkbox" className="form-checkbox h-5 w-5 border-green-500 text-green-500" />
          <span>Introduce Yourself</span>
        </div>

        <div className='flex items-start'>
          <input type="checkbox" className="form-checkbox h-5 w-5 border-green-500 text-green-500" />
          <span>Discuss New SalesLoft Agent Feature</span>
        </div>

        <div className='flex items-start'>
          <input type="checkbox" className="form-checkbox h-5 w-5 border-green-500 text-green-500" />
          <span>Discuss Opportunities for Growth</span>
        </div>
      </ul>
    </div>
    </div>

  );
}

export default CallTerminal;
