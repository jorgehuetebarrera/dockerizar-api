
El front-end del proyecto está construido con React y consiste en una interfaz de usuario para interactuar con la API back-end.

#### Estructura del Proyecto Front-End

El proyecto front-end está estructurado de la siguiente manera:

front-end/
│
├── carpeta components/
│   ├── app/
│   │   ├── App.js
│   │   ├── ArbolDecisiones.js
│   │   ├── CreateUser.js
│   │   ├── LoginForm.js
│   │   └── styles.css
│   │
│   └── index.js
│
├── index.js
├── index.css
└── reportWebVitals.js


#### Ejemplos de Código

A continuación, se presentan algunos ejemplos de código de los archivos mencionados:

* **App.js** (Componente principal):

```
import React, { useState } from 'react';
import LoginForm from './logingForm';
import ArbolDecisiones from './ArbolDecisiones';
import CreateUser from './CreateUser';
import './styles.css';function App() {
  // Lógica del componente
}export default App;
```


* **LoginForm.js** (Componente para el formulario de inicio de sesión):

```
import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Realizar la lógica de inicio de sesión (por ejemplo, con fetch)
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful!');
        onLoginSuccess(data.token); // Llama a la función de éxito con el token obtenido (si es necesario)
      } else {
        console.error('Login failed');
        // Manejar el error de inicio de sesión (mostrar mensaje al usuario, etc.)
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
```


#### Ejecución del Proyecto

Para ejecutar el proyecto front-end, siga los siguientes pasos:

1. Asegúrese de tener Node.js y npm instalados.
2. Instale las dependencias del proyecto con `npm install`.
3. Inicie la aplicación React con `npm start`.
