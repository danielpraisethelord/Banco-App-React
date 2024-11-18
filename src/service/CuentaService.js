import axios from 'axios';

const API_URL = 'https://proyecto-ordinario-ingenieria-88f417e1c273.herokuapp.com/api/cuenta';
const API_CLIENTE_URL = 'https://proyecto-ordinario-ingenieria-88f417e1c273.herokuapp.com/api/cliente';

const getById = async (token) => {
    try {
        // Obtener el RFC del localStorage
        const rfc = localStorage.getItem('rfc');
        if (!rfc) {
            throw new Error("RFC no encontrado en el localStorage");
        }

        // Buscar al cliente por RFC
        const clienteResponse = await axios.get(`${API_CLIENTE_URL}/rfc/${rfc}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const cliente = clienteResponse.data;
        if (!cliente || !cliente.cuentas || cliente.cuentas.length === 0) {
            throw new Error("No se encontraron cuentas para el cliente");
        }

        // Obtener el ID de la cuenta
        const idCuenta = cliente.cuentas[0].id;

        // Buscar la cuenta por ID
        const cuentaResponse = await axios.get(`${API_URL}/${idCuenta}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Retornar la cuenta junto con el nombre del cliente
        return {
            cuenta: cuentaResponse.data,
            nombreCliente: cliente.nombre
        };
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

const depositar = async (token, cantidad) => {
    try {
        // Obtener el RFC del localStorage
        const rfc = localStorage.getItem('rfc');
        if (!rfc) {
            throw new Error("RFC no encontrado en el localStorage");
        }

        // Buscar al cliente por RFC
        const clienteResponse = await axios.get(`${API_CLIENTE_URL}/rfc/${rfc}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const cliente = clienteResponse.data;
        if (!cliente || !cliente.cuentas || cliente.cuentas.length === 0) {
            throw new Error("No se encontraron cuentas para el cliente");
        }

        // Obtener el ID de la cuenta
        const idCuenta = cliente.cuentas[0].id;

        // Realizar el depósito
        const response = await axios.post(`${API_URL}/depositar`, {
            id: idCuenta,
            monto: cantidad,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error depositing:", error.response.data);
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

const retirar = async (token, cantidad) => {
    try {
        // Obtener el RFC del localStorage
        const rfc = localStorage.getItem('rfc');
        if (!rfc) {
            throw new Error("RFC no encontrado en el localStorage");
        }

        // Buscar al cliente por RFC
        const clienteResponse = await axios.get(`${API_CLIENTE_URL}/rfc/${rfc}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const cliente = clienteResponse.data;
        if (!cliente || !cliente.cuentas || cliente.cuentas.length === 0) {
            throw new Error("No se encontraron cuentas para el cliente");
        }

        // Obtener el ID de la cuenta
        const idCuenta = cliente.cuentas[0].id;

        // Realizar el retiro
        const response = await axios.post(`${API_URL}/retirar`, {
            id: idCuenta,
            monto: cantidad,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error withdrawing:", error.response.data);
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

const transferir = async (token, idDestino, cantidad) => {
    try {
        // Obtener el RFC del localStorage
        const rfc = localStorage.getItem('rfc');
        if (!rfc) {
            throw new Error("RFC no encontrado en el localStorage");
        }

        // Buscar al cliente por RFC
        const clienteResponse = await axios.get(`${API_CLIENTE_URL}/rfc/${rfc}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const cliente = clienteResponse.data;
        if (!cliente || !cliente.cuentas || cliente.cuentas.length === 0) {
            throw new Error("No se encontraron cuentas para el cliente");
        }

        // Obtener el ID de la cuenta de origen
        const idOrigen = cliente.cuentas[0].id;

        // Realizar la transferencia
        const response = await axios.post(`${API_URL}/transferir`, {
            idOrigen: idOrigen,
            idDestino: idDestino,
            monto: cantidad,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error transferring:", error.response.data);
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

const pagar = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}/pagar`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error paying:", error.response.data);
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
    getById,
    depositar,
    retirar,
    transferir,
    pagar,
}