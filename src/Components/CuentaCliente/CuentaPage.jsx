import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
import CuentaDetails from "./CuentaDetails";
import CuentaService from "../../service/CuentaService";

export const CuentaPage = () => {
    const [cuenta, setCuenta] = useState(null);
    const [nombreCliente, setNombreCliente] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCuenta = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Token no encontrado en el localStorage");
                }
                const { cuenta, nombreCliente } = await CuentaService.getById(token);
                setCuenta(cuenta);
                setNombreCliente(nombreCliente);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCuenta();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <NavBar />
            {cuenta ? <CuentaDetails cuenta={cuenta} nombreCliente={nombreCliente} /> : <div>No se encontró la cuenta</div>}
        </>
    );
};

export default CuentaPage;