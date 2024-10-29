import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import LoginService from '../../service/LoginService';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await LoginService.login(username, password);
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token);
      setError('');

      const decodedToken = jwtDecode(data.token);
      console.log('Decoded token:', decodedToken); // Imprimir el token decodificado completo

      // Extraer el rol del campo 'authorities'
      const authorities = JSON.parse(decodedToken.authorities);
      const userRole = authorities[0]?.authority; // Asumiendo que siempre hay al menos un rol
      console.log('User role:', userRole);

      localStorage.setItem('role', userRole);

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'An error occurred during login');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div className="form_front">
          <div className="form_details">Login</div>
          <input
            placeholder="Username"
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btnLogin" type="submit">Login</button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default Login;