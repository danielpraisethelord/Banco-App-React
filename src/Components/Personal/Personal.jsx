import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar/NavBar';
import {TablaPersonal} from './TablaPersonal';
import AgregarGerenteModal from './AgregarGerenteModal';
import PersonalService from '../../service/PersonalService';
import EjecutivoService from '../../service/EjecutivoService';
import CajeroService from '../../service/CajeroService';
import ClienteService from '../../service/ClienteService';

const Personal = ({ token, userRole, vista, reload }) => {
  const [personal, setPersonal] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchPersonal = async () => {
    if (token && userRole === 'ROLE_ADMIN') {
      try {
        const data = await PersonalService.getAll(token);
        setPersonal(data);
        console.log('Personal fetched:', data);
      } catch (error) {
        console.error('Error fetching personal:', error);
      }
    }

    if (token && userRole === 'ROLE_GERENTE') {
      try {
        if (vista === 'Ejecutivo') {
          const data = await EjecutivoService.getAll(token);
          setPersonal(data);
          console.log('Ejecutivos fetched:', data);
        } else if (vista === 'Cajero') {
          const data = await CajeroService.getAll(token);
          setPersonal(data);
          console.log('Cajeros fetched:', data);
        } else if (vista === 'Cliente') {
          const data = await ClienteService.getAll(token);
          setPersonal(data);
          console.log('Clientes fetched:', data);
        }
      } catch (error) {
        console.error('Error fetching personal:', error);
      }
    }
  };

  useEffect(() => {
    fetchPersonal();
  }, [token, userRole, vista, reload]);

  const handleAddGerenteClick = () => {
    console.log('Agregar gerente clicked');
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddSuccess = () => {
    fetchPersonal();
  };

  const handleEditSuccess = () => {
    fetchPersonal(); // Vuelve a cargar el personal después de editar
  }

  return (
    <>
      {/* <NavBar /> */}
      {userRole === 'ROLE_ADMIN' && (
        <>
          <div className="containerBtn">
            <button className="btnAgregar" onClick={handleAddGerenteClick}>Agregar Gerente</button>
          </div>
          <AgregarGerenteModal
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            onAddSuccess={handleAddSuccess}
            token={token}
          />
        </>
      )}
      <TablaPersonal 
        personal={personal} 
        token={token} 
        userRole={userRole} 
        vista={vista} 
        onEditSuccess={handleEditSuccess}
        onDeleteSuccess={fetchPersonal}
        />
    </>
  );
};

export default Personal;