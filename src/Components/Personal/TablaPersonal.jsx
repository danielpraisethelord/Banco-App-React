import React, { useState } from 'react';
import PersonalService from '../../service/PersonalService';
import PersonalSelectedModal from './PersonalSelectedModal';
import EjecutivoService from '../../service/EjecutivoService';
import CajeroService from '../../service/CajeroService';
import ClienteService from '../../service/ClienteService';
import { EditarClienteModal } from '../Cliente/EditarClienteModal';
import ModalDelete from '../Sucursales/ModalDelete';
import { EditarEjecutivoModal } from '../Ejecutivo/EditarEjecutivoModal';
import { EditarCajeroModal } from '../Cajero/EditarCajeroModal';

export const TablaPersonal = ({
  personal,
  token,
  onDeleteSuccess,
  onEditSuccess,
  userRole,
  vista
}) => {
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [isSelectedPersona, setIsSelectedPersona] = useState(false);
  const [isEditModalVisibleCliente, setIsEditModalVisibleCliente] = useState(false);
  const [isEditModalVisibleEjecutivo, setIsEditModalVisibleEjecutivo] = useState(false);
  const [isEditModalVisibleCajero, setIsEditModalVisibleCajero] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);

  const handleActualizarCliente = async (persona) => {
    try {
        console.log('Cliente seleccionado para actualizar:', persona);
        const cliente = await ClienteService.getById(persona.id, token);
        console.log('Cliente recibido del servicio:', cliente);
        setSelectedPersona(cliente);
        setIsEditModalVisibleCliente(true);
    } catch (error) {
        console.error('Error fetching cliente:', error);
    }
  };

  const handleActualizarEjecutivo = async (persona) => {
    try {
      console.log('Ejecutivo seleccionado para actualizar:', persona); 
      const ejecutivo = await EjecutivoService.getById(persona.id, token);
      console.log('Ejecutivo recibido del servicio:', ejecutivo);
      setSelectedPersona(ejecutivo);
      setIsEditModalVisibleEjecutivo(true); 
    } catch (error) {
      console.error('Error fetching ejecutivo:', error);
    }
  }

  const handleActualizarCajero = async (persona) => {
    try {
      console.log('Cajero seleccionado para actualizar:', persona);
      const cajero = await CajeroService.getById(persona.id, token);
      console.log('Cajero recibido del servicio:', cajero);
      setSelectedPersona(cajero);
      setIsEditModalVisibleCajero(true);
    } catch (error) {
      console.error('Error fetching cajero:', error);
    }
  }

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

  const handleDeleteEjecutivo = async () => {
    try {
      await EjecutivoService.deleteEjecutivo(clienteToDelete, token);
      onDeleteSuccess(); // Asegúrate de llamar a onDeleteSuccess aquí
      setIsDeleteModalVisible(false);
      setClienteToDelete(null);
    } catch (error) {
      console.error('Error deleting ejecutivo:', error);
    }
  }

  const handleDeleteCajero = async () => {
    try {
      await CajeroService.deleteCajero(clienteToDelete, token);
      onDeleteSuccess(); // Asegúrate de llamar a onDeleteSuccess aquí
      setIsDeleteModalVisible(false);
      setClienteToDelete(null);
    } catch (error) {
      console.error('Error deleting cajero:', error);
    }
  }

  const handleRowClick = async (id) => {
    try {
      if (userRole === 'ROLE_ADMIN') {
        const persona = await PersonalService.getById(id, token);
        setSelectedPersona(persona);
        setIsSelectedPersona(true);
      } 
      
      if (userRole === 'ROLE_GERENTE') {
        if (vista === 'Ejecutivo') {
          const persona = await EjecutivoService.getById(id, token);
          setSelectedPersona(persona);
          setIsSelectedPersona(true);
        } else if (vista === 'Cajero') {
          const persona = await CajeroService.getById(id, token);
          setSelectedPersona(persona);
          setIsSelectedPersona(true);
        } else if (vista === 'Cliente') {
          const persona = await ClienteService.getById(id, token);
          console.log(persona);
          setSelectedPersona(persona); 
          setIsSelectedPersona(true);
        }
      }

    } catch (error) {
      console.error("Error fetching persona data:", error);
    }
  };

  const handleCloseModal = () => {
    setIsEditModalVisibleCliente(false);
    setIsEditModalVisibleEjecutivo(false);
    setIsEditModalVisibleCajero(false);
    setSelectedPersona(null);
  };

  const handleOpenDeleteModal = (id) => {
    if (vista === 'Cliente') {
      setClienteToDelete(id);
    }
    if (vista === 'Ejecutivo') {
      setClienteToDelete(id);
    }
    if (vista === 'Cajero') {
      setClienteToDelete(id);
    }
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
            <th>Ver</th>
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
            <tr key={persona.id}>
              <td className='text-sm'>{`${persona.nombre} ${persona.apellidoPaterno} ${persona.apellidoMaterno}`}</td>
              <td className='text-sm'>{persona.fechaNacimiento}</td>
              <td className='text-sm'>{persona.telefono}</td>
              <td className='text-sm'>{persona.email}</td>
              <td className='text-sm'>{persona.rfc}</td>
              <td className='text-sm'>{persona.nivelDeEstudios}</td>
              {vista !== 'Cliente' && 
                <>
                  <td className='text-sm'>{persona.fechaContratacion}</td>
                  <td className='text-sm'>{persona.responsabilidades}</td>
                </>
              }
              <td 
                onClick={() => handleRowClick(persona.id)} 
                className="text-center"
                style={{cursor: 'pointer'}}
              >
                <i className="fa-solid fa-eye"></i>
              </td>
              {userRole === 'ROLE_GERENTE' && (
                <>
                  <td className='text-sm' style={{textAlign : 'center'}}>
                    <button
                    className="btnEliminar" 
                    type="button"
                    onClick={() => {
                      if (vista === 'Cliente') {
                        handleOpenDeleteModal(persona.id);
                      }
                      if (vista === 'Ejecutivo') {
                        handleOpenDeleteModal(persona.id);
                      }
                      if (vista === 'Cajero') {
                        handleOpenDeleteModal(persona.id);
                      }
                    }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                    </button>
                  </td>
                  <td className='text-sm' style={{textAlign : 'center'}}>
                    <button
                      className="btnActualizar"
                      type="button"
                      onClick={() =>  {
                        if (vista === 'Cliente') {
                          handleActualizarCliente(persona)
                        }
                        if (vista === 'Ejecutivo') {
                          handleActualizarEjecutivo(persona)
                        }
                        if (vista === 'Cajero') {
                          handleActualizarCajero(persona)
                        }
                      }
                      } 
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <PersonalSelectedModal isVisible={isSelectedPersona} persona={selectedPersona} onClose={handleCloseModal} vista={vista}/>
      <EditarClienteModal isVisible={isEditModalVisibleCliente} onClose={handleCloseModal} cliente={selectedPersona} onEditSuccess={onEditSuccess} token={token} />
      <EditarEjecutivoModal isVisible={isEditModalVisibleEjecutivo} onClose={handleCloseModal} ejecutivo={selectedPersona} onEditSuccess={onEditSuccess} token={token} />
      <EditarCajeroModal isVisible={isEditModalVisibleCajero} onClose={handleCloseModal} cajero={selectedPersona} onEditSuccess={onEditSuccess} token={token} />
      <ModalDelete 
        isVisible={isDeleteModalVisible} 
        onClose={handleCloseDeleteModal} 
        onConfirm={vista === 'Cliente' ? handleDeleteCliente : vista === 'Ejecutivo' ? handleDeleteEjecutivo : handleDeleteCajero}
      />
    </main>
  );
};