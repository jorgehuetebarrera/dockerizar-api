import React, { useState } from 'react';
import LoginForm from './logingForm';
import ArbolDecisiones from './ArbolDecisiones';
import CreateUser from './CreateUser';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLoginSuccess = (token) => {
    setIsLoggedIn(true);
  };

  const handleShowRegistration = () => {
    setShowRegistration(true);
  };

  const handleRegisterSuccess = () => {
    setShowRegistration(false);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <h1>Sombras de la Noche</h1>
      {!isLoggedIn ? (
        showRegistration ? (
          <CreateUser onRegisterSuccess={handleRegisterSuccess} />
        ) : (
          <>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            <button onClick={handleShowRegistration} className='button-register'>
              Registrar usuario
            </button>
          </>
        )
      ) : (
        <ArbolDecisiones />
      )}
    </div>
  );
}

export default App;
