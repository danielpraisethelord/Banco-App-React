import { useState } from "react";
import NavBar from "../Navbar/NavBar";
import Personal from "../Personal/Personal";
import { AgregarEjecutivoModal } from "./AgregarEjecutivoModal";

export const EjecutivoTable = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reload, setReload] = useState(false);

    const handleAgregarEjecutivo = () => {
        setIsModalVisible(true);
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
    }

    const fetchEjecutivos = () => {
        setReload(!reload);
    }

    return (
        <>
            <NavBar />
            <div className="containerBtn">
                <button 
                    className="btnAgregar" 
                    onClick={handleAgregarEjecutivo}
                    style={{fontSize : '20px', borderRadius : '10px', marginTop : '20px'}}
                >
                    <i className="fa-regular fa-address-book" style={{marginRight : '8px', fontSize : '30px'}}></i>
                    Agregar Ejecutivo
                </button>
            </div>
            <Personal token={token} userRole={userRole} vista={'Ejecutivo'} reload={reload}/>
            <AgregarEjecutivoModal isVisible={isModalVisible} onClose={handleCloseModal} onAddSuccess={fetchEjecutivos} />
        </>
    );
}