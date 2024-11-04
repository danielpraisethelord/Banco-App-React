import { useState } from "react";
import NavBar from "../Navbar/NavBar";
import Personal from "../Personal/Personal";
import { AgregarClienteModal } from "./AgregarClienteModal";

export const ClienteTable = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reload, setReload] = useState(false);

    const handleAgregarCliente = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    }

    const fetchClientes = () => {
        setReload(!reload);
    }

    return (
        <>
            <NavBar />
            <div className="containerBtn">
                <button className="btnAgregar" onClick={handleAgregarCliente} >Agregar Cliente</button>
            </div>
            <Personal token={token} userRole={userRole} vista={'Cliente'} reload={reload} />
            <AgregarClienteModal isVisible={isModalVisible} onClose={handleCloseModal} onAddSuccess={fetchClientes} />
        </>
    );
}