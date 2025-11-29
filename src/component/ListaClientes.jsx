import React, { useEffect, useState } from "react";
import { getClientes } from "../service/ClientesService";

export default function ListaClientes() {
    const [clientes, setClientes] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        getClientes().then(data => setClientes(data));
    }, []);

    // 🔍 Filtrar clientes por nombre, apellido o correo
    const clientesFiltrados = clientes.filter(cli =>
        `${cli.nombre} ${cli.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) ||
        cli.correo.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Título */}
            <h2 className="text-2xl font-bold text-neutral-800 mb-6 border-b pb-2">
                Clientes registrados
            </h2>

            {/* 🔍 Barra de búsqueda */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Buscar por nombre, apellido o correo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full p-3 rounded-xl border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Lista */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {clientesFiltrados.map(cli => (
                    <div
                        key={cli.id_Cliente}
                        className="p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all"
                    >
                        <h3 className="text-lg font-semibold text-neutral-800">
                            {cli.nombre} {cli.apellido}
                        </h3>

                        <p className="text-sm text-neutral-600 mt-1">
                            📩 {cli.correo}
                        </p>

                        <p className="text-sm text-neutral-500">
                            🆔 Cliente ID: {cli.id_Cliente}
                        </p>
                    </div>
                ))}
            </div>

            {/* Sin resultados */}
            {clientesFiltrados.length === 0 && (
                <p className="text-neutral-600 text-center mt-4">
                    No hay clientes que coincidan con la búsqueda.
                </p>
            )}
        </div>
    );
}


