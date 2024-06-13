import React, { useState } from 'react';
import './styles.css';
import '../app/App.css';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://nightinarcadia.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful!');
        onLoginSuccess(data.token); // Llama a la función de éxito con el token obtenido
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form className='form-container' onSubmit={handleLogin}>
        <div>
          <label className='form-label'>Email:</label>
          <input className='from-input'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='form-label'>Password:</label>
          <input className='from-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='form-button'>Login</button>
        
      </form>
    </div>
  );
};

export default LoginForm;
