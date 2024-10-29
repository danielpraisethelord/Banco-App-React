import React from 'react';

const PersonalSelectedModal = ({ persona, onClose }) => {
  if (!persona) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="relative p-3 w-11/12 max-w-lg max-h-[80vh] bg-white rounded-lg shadow dark:bg-gray-700 overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Detalles de {persona.nombre}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="p-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Fecha de Nacimiento:</strong> {persona.fechaNacimiento}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Género:</strong> {persona.genero}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Teléfono:</strong> {persona.telefono}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Email:</strong> {persona.email}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Dirección:</strong> {persona.direccion}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>RFC:</strong> {persona.rfc}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Discapacidad:</strong> {persona.discapacidad ? 'Sí' : 'No'}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Estado Civil:</strong> {persona.estadoCivil}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Nivel de Estudios:</strong> {persona.nivelDeEstudios}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Fecha de Contratación:</strong> {persona.fechaContratacion}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Turno:</strong> {persona.turno}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Años de Experiencia:</strong> {persona.aniosDeExperiencia}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Horas de Trabajo:</strong> {persona.horasDeTrabajo}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Estado:</strong> {persona.estado}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Sucursal ID:</strong> {persona.sucursal.id}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Responsabilidades:</strong> {persona.responsabilidades}
          </p>
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>Sueldo:</strong> {persona.sueldo}
          </p>
        </div>

        <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalSelectedModal;