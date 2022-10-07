import React from 'react';
import './App.css';
import { getCategories } from './services/api';

function App() {
  // Requisito 1
  return (
    <div className="App">
      { getCategories() }

    </div>
  );
}

export default App;
