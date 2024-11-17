import React from "react";
import "./CuentaDetails.css";

const CuentaDetails = ({ cuenta, nombreCliente }) => {
  console.log("cuenta:", cuenta);
  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center mb-6">
        <svg className="w-20 h-20 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path fill="#9ca3af" d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM80 64l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L80 96c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 352c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32zm0 32l0 64 192 0 0-64L96 256zM240 416l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
        </svg>
      </div>
      <h5 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Buen día {nombreCliente}</h5>
      <p className="text-lg text-center text-gray-500 dark:text-gray-400 mb-6">Estos son los detalles de tu cuenta</p>

      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
        <p className="text-lg"><strong>Fecha de Apertura:</strong> {cuenta.fechaApertura}</p>
        <p className="text-lg"><strong>Tipo de Cuenta:</strong> {cuenta.tipoCuenta}</p>
        <p className="text-lg"><strong>Moneda:</strong> {cuenta.moneda}</p>
        <p className="text-lg"><strong>Saldo Actual:</strong> ${cuenta.saldoActual}</p>
      </div>

      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        <h5 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Tarjetas</h5>
        {cuenta.tarjetas.map((tarjeta, index) => (
          <p key={index} className="text-lg"><strong>Tarjeta {index + 1}:</strong> **** **** **** {tarjeta.numeroTarjeta.slice(-4)}</p>
        ))}
      </div>
    </div>
  );
};

export default CuentaDetails;