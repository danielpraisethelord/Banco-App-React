import { useEffect, useState } from "react";
import SucursalService from '../../service/SucursalService';
import EjecutivoService from "../../service/EjecutivoService";

export const EditarEjecutivoModal = ({ isVisible, onClose, onEditSuccess, ejecutivo }) => {
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [rfc, setRfc] = useState('');
    const [discapacidad, setDiscapacidad] = useState(false);
    const [estadoCivil, setEstadoCivil] = useState('');
    const [nivelDeEstudios, setNivelDeEstudios] = useState('');
    const [fechaContratacion, setFechaContratacion] = useState('');
    const [turno, setTurno] = useState('');
    const [aniosDeExperiencia, setAniosDeExperiencia] = useState('');
    const [sucursalId, setSucursalId] = useState(ejecutivo?.sucursal?.id || "");
    const [responsabilidades, setResponsabilidades] = useState('');
    const [sueldo, setSueldo] = useState('');
    const [estiloDeClientesAsignados, setEstiloDeClientesAsignados] = useState('');
    const [objetivosDeVentas, setObjetivosDeVentas] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [sucursales, setSucursales] = useState([]);
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        if (ejecutivo) {
            console.log(ejecutivo);
            setNombre(ejecutivo.nombre);
            setApellidoPaterno(ejecutivo.apellidoPaterno);
            setApellidoMaterno(ejecutivo.apellidoMaterno);
            setFechaNacimiento(ejecutivo.fechaNacimiento);
            setGenero(ejecutivo.genero);
            setTelefono(ejecutivo.telefono);
            setEmail(ejecutivo.email);
            setDireccion(ejecutivo.direccion);
            setRfc(ejecutivo.rfc);
            setDiscapacidad(ejecutivo.discapacidad);
            setEstadoCivil(ejecutivo.estadoCivil);
            setNivelDeEstudios(ejecutivo.nivelDeEstudios);
            setFechaContratacion(ejecutivo.fechaContratacion);
            setTurno(ejecutivo.turno);
            setAniosDeExperiencia(ejecutivo.aniosDeExperiencia);
            setResponsabilidades(ejecutivo.responsabilidades);
            setSueldo(ejecutivo.sueldo);
            setEstiloDeClientesAsignados(ejecutivo.estiloDeClientesAsignados);
            setObjetivosDeVentas(ejecutivo.objetivosDeVentas);
            setDepartamento(ejecutivo.departamento);
            setSucursalId(ejecutivo.sucursal.id);
        }
    }, [ejecutivo]);
    
    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                const token = localStorage.getItem('token'); // Asegúrate de obtener el token si es necesario
                const response = await SucursalService.getSucursalesNombreId(token);
                setSucursales(response);
            } catch (error) {
                console.error('Error fetching sucursales:', error);
            }
        };
        
        fetchSucursales();
    }, []);

    const handleEditEjecutivo = async (e) => {
        e.preventDefault();
        try {
            const editEjecutivo = {
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
                estado : 'Activo',
                sucursal : {
                    id : sucursalId
                },
                responsabilidades,
                sueldo,
                estiloDeClientesAsignados,
                objetivosDeVentas,
                departamento,
            }
            console.log('Ejecutivo update:', editEjecutivo);
            await EjecutivoService.update(ejecutivo.id, editEjecutivo, token);
            alert('Ejecutivo editado exitosamente');
            setNombre('');
            setApellidoPaterno('');
            setApellidoMaterno('');
            setFechaNacimiento('');
            setGenero('');
            setTelefono('');
            setEmail('');
            setDireccion('');
            setRfc('');
            setDiscapacidad(false);
            setEstadoCivil('');
            setNivelDeEstudios('');
            setFechaContratacion('');
            setTurno('');
            setAniosDeExperiencia('');
            setSucursalId('');
            setResponsabilidades('');
            setSueldo('');
            setEstiloDeClientesAsignados('');
            setObjetivosDeVentas('');
            setDepartamento('');
            onEditSuccess();
            onClose();
        } catch (error) {
            console.error('Error editing ejecutivo:', error);
            alert('Error al editar al ejecutivo');
        }
    }
    
    
    if (!isVisible) return null;
    
    return (
        <>
            <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-2xl max-h-[80vh] bg-white rounded-lg shadow dark:bg-gray-700 overflow-y-auto custom-scrollbar">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Editar Ejecutivo
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
                        <form onSubmit={handleEditEjecutivo} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                htmlFor="nombre"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                Nombre
                                </label>
                                <input
                                type="text"
                                name="nombre"
                                id="nombre"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Nombre del ejecutivo"
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
                                name="apellidoPaterno"
                                id="apellidoPaterno"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Apellido paterno del ejecutivo"
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
                                name="apellidoMaterno"
                                id="apellidoMaterno"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Apellido materno del ejecutivo"
                                value={apellidoMaterno}
                                onChange={(e) => setApellidoMaterno(e.target.value)}
                                required
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                htmlFor="apellidoMaterno"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                Fecha de Nacimiento
                                </label>
                                <input
                                type="date"
                                name="fechaNacimiento"
                                id="fechaNacimiento"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Apellido materno del ejecutivo"
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
                                    name="genero"
                                    id="genero"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                    required
                                >
                                    <option value="" disabled hidden>Seleccione un género</option>
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
                                    name="telefono"
                                    id="telefono"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Teléfono del ejecutivo"
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9+#\- ]/g, '')}
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
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Email del ejecutivo"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <label
                                    htmlFor="direccion"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Dirección
                                </label>
                                <input
                                    type="text"
                                    name="direccion"
                                    id="direccion"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Dirección del ejecutivo"
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
                                    name="rfc"
                                    id="rfc"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="RFC del ejecutivo"
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
                                    name="discapacidad"
                                    id="discapacidad"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={discapacidad}
                                    onChange={(e) => setDiscapacidad(e.target.value === 'true')}
                                    required
                                >
                                    <option value="false">No</option>
                                    <option value="true">Sí</option>
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
                                    name="estadoCivil"
                                    id="estadoCivil"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Estado Civil del ejecutivo"
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
                                    name="nivelDeEstudios"
                                    id="nivelDeEstudios"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Nivel de Estudios del ejecutivo"
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
                                    Fecha de Contratacion
                                </label>
                                <input
                                    type="date"
                                    name="fechaContratacion"
                                    id="fechaContratacion"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Nivel de Estudios del ejecutivo"
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
                                    Seleccionar turno
                                </label>
                                <select
                                    name="turno"
                                    id="turno"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={turno}
                                    onChange={(e) => {
                                        setTurno(e.target.value);
                                    }}
                                    required
                                >
                                    <option value="" disabled hidden>Seleccione un turno</option>
                                    <option value="Matutino">Matutino</option>
                                    <option value="Vespertino">Vespertino</option>
                                    <option value="Completo">Completo</option>
                                </select>
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
                                    name="aniosDeExperiencia"
                                    id="aniosDeExperiencia"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Años de experiencia del ejecutivo"
                                    value={aniosDeExperiencia}
                                    onChange={(e) => setAniosDeExperiencia(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="sucursal"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Seleccionar Sucursal
                                </label>
                                <select
                                    name="sucursal"
                                    id="sucursal"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={sucursalId}
                                    onChange={(e) => {
                                        setSucursalId(e.target.value);
                                        console.log('Sucursal ID seleccionado:', e.target.value);
                                    }}
                                    required
                                >
                                    <option value="" disabled hidden>Seleccione una sucursal</option>
                                    {Object.entries(sucursales).map(([id, nombre]) => (
                                        <option key={id} value={id}>
                                            {nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-2">
                                <label
                                    htmlFor="responsabilidades"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Responsabilidades
                                </label>
                                <textarea
                                    name="responsabilidades"
                                    id="responsabilidades"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Responsabilidad del ejecutivo"
                                    value={responsabilidades}
                                    onChange={(e) => setResponsabilidades(e.target.value)}
                                    required
                                    rows="4"
                                ></textarea>
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
                                    name="sueldo"
                                    id="sueldo"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Sueldo del ejecutivo"
                                    value={sueldo}
                                    onChange={(e) => setSueldo(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="estiloDeClientesAsignados"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Estilo de Clientes Asignados
                                </label>
                                <select
                                    name="estiloDeClientesAsignados"
                                    id="estiloDeClientesAsignados"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={estiloDeClientesAsignados}
                                    onChange={(e) => setEstiloDeClientesAsignados(e.target.value)}
                                    required
                                >
                                    <option value="" disabled hidden>Seleccione un tipo de cliente</option>
                                    <option value="corporativo">Corporativo</option>
                                    <option value="individual">Individual</option>
                                    <option value="pyme">PYME</option>
                                    <option value="vip">VIP</option>
                                    <option value="internacional">Internacional</option>
                                </select>
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="objetivosDeVentas"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Objetivos de Ventas
                                </label>
                                <input
                                    type="text"
                                    name="objetivosDeVentas"
                                    id="objetivosDeVentas"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Objetivo de ventas del ejecutivo"
                                    value={objetivosDeVentas}
                                    onChange={(e) => setObjetivosDeVentas(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="departamento"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Departamento
                                </label>
                                <select
                                    name="departamento"
                                    id="departamento"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={departamento}
                                    onChange={(e) => setDepartamento(e.target.value)}
                                    required
                                >
                                    <option value="" disabled hidden>Seleccione un departamento</option>
                                    <option value="finanzas">Finanzas</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="ventas">Ventas</option>
                                    <option value="recursos-humanos">Recursos Humanos</option>
                                    <option value="tecnologia">Tecnología</option>
                                    <option value="atencion-al-cliente">Atención al Cliente</option>
                                </select>
                            </div>

                        </div>
                        <div className="flex justify-end">
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
            </div>
        </>
    );
}