import React, { useState, useEffect } from 'react';
import ClienteService from '../../service/ClienteService';
import NavBar from '../Navbar/NavBar';
import TarjetaCardModal from './TarjetaCard';

const TarjetaPage = () => {
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [selectedCuentaId, setSelectedCuentaId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const token = localStorage.getItem('token');
                const clientesData = await ClienteService.getAll(token);
                setClientes(clientesData);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClientes();
    }, []);

    const handleClienteChange = (event) => {
        const clienteId = event.target.value;
        setSelectedCliente(clienteId);
        const cliente = clientes.find(c => c.id === parseInt(clienteId));
        if (cliente && cliente.cuentas && cliente.cuentas.length > 0) {
            setSelectedCuentaId(cliente.cuentas[0].id);
        } else {
            setSelectedCuentaId(null);
        }
    };

    const handleShowModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleAddSuccess = () => {
        // Lógica para recargar la lista de tarjetas o realizar alguna acción después de agregar una tarjeta
    };

    return (
        <>
            <NavBar />
            <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto mt-10">
                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">Crear Tarjeta</h1>
                <div className="mb-4">
                    <label htmlFor="clienteSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Seleccione un Cliente
                    </label>
                    <select
                        id="clienteSelect"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        onChange={handleClienteChange}
                    >
                        <option value="">Seleccione...</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                                {`${cliente.nombre} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}`}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                    onClick={handleShowModal}
                    disabled={!selectedCuentaId}
                >
                    Crear Tarjeta
                </button>
            </div>
            <TarjetaCardModal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                onAddSuccess={handleAddSuccess}
                cuentaId={selectedCuentaId}
            />
        </>
    );
};

export default TarjetaPage;