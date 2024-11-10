import axios from 'axios';

const API_URL = 'http://localhost:8081/api/cajero';

const getAll = async (token) => {
    try {
        const response = await axios.get(API_URL + "/all", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error fetching data:", error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw new Error("No response received from server");
        } else {
            console.error("Error setting up request:", error.message);
            throw new Error("Error setting up request");
        }
    }
}

const getById = async (id, token) => {
    try {
        const response = await axios.get(API_URL + `/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error fetching data:", error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw new Error("No response received from server");
        } else {
            console.error("Error setting up request:", error.message);
            throw new Error("Error setting up request");
        }
    }
}

const create = async (data, token) => {
    try {
        const response = await axios.post(API_URL + '/create', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error creating data:", error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw new Error("No response received from server");
        } else {
            console.error("Error setting up request:", error.message);
            throw new Error("Error setting up request");
        }
    }
}

const update = async (id, data, token) => {
    try {
        const response = await axios.put(API_URL + `/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error updating data:", error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw new Error("No response received from server");
        } else {
            console.error("Error setting up request:", error.message);
            throw new Error("Error setting up request");
        }
    }
}

const deleteCajero = async (id, token) => {
    try {
        const response = await axios.delete(API_URL + `/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error deleting data:", error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw new Error("No response received from server");
        } else {
            console.error("Error setting up request:", error.message);
            throw new Error("Error setting up request");
        }
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteCajero
}