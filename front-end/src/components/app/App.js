import React, { useState } from 'react';
import LoginForm from './logingForm';
import ArbolDecisiones from './ArbolDecisiones';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const handleLoginSuccess = (token) => {
    setIsLoggedIn(true);
    
  };

  return (
    <div className="App">
      <h1>Sombras de la Noche</h1>
      {!isLoggedIn ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <ArbolDecisiones />
      )}
    </div>
  );
}

export default App;