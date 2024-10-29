import axios from 'axios';

const API_URL = 'http://localhost:8081/api/gerente';


const create = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error creating data:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from server');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('Error setting up request');
    }
  }
};

export default {
    create,
}