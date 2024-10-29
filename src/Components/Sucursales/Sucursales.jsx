import React, { useEffect, useState } from 'react';
import NavBar from "../Navbar/NavBar";
import { TablaSucursales } from "./TablaSucursales";
import SucursalService from '../../service/SucursalService';
import AgregarSucursalModal from './AgregarSucursalModal'; // Importar el modal de agregar sucursal
import './Sucursal.css';

export const Sucursales = () => {
    const [sucursales, setSucursales] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal de agregar
    const token = localStorage.getItem('token');

    const fetchSucursales = async () => {
        if (token) {
            try {
                const data = await SucursalService.getAll(token);
                setSucursales(data);
                console.log('Sucursales fetched:', data);
            } catch (error) {
                console.error('Error fetching sucursales:', error);
            }
        }
    };

    useEffect(() => {
        fetchSucursales();
    }, [token]);

    const handleAgregarSucursal = () => {
        setIsModalVisible(true); // Mostrar el modal de agregar al presionar el botón
    };

    const handleDeleteSuccess = () => {
        fetchSucursales(); // Volver a obtener la lista de sucursales después de eliminar
    };

    const handleEditSuccess = () => {
        fetchSucursales(); // Volver a obtener la lista de sucursales después de editar
    };

    const handleCloseModal = () => {
        setIsModalVisible(false); // Ocultar el modal de agregar
    };

    return (
        <>
            <NavBar />
            <div className="containerBtn">
                <button className="btnAgregar" onClick={handleAgregarSucursal}>Agregar Sucursal</button>
            </div>
            <TablaSucursales sucursales={sucursales} token={token} onDeleteSuccess={handleDeleteSuccess} onEditSuccess={handleEditSuccess} />
            <AgregarSucursalModal isVisible={isModalVisible} onClose={handleCloseModal} onAddSuccess={fetchSucursales} />
        </>
    );
};