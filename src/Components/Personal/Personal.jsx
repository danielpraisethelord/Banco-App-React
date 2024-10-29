import { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
import PersonalService from '../../service/PersonalService';
import { TablaPersonal } from "./TablaPersonal";
import AgregarGerenteModal from './AgregarGerenteModal';

export const Personal = () => {
    const [personal, setPersonal] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const token = localStorage.getItem('token');

    const fetchPersonal = async () => {
        if (token) {
            try {
                const data = await PersonalService.getAll(token);
                setPersonal(data);
                console.log('Personal fetched:', data);
            } catch (error) {
                console.error('Error fetching personal:', error);
            }
        }
    }

    useEffect(() => {
        fetchPersonal();
    }, [token]);

    const handleAddGerenteClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleAddSuccess = () => {
        fetchPersonal();
    };

    return (
        <>
            <NavBar/>
            <div className="containerBtn">
                <button className="btnAgregar" onClick={handleAddGerenteClick}>Agregar Gerente</button>
            </div>
            <TablaPersonal personal={personal} token={token}/>
            <AgregarGerenteModal 
                isVisible={isModalVisible} 
                onClose={handleCloseModal} 
                onAddSuccess={handleAddSuccess}
                token = {token}
            />
        </>
    );
}