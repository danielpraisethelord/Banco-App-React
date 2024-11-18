import axios from 'axios';

const API_URL = 'https://proyecto-ordinario-ingenieria-88f417e1c273.herokuapp.com/api/sucursal';

const getAll = async (token) => {
  try {
    const response = await axios.get(API_URL + '/all', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error fetching data:', error.response.data);
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

const update = async (id, data, token) => {
  try {
    const response = await axios.patch(`${API_URL}/update/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error updating data:', error.response.data);
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

const create = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/create`, data, {
        headers: {
            Authorization: `Bearer ${token}`
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

const deleteSucursal = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error deleting data:', error.response.data);
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

const getSucursalesSinGerente = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/sin-gerente`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
  });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error fetching data:', error.response.data);
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

const getSucursalesNombreId = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/all-name-id`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
  });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error fetching data:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from server');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('Error setting up request');
    }
  }
}

export default {
  getAll,
  update,
  create,
  deleteSucursal,
  getSucursalesSinGerente,
  getSucursalesNombreId
};