import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import { Bienvenida } from './Components/Bienvenida/Bienvenida';
import { Sucursales } from './Components/Sucursales/Sucursales';
import './index.css';
import { Personal } from './Components/Personal/Personal';

const App = () => {
    useEffect(() => {
      const checkTokenExpiration = () => {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            console.log('Token expired and removed from localStorage');
          }
        }
      };
  
      // Check token expiration every minute
      const intervalId = setInterval(checkTokenExpiration, 60000);
  
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/personal" element={<Personal />} />
        </Routes>
      </Router>
    );
  };
  
  export default App;