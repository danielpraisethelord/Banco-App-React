import React, { useState, useEffect } from 'react';
import SucursalService from '../../service/SucursalService';
import './AgregarClienteModal.css';
import ClienteService from '../../service/ClienteService';

export const AgregarClienteModal = ({ isVisible, onClose, onAddSuccess }) => {
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
    const [sucursalId, setSucursalId] = useState('');
    const token = localStorage.getItem('token');
    const [sucursales, setSucursales] = useState({});

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                const response = await SucursalService.getSucursalesNombreId(token);
                setSucursales(response);
            } catch (error) {
                console.error('Error fetching sucursales:', error);
            }
        };

        fetchSucursales();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newCliente = {
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
                sucursal : {
                    id: sucursalId
                }
            }
            console.log(newCliente);
            await ClienteService.create(newCliente, token);
            alert('Cliente agregado correctamente');
            setPassword('');
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
            setSucursalId('');
            onAddSuccess();
            onClose();
        } catch (error) {
            console.error('Error adding cliente:', error);
            alert('Error al agregar cliente');
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
                            Agregar Cliente
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
                        <form onSubmit={handleSubmit} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                Password
                                </label>
                                <input
                                type="password"
                                name="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Contraseña del Cliente"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />
                            </div>
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
                                placeholder="Nombre del cliente"
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
                                placeholder="Apellido paterno del cliente"
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
                                placeholder="Apellido materno del cliente"
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
                                placeholder="Apellido materno del cliente"
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
                                    placeholder="Teléfono del cliente"
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
                                    placeholder="Email del cliente"
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
                                    placeholder="Dirección del cliente"
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
                                    placeholder="RFC del cliente"
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
                                    placeholder="Estado Civil del cliente"
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
                                    placeholder="Nivel de Estudios del cliente"
                                    value={nivelDeEstudios}
                                    onChange={(e) => setNivelDeEstudios(e.target.value)}
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
                                        console.log('Sucursal ID seleccionado:', e.target.value); // Verifica el valor seleccionado
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