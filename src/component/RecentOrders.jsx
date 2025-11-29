import React from "react";

export default function RecentOrders({ pedidos }) {
  return (
    <section id="pedidos" className="bg-white rounded-xl shadow p-6 border">
      <h3 className="text-lg font-semibold mb-4">Pedidos Recientes</h3>

      <table className="w-full text-left border-collapse">
        <thead className="text-sm text-gray-500 border-b">
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Cliente</th>
            <th className="py-2">Total</th>
            <th className="py-2">Estado</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {pedidos.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="py-3">{p.id}</td>
              <td className="py-3">{p.cliente}</td>
              <td className="py-3">${p.total.toLocaleString()}</td>
              <td className="py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    p.estado === "Completado"
                      ? "bg-green-100 text-green-700"
                      : p.estado === "Pendiente"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {p.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

