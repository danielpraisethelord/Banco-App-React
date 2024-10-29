import React, { useState } from 'react';
import SucursalService from '../../service/SucursalService';

const EditarSucursalModal = ({ isVisible, onClose, sucursal, onEditSuccess }) => {
 
  if (!sucursal) return null;
  const [nombre, setNombre] = useState(sucursal.nombre);
  const [direccion, setDireccion] = useState(sucursal.direccion);
  const [horarioAtencion, setHorarioAtencion] = useState(sucursal.horarioAtencion);
  const [telefono, setTelefono] = useState(sucursal.telefono);
  const [email, setEmail] = useState(sucursal.email);

  const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Editando sucursal:', sucursal);
      const updatedSucursal = { nombre, direccion, horarioAtencion, telefono, email };
      await SucursalService.update(sucursal.id, updatedSucursal, token);
      alert('Sucursal actualizada con éxito');
      onClose(); // Cerrar el modal después de actualizar la sucursal
      onEditSuccess(); // Recargar la lista de sucursales
    } catch (error) {
      console.error('Error actualizando la sucursal:', error);
      alert('Hubo un error al actualizar la sucursal');
    }
  };

  if (!isVisible) return null;

  return (
    <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Editar Sucursal
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nombre de la sucursal"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  id="direccion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Dirección de la sucursal"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="horarioAtencion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Horario de Atención</label>
                <input
                  type="text"
                  name="horarioAtencion"
                  id="horarioAtencion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Horario de atención de la sucursal"
                  value={horarioAtencion}
                  onChange={(e) => setHorarioAtencion(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  id="telefono"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Teléfono de la sucursal"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Email de la sucursal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarSucursalModal;