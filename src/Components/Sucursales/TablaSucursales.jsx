import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TablaSucursales.css';
import ModalDelete from './ModalDelete';
import EditarSucursalModal from './EditarSucursalModal'; // Importar el modal de editar sucursal
import SucursalService from '../../service/SucursalService';

export const TablaSucursales = ({ sucursales, token, onDeleteSuccess, onEditSuccess }) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Estado para controlar la visibilidad del modal de editar
  const [selectedSucursal, setSelectedSucursal] = useState(null);

  const handleActualizar = (sucursal) => {
    setSelectedSucursal(sucursal);
    setIsEditModalVisible(true); // Mostrar el modal de editar al presionar el botón
  };

  const showModal = (sucursal) => {
    setSelectedSucursal(sucursal);
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setSelectedSucursal(null);
    setIsModalVisible(false);
  };

  const hideEditModal = () => {
    setSelectedSucursal(null);
    setIsEditModalVisible(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedSucursal) {
      try {
        await SucursalService.deleteSucursal(selectedSucursal.id, token);
        hideModal();
        onDeleteSuccess(); // Llamar a la función para recargar la lista de sucursales
      } catch (error) {
        console.error('Error deleting sucursal:', error);
      }
    }
  };

  return (
    <main className="p-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Dirección</th>
            <th className="py-2">Teléfono</th>
            <th className="py-2">Email</th>
            <th className="py-2">Horario de atención</th>
            <th className="py-2">Eliminar</th>
            <th className="py-2">Actualizar</th>
          </tr>
        </thead>
        <tbody>
          {sucursales.map((sucursal) => (
            <tr key={sucursal.id}>
              <td>{sucursal.nombre}</td>
              <td>{sucursal.direccion}</td>
              <td>{sucursal.telefono}</td>
              <td>{sucursal.email}</td>
              <td>{sucursal.horarioAtencion}</td>
              <td className='text-sm' style={{textAlign : 'center'}}>
                <button 
                  className="btnEliminar" 
                  type="button"
                  onClick={() => showModal(sucursal)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </button>
              </td>
              <td className='text-sm' style={{textAlign : 'center'}}>
                <button
                  className="btnActualizar"
                  type="button"
                  onClick={() => handleActualizar(sucursal)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalDelete
        isVisible={isModalVisible}
        onClose={hideModal}
        onConfirm={handleConfirmDelete}
      />

      <EditarSucursalModal
        isVisible={isEditModalVisible}
        onClose={hideEditModal}
        sucursal={selectedSucursal}
        onEditSuccess={onEditSuccess}
      />
    </main>
  );
};