import React, { useState } from "react";
import NavBar from "../Navbar/NavBar";
import RetirarCard from "./RetirarCard";
import CuentaService from "../../service/CuentaService";

const RetirarPage = () => {
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleRetirar = async (cantidad) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token no encontrado en el localStorage");
      }
      const response = await CuentaService.retirar(token, cantidad);
      setMensaje(`Se ha retirado $${cantidad} de tu cuenta.`);
      setError("");
    } catch (error) {
      setError(error.message || "Error al realizar el retiro");
      setMensaje("");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center mt-4">
        <RetirarCard onRetirar={handleRetirar} />
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

export default RetirarPage;