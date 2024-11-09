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
                <button 
                    className="btnAgregar" 
                    onClick={handleAgregarCliente}
                    style={{fontSize : '20px', borderRadius : '10px', marginTop : '20px'}}
                >
                    <i className="fa-regular fa-address-book" style={{marginRight : '8px', fontSize : '30px'}}></i>
                    Agregar Cliente
                </button>
            </div>
            <Personal token={token} userRole={userRole} vista={'Cliente'} reload={reload} />
            <AgregarClienteModal isVisible={isModalVisible} onClose={handleCloseModal} onAddSuccess={fetchClientes} />
        </>
    );
}