import React, { useState } from 'react';
import PersonalService from '../../service/PersonalService';
import PersonalSelectedModal from './PersonalSelectedModal'; // Asegúrate de que la ruta sea correcta

export const TablaPersonal = ({
  personal,
  token,
  onDeleteSuccess,
  onEditSuccess,
}) => {
  const [selectedPersona, setSelectedPersona] = useState(null);

  const handleRowClick = async (id) => {
    try {
      const persona = await PersonalService.getById(id, token);
      setSelectedPersona(persona);
    } catch (error) {
      console.error("Error fetching persona data:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedPersona(null);
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
            <th className="py-2">Fecha de Contratacion</th>
            <th className="py-2">Responsabilidades</th>
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
              <td>{persona.fechaContratacion}</td>
              <td>{persona.responsabilidades}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PersonalSelectedModal persona={selectedPersona} onClose={handleCloseModal} />
    </main>
  );
};