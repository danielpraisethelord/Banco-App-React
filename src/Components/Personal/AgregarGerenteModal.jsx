import React, { useState, useEffect } from "react";
import GerenteService from "../../service/GerenteService";
import SucursalService from "../../service/SucursalService";

const getCurrentDate = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().split("T")[0];
};

const AgregarGerenteModal = ({ isVisible, onClose, onAddSuccess, token }) => {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("Hombre");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [rfc, setRfc] = useState("");
  const [discapacidad, setDiscapacidad] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [nivelDeEstudios, setNivelDeEstudios] = useState("");
  const [fechaContratacion, setFechaContratacion] = useState(getCurrentDate());
  const [turno, setTurno] = useState("");
  const [aniosDeExperiencia, setAniosDeExperiencia] = useState("");
  const [horasDeTrabajo, setHorasDeTrabajo] = useState("");
  const [sucursalId, setSucursalId] = useState("");
  const [responsabilidades, setResponsabilidades] = useState("");
  const [sueldo, setSueldo] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [password, setPassword] = useState("");
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    fetchSucursalesSinGerente();
  }, []);

  const fetchSucursalesSinGerente = async () => {
    try {
      const data = await SucursalService.getSucursalesSinGerente(token);
      setSucursales(data);
      console.log("Sucursales fetched:", data);
    } catch (error) {
      console.error("Error fetching sucursales:", error);
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newGerente = {
        password,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento,
        genero,
        telefono,
        email,
        direccion,
        rfc,
        discapacidad,
        estadoCivil,
        nivelDeEstudios,
        fechaContratacion,
        turno,
        aniosDeExperiencia,
        horasDeTrabajo,
        sucursal: {
          id: sucursalId,
        },
        responsabilidades,
        sueldo,
        estado,
      };
      console.log("Gerente:", newGerente);
      await GerenteService.create(newGerente, token);
      alert("Gerente agregado con éxito");
      onClose(); // Cerrar el modal después de agregar el gerente
      onAddSuccess(); // Recargar la lista de gerentes
    } catch (error) {
      if (error.mensaje === "Ya existe un gerente para esta sucursal") {
        console.error("Ya existe un gerente para esta sucursal", error);
        alert("Ya existe un gerente para esta sucursal");
      } else {
        console.error("Error agregando el gerente:", error);
        alert("Hubo un error al agregar el gerente");
      }
      console.log("token:", token);
      console.error("Error agregando el gerente:", error.response.data.mensaje);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Agregar Gerente
        </h2>
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
        <form onSubmit={handleSubmit}>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="nombre"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="apellidoPaterno"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Apellido Paterno
              </label>
              <input
                type="text"
                id="apellidoPaterno"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={apellidoPaterno}
                onChange={(e) => setApellidoPaterno(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="apellidoMaterno"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Apellido Materno
              </label>
              <input
                type="text"
                id="apellidoMaterno"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={apellidoMaterno}
                onChange={(e) => setApellidoMaterno(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="fechaNacimiento"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                id="fechaNacimiento"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="genero"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Género
              </label>
              <select
                id="genero"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                required
              >
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="telefono"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="direccion"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="rfc"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                RFC
              </label>
              <input
                type="text"
                id="rfc"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={rfc}
                onChange={(e) => setRfc(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="discapacidad"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Discapacidad
              </label>
              <select
                id="discapacidad"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={discapacidad}
                onChange={(e) => setDiscapacidad(e.target.value)}
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="estadoCivil"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Estado Civil
              </label>
              <input
                type="text"
                id="estadoCivil"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={estadoCivil}
                onChange={(e) => setEstadoCivil(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="nivelDeEstudios"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nivel de Estudios
              </label>
              <input
                type="text"
                id="nivelDeEstudios"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={nivelDeEstudios}
                onChange={(e) => setNivelDeEstudios(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="fechaContratacion"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fecha de Contratación
              </label>
              <input
                type="date"
                id="fechaContratacion"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={fechaContratacion}
                onChange={(e) => setFechaContratacion(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="turno"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Turno
              </label>
              <input
                type="text"
                id="turno"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={turno}
                onChange={(e) => setTurno(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="aniosDeExperiencia"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Años de Experiencia
              </label>
              <input
                type="number"
                id="aniosDeExperiencia"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={aniosDeExperiencia}
                onChange={(e) => setAniosDeExperiencia(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="horasDeTrabajo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Horas de Trabajo
              </label>
              <input
                type="number"
                id="horasDeTrabajo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={horasDeTrabajo}
                onChange={(e) => setHorasDeTrabajo(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="sucursalId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sucursal</label>
              <select
                id="sucursalId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={sucursalId}
                onChange={(e) => setSucursalId(e.target.value)}
                required
              >
                <option value="">Seleccione una sucursal</option>
                {Object.entries(sucursales).map(([id, nombre]) => (
                  <option key={id} value={id}>{nombre}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="responsabilidades"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Responsabilidades
              </label>
              <input
                type="text"
                id="responsabilidades"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={responsabilidades}
                onChange={(e) => setResponsabilidades(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="sueldo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sueldo
              </label>
              <input
                type="number"
                id="sueldo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={sueldo}
                onChange={(e) => setSueldo(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="estado"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Estado
              </label>
              <select
                id="estado"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarGerenteModal;
