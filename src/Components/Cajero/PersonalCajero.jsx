import { useState } from "react";
import NavBar from "../Navbar/NavBar";
import Personal from "../Personal/Personal";
import { AgregarCajeroModal } from "./AgregarCajeroModal";

export const PersonalCajero = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reload, setReload] = useState(false);

    const handleAgregarCajero = () => {
        setIsModalVisible(true);
    }

    const handleCloseModal = () => {
        setIsModalVisible(false);
    }

    const fetchCajero = () => {
        setReload(!reload);
    }

    return (
        <>
            <NavBar />
            <div className="containerBtn">
                <button 
                    className="btnAgregar" 
                    onClick={handleAgregarCajero}
                    style={{fontSize : '20px', borderRadius : '10px', marginTop : '20px'}}
                >
                    <i className="fa-regular fa-address-book" style={{marginRight : '8px', fontSize : '30px'}}></i>
                    Agregar Cajero
                </button>
            </div>
            <Personal token={token} userRole={userRole} vista={'Cajero'} reload={reload}/>
            <AgregarCajeroModal isVisible={isModalVisible} onClose={handleCloseModal} onAddSuccess={fetchCajero} />
        </>
    );
}