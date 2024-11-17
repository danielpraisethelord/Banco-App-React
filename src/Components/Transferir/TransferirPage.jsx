import React, { useState } from "react";
import NavBar from "../Navbar/NavBar";
import TransferirCard from "./TransferirCard";
import CuentaService from "../../service/CuentaService";

const TransferirPage = () => {
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleTransferir = async (idDestino, cantidad) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token no encontrado en el localStorage");
      }
      const response = await CuentaService.transferir(token, idDestino, cantidad);
      setMensaje(`Se ha transferido $${cantidad} a la cuenta con ID ${idDestino}.`);
      setError("");
    } catch (error) {
      setError(error.message || "Error al realizar la transferencia");
      setMensaje("");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center mt-4">
        <TransferirCard onTransferir={handleTransferir} />
        {mensaje && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {mensaje}
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>
    </>
  );
};

export default TransferirPage;