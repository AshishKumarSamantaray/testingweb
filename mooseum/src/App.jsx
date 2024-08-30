import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PreLoader from './frontendComponents/PreLoader';

const App = () => {
  const [loading, setLoading] = useState(true);

  // Function to hide preloader after animation completes
  const handleAnimationComplete = () => {
    setLoading(false);  // Only hide preloader after animation finishes
  };

  return (
    <div className="app-container">
      {loading ? (
        <PreLoader onAnimationComplete={handleAnimationComplete} /> // Pass the callback to PreLoader
      ) : (
        <Outlet /> // Render the actual content when loading is false
      )}
    </div>
  );
};

export default App;
