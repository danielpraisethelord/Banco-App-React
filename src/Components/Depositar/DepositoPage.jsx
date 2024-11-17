import React, { useState } from "react";
import NavBar from "../Navbar/NavBar";
import DepositoCard from "./DepositoCard";
import CuentaService from "../../service/CuentaService";

const DepositoPage = () => {
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleDepositar = async (cantidad) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token no encontrado en el localStorage");
      }
      const response = await CuentaService.depositar(token, cantidad);
      setMensaje(`Se ha depositado $${cantidad} a tu cuenta.`);
      setError("");
    } catch (error) {
      setError(error.message || "Error al realizar el depósito");
      setMensaje("");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center mt-4">
        <DepositoCard onDepositar={handleDepositar} />
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

export default DepositoPage;