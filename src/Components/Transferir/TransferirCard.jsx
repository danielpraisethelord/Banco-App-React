import React, { useState } from "react";

const TransferirCard = ({ onTransferir }) => {
  const [idDestino, setIdDestino] = useState("");
  const [cantidad, setCantidad] = useState("");

  const handleTransferir = () => {
    if (idDestino && cantidad && !isNaN(cantidad)) {
      onTransferir(idDestino, parseFloat(cantidad));
      setIdDestino("");
      setCantidad("");
    } else {
      alert("Por favor, ingrese un ID de destino y una cantidad válida.");
    }
  };

  return (
    <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">Transferir Dinero</h5>
      <div className="mb-4">
        <label htmlFor="idDestino" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          ID de Cuenta Destino
        </label>
        <input
          type="text"
          id="idDestino"
          value={idDestino}
          onChange={(e) => setIdDestino(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Ingrese el ID de la cuenta destino"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Cantidad
        </label>
        <input
          type="text"
          id="cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Ingrese la cantidad"
        />
      </div>
      <button
        onClick={handleTransferir}
        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Transferir
      </button>
    </div>
  );
};

export default TransferirCard;