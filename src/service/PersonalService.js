import axios from "axios";

const API_URL = "https://proyecto-ordinario-ingenieria-88f417e1c273.herokuapp.com/api/personal";

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
        const response = await axios.get(`${API_URL}/${id}`, {
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
    getAll,
    getById
}