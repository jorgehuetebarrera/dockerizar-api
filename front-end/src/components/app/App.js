import React, { useState } from 'react';
import LoginForm from './logingForm';
import ArbolDecisiones from './ArbolDecisiones';
import CreateUser from './CreateUser';
import './styles.css';


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
            <button onClick={handleShowRegistration} className='form-container' style={{ margin: '20px auto', display: 'block', textAlign: 'center', border: '2px solid #c0c0c0', borderRadius: '4px', padding: '10px 10px' }}>
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