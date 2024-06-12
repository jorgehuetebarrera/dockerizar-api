import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';
import ArbolDecisiones from './ArbolDecisiones';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [setUserToken] = useState(null); // Opcional: almacenar el token del usuario
  const history = useHistory();

  const handleLoginSuccess = (token) => {
    setIsLoggedIn(true);
    setUserToken(token); // Opcional: almacenar el token del usuario en el estado
  };

  return (
    <div className="App">
      <h1>Sombras de la Noche</h1>
      {!isLoggedIn ? (
        <>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
          <button onClick={() => history.push('/create-user')}>
            Go to Create User
          </button>
        </>
      ) : (
        <ArbolDecisiones />
      )}
    </div>
  );
}

export default App;