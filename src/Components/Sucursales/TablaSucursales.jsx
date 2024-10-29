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
              <td>
                <button 
                  className="btnEliminar" 
                  type="button"
                  onClick={() => showModal(sucursal)}
                >
                  Eliminar
                </button>
              </td>
              <td>
                <button
                  className="btnActualizar"
                  type="button"
                  onClick={() => handleActualizar(sucursal)}
                >
                  Actualizar
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