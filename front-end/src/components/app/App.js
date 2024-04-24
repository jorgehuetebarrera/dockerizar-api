import React, { useState } from 'react';
import LoginForm from './logingForm';
import ArbolDecisiones from './ArbolDecisiones';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null); // Opcional: almacenar el token del usuario

  const handleLoginSuccess = (token) => {
    setIsLoggedIn(true);
    setUserToken(token); // Opcional: almacenar el token del usuario en el estado
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