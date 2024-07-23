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
    <div className="h-5 w-5 border-2 border-green-500 rounded-full mr-2"></div>
    <span>Introduce Yourself</span>
  </div>

  <div className='flex items-start'>
    <div className="h-5 w-5 border-2 border-green-500 rounded-full mr-2"></div>
    <span>Discuss New SalesLoft Agent Feature</span>
  </div>

  <div className='flex items-start'>
    <div className="h-5 w-5 border-2 border-green-500 rounded-full mr-2"></div>
    <span>Discuss Opportunities for Growth</span>
  </div>
</ul>
    </div>
    </div>

  );
}

export default CallTerminal;
