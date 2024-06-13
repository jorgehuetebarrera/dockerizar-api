import React, { useState } from 'react';
import './styles.css';
import '../app/App.css';

const CreateUser = ({ onRegisterSuccess }) => {
  const [userName, setUserName] = useState('');
  const [surName, setSurName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      userName: userName,
      surName: surName,
      password: password,
      email: email
    };

    try {
      const response = await fetch('https://nithmarearcadia.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        console.log('Registration successful!');
        onRegisterSuccess();
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const redirectToLogin = () => {
    // Aquí puedes realizar la redirección al formulario de inicio de sesión
    window.location.href = '/login'; // Cambia la ruta según tu configuración
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User Name:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Surname:
        <input
          type="text"
          value={surName}
          onChange={(e) => setSurName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Register</button>
      
    </form>
  );
};

export default CreateUser;