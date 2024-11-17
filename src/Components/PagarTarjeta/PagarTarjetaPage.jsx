import React, { useState, useEffect } from 'react';
import TarjetaService from '../../service/TarjetaService';
import CuentaService from '../../service/CuentaService';
import NavBar from '../Navbar/NavBar';

const PagarTarjetaPage = () => {
    const [tarjetas, setTarjetas] = useState([]);
    const [selectedTarjetaId, setSelectedTarjetaId] = useState(null);
    const [saldoActual, setSaldoActual] = useState(null);
    const [limiteCredito, setLimiteCredito] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [monto, setMonto] = useState("");

    useEffect(() => {
        const fetchTarjetas = async () => {
            try {
                const token = localStorage.getItem('token');
                const tarjetas = await TarjetaService.getAllTarjetas(token);
                setTarjetas(tarjetas);
            } catch (error) {
                console.error('Error fetching tarjetas:', error);
            }
        };

        fetchTarjetas();
    }, []);

    const handleTarjetaChange = (event) => {
        const tarjetaId = event.target.value;
        setSelectedTarjetaId(tarjetaId);
        const tarjeta = tarjetas.find(t => t.id === parseInt(tarjetaId));
        if (tarjeta) {
            setSaldoActual(tarjeta.saldoActual);
            setLimiteCredito(tarjeta.limiteCredito);
        } else {
            setSaldoActual(null);
            setLimiteCredito(null);
        }
    };

    const handlePagar = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setMonto("");
    };

    const handleMontoChange = (event) => {
        setMonto(event.target.value);
    };

    const handleSubmitPago = async () => {
        try {
            const token = localStorage.getItem('token');
            const data = { idTarjeta: selectedTarjetaId, monto: parseFloat(monto) };
            const response = await CuentaService.pagar(data, token);
            alert(response.mensaje);
            handleCloseModal();
        } catch (error) {
            console.error('Error paying:', error);
            if (error.response && error.response.data) {
                alert(`Error al pagar la tarjeta: ${error.response.data}`);
            } else {
                alert('Error al pagar la tarjeta');
            }
        }
    };

    return (
        <>
            <NavBar />
            <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto mt-10">
                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">Pagar Tarjeta</h1>
                <div className="mb-4">
                    <label htmlFor="tarjetaSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Seleccione una Tarjeta
                    </label>
                    <select
                        id="tarjetaSelect"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        onChange={handleTarjetaChange}
                    >
                        <option value="">Seleccione...</option>
                        {tarjetas.map((tarjeta) => (
                            <option key={tarjeta.id} value={tarjeta.id}>
                                {`Tarjeta **** **** **** ${tarjeta.numeroTarjeta.slice(-4)}`}
                            </option>
                        ))}
                    </select>
                </div>
                {saldoActual !== null && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Saldo Actual
                        </label>
                        <div className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {saldoActual}
                        </div>
                    </div>
                )}
                {limiteCredito !== null && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Límite de Crédito Disponible
                        </label>
                        <div className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {limiteCredito}
                        </div>
                    </div>
                )}
                <button
                    className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                    onClick={handlePagar}
                    disabled={!selectedTarjetaId}
                >
                    Pagar Tarjeta
                </button>
            </div>

            {isModalVisible && (
                <div
                    id="crud-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Ingresar Monto
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={handleCloseModal}
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <label htmlFor="monto" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Monto
                                </label>
                                <input
                                    type="number"
                                    id="monto"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    value={monto}
                                    onChange={handleMontoChange}
                                    placeholder="Ingrese el monto"
                                />
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={handleSubmitPago}
                                    >
                                        Pagar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PagarTarjetaPage;