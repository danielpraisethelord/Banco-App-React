import React, { useState } from 'react';
import PersonalService from '../../service/PersonalService';
import PersonalSelectedModal from './PersonalSelectedModal';
import EjecutivoService from '../../service/EjecutivoService';
import CajeroService from '../../service/CajeroService';
import ClienteService from '../../service/ClienteService';
import { EditarClienteModal } from '../Cliente/EditarClienteModal';
import ModalDelete from '../Sucursales/ModalDelete';

export const TablaPersonal = ({
  personal,
  token,
  onDeleteSuccess,
  onEditSuccess,
  userRole,
  vista
}) => {
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);

  const handleActualizarCliente = async (persona) => {
    try {
        console.log('Persona seleccionada para actualizar:', persona);
        const cliente = await ClienteService.getById(persona.id, token);
        console.log('Cliente recibido del servicio:', cliente);
        setSelectedPersona(cliente);
        setIsEditModalVisible(true);
    } catch (error) {
        console.error('Error fetching cliente:', error);
    }
  };

  const handleDeleteCliente = async () => {
    try {
      await ClienteService.deleteCliente(clienteToDelete, token);
      onDeleteSuccess(); // Asegúrate de llamar a onDeleteSuccess aquí
      setIsDeleteModalVisible(false);
      setClienteToDelete(null);
    } catch (error) {
      console.error('Error deleting cliente:', error);
    }
  }

  const handleRowClick = async (id) => {
    try {
      if (userRole === 'ROLE_ADMIN') {
        const persona = await PersonalService.getById(id, token);
        setSelectedPersona(persona);
      } 

      if (userRole === 'ROLE_GERENTE') {
        if (vista === 'Ejecutivo') {
          const persona = await EjecutivoService.getById(id, token);
          setSelectedPersona(persona);
        } else if (vista === 'Cajero') {
          const persona = await CajeroService.getById(id, token);
          setSelectedPersona(persona);
        } else if (vista === 'Cliente') {
          const persona = await ClienteService.getById(id, token);
          console.log(persona);
          setSelectedPersona(persona); 
        }
      }

    } catch (error) {
      console.error("Error fetching persona data:", error);
    }
  };

  const handleCloseModal = () => {
    setIsEditModalVisible(false);
    setSelectedPersona(null);
  };

  const handleOpenDeleteModal = (id) => {
    setClienteToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setClienteToDelete(null);
  };

  return (
    <main className="p-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Fecha de Nacimiento</th>
            <th className="py-2">Telefono</th>
            <th className="py-2">Email</th>
            <th className="py-2">RFC</th>
            <th className="py-2">Nivel de Estudios</th>
            {vista !== 'Cliente' &&
              <>
                <th className="py-2">Fecha de Contratacion</th>
                <th className="py-2">Responsabilidades</th>
              </>
            }
            {userRole === 'ROLE_GERENTE' && (
              <>
                <th className="py-2">Eliminar</th>
                <th className="py-2">Actualizar</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {personal.map((persona) => (
            <tr key={persona.id} onClick={() => handleRowClick(persona.id)} className="cursor-pointer">
              <td>{`${persona.nombre} ${persona.apellidoPaterno} ${persona.apellidoMaterno}`}</td>
              <td>{persona.fechaNacimiento}</td>
              <td>{persona.telefono}</td>
              <td>{persona.email}</td>
              <td>{persona.rfc}</td>
              <td>{persona.nivelDeEstudios}</td>
              {vista !== 'Cliente' && 
                <>
                  <td>{persona.fechaContratacion}</td>
                  <td>{persona.responsabilidades}</td>
                </>
              }
              {userRole === 'ROLE_GERENTE' && (
                <>
                  <td>
                    <button 
                    className="btnEliminar" 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (vista === 'Cliente') {
                        handleOpenDeleteModal(persona.id);
                      }
                    }} 
                    >
                      Eliminar
                    </button>
                  </td>
                  <td>
                    <button
                      className="btnActualizar"
                      type="button"
                      onClick={(e) =>  {
                        e.stopPropagation();
                        if (vista === 'Cliente') {
                          handleActualizarCliente(persona)
                        }
                      }
                      } 
                    >
                      Actualizar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <PersonalSelectedModal persona={selectedPersona} onClose={handleCloseModal} vista={vista}/>
      <EditarClienteModal isVisible={isEditModalVisible} onClose={handleCloseModal} cliente={selectedPersona} onEditSuccess={onEditSuccess} token={token} />
      <ModalDelete 
        isVisible={isDeleteModalVisible} 
        onClose={handleCloseDeleteModal} 
        onConfirm={handleDeleteCliente} 
      />
    </main>
  );
};