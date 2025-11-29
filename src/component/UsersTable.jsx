import React from "react";

export default function UsersTable({ usuarios }) {
  return (
    <section id="usuarios" className="bg-white rounded-xl shadow p-6 border">
      <h3 className="text-lg font-semibold mb-4">Usuarios Registrados</h3>

      <table className="w-full text-left border-collapse">
        <thead className="text-sm text-gray-500 border-b">
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Correo</th>
            <th className="py-2">RUN</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {usuarios.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="py-3">{u.nombre}</td>
              <td className="py-3">{u.correo}</td>
              <td className="py-3">{u.run}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

