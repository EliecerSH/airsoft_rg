import React from "react";

export default function ComprasAdmin({ compras }) {
    
    // Función para formatear dinero
    const formatoDinero = (num) => {
        if (!num) return "$0";
        return num.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
            minimumFractionDigits: 0,
        });
    };

    // Total recaudado
    const totalRecaudado = compras.reduce((acc, c) => acc + (c.total || 0), 0);

    return (
        <div className="bg-gray-900 text-white shadow-lg rounded-2xl p-6 w-full">
            <h2 className="text-3xl font-bold mb-6">Historial de Compras</h2>

            {/* Tabla responsiva con scroll */}
            <div className="overflow-x-auto rounded-xl border border-gray-700">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-gray-800 text-gray-300">
                            <th className="p-3 border border-gray-700">ID</th>
                            <th className="p-3 border border-gray-700">Cliente</th>
                            <th className="p-3 border border-gray-700">Dirección</th>
                            <th className="p-3 border border-gray-700">Método Pago</th>
                            <th className="p-3 border border-gray-700">Método Envío</th>
                            <th className="p-3 border border-gray-700">Fecha</th>
                            <th className="p-3 border border-gray-700">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {compras.map((c) => (
                            <tr key={c.id_compra} className="hover:bg-gray-800 transition">
                                <td className="p-3 border border-gray-700">{c.id_compra}</td>
                                <td className="p-3 border border-gray-700">{c.id_cliente}</td>
                                <td className="p-3 border border-gray-700">{c.direccion_envio}</td>
                                <td className="p-3 border border-gray-700">{c.id_metodo_pago}</td>
                                <td className="p-3 border border-gray-700">{c.id_metodo_envio}</td>
                                <td className="p-3 border border-gray-700">{c.fecha_compra}</td>
                                <td className="p-3 border border-gray-700 font-bold text-green-400">
                                    {formatoDinero(c.total)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* TOTAL RECAUDADO */}
            <div className="mt-6 bg-green-900/40 border border-green-500 text-green-300 p-5 rounded-2xl text-2xl font-bold shadow">
                Total recaudado: <span className="text-green-400">{formatoDinero(totalRecaudado)}</span>
            </div>
        </div>
    );
}


