import axios from 'axios';

const API_URL = 'http://localhost:8081/login';

const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error during login:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No response received:', error.request);
      throw new Error('No response received from server');
    } else {
      // Algo pasó al configurar la solicitud que desencadenó un error
      console.error('Error setting up request:', error.message);
      throw new Error('Error setting up request');
    }
  }
};

export default {
  login
};