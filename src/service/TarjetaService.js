import axios from "axios";

const API_URL = "https://proyecto-ordinario-ingenieria-88f417e1c273.herokuapp.com/api/tarjeta";

const create = async (data, token) => {
    try {
        const response = await axios.post(API_URL + "/create", data, {
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

const simulatePurchase = async (data, token, id) => {
    try {
        const response = await axios.post(API_URL + "/simulatePurchase" + "/" + id, data, {
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

const getAllTarjetas = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/tarjetasByUsuario`, {
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

export default {
    create,
    simulatePurchase,
    getAllTarjetas
};