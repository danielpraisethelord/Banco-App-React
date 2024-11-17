import React, { useState } from "react";
import TarjetaService from "../../service/TarjetaService";

const TarjetaCardModal = ({ isVisible, onClose, onAddSuccess, cuentaId }) => {
  const [cvc, setCvc] = useState("");
  const [fechaExpiracion, setFechaExpiracion] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [limiteCredito, setLimiteCredito] = useState("");
  const [estado, setEstado] = useState("Activo");

  const token = localStorage.getItem("token");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("handleSubmit called"); // Verificar si la función se llama
        try {
            const newTarjeta = {
            tipo: "Crédito",
            cvc,
            fechaExpiracion,
            numeroTarjeta,
            limiteCredito,
            estado,
            cuenta: {
                id: cuentaId,
            },
            };

            console.log("newTarjeta:", newTarjeta); // Verificar los datos de la nueva tarjeta

            await TarjetaService.create(newTarjeta, token);
            alert("Tarjeta agregada con éxito");
            setCvc("");
            setFechaExpiracion("");
            setNumeroTarjeta("");
            setLimiteCredito("");
            setEstado("Activo");
            onClose(); // Cerrar el modal después de agregar la tarjeta
            onAddSuccess(); // Recargar la lista de tarjetas
        } catch (error) {
            console.error("Error agregando la tarjeta:", error);
            if (error.response && error.response.data) {
            const errorMessage = Object.values(error.response.data).join(", ");
            alert(`Hubo un error al agregar la tarjeta: ${errorMessage}`);
            } else {
            alert("Hubo un error al agregar la tarjeta: " + error);
            }
        }
    };

  if (!isVisible) return null;

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Agregar Tarjeta
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
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="cvc"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  CVC
                </label>
                <input
                  type="text"
                  name="cvc"
                  id="cvc"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="CVC"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  required
                  pattern="\d{3}"
                  maxLength="3"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="fechaExpiracion"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fecha de Expiración
                </label>
                <input
                  type="date"
                  name="fechaExpiracion"
                  id="fechaExpiracion"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={fechaExpiracion}
                  onChange={(e) => setFechaExpiracion(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="numeroTarjeta"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Número de Tarjeta
                </label>
                <input
                  type="text"
                  name="numeroTarjeta"
                  id="numeroTarjeta"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Número de tarjeta"
                  value={numeroTarjeta}
                  onChange={(e) => setNumeroTarjeta(e.target.value)}
                  required
                  pattern="\d{16}"
                  maxLength="16"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="limiteCredito"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Límite de Crédito
                </label>
                <input
                  type="number"
                  name="limiteCredito"
                  id="limiteCredito"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Límite de crédito"
                  value={limiteCredito}
                  onChange={(e) => setLimiteCredito(e.target.value)}
                  required
                  min="0.01"
                  step="0.01"
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
                  name="estado"
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
  );
};

export default TarjetaCardModal;