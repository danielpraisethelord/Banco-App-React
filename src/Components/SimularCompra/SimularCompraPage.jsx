import React, { useState, useEffect } from 'react';
import TarjetaService from '../../service/TarjetaService';
import NavBar from '../Navbar/NavBar';

const SimularCompraPage = () => {
    const [tarjetas, setTarjetas] = useState([]);
    const [selectedTarjetaId, setSelectedTarjetaId] = useState(null);
    const [precio, setPrecio] = useState("");

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
        setSelectedTarjetaId(event.target.value);
    };

    const handlePrecioChange = (event) => {
        setPrecio(event.target.value);
    };

    const handleSimularCompra = async () => {
        try {
            const token = localStorage.getItem('token');
            const data = { amount: parseFloat(precio) };
            const response = await TarjetaService.simulatePurchase(data, token, selectedTarjetaId);
            alert(response);
        } catch (error) {
            console.error('Error simulating purchase:', error);
            if (error.response && error.response.data) {
                alert(`Error al simular la compra: ${error.response.data}`);
            } else {
                alert('Error al simular la compra: ' + error);
            }
        }
    };

    return (
        <>
            <NavBar />
            <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto mt-10">
                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">Simular Compra</h1>
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
                <div className="mb-4">
                    <label htmlFor="precio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Precio
                    </label>
                    <input
                        type="number"
                        id="precio"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        value={precio}
                        onChange={handlePrecioChange}
                        placeholder="Ingrese el precio"
                    />
                </div>
                <button
                    className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                    onClick={handleSimularCompra}
                    disabled={!selectedTarjetaId || !precio}
                >
                    Simular Compra
                </button>
            </div>
        </>
    );
};

export default SimularCompraPage;