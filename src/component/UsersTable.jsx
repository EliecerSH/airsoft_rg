import React from "react";

export default function UsersTable({ usuarios }) {
  return (
    <div id="usuarios" className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-semibold mb-4">Usuarios Registrados</h3>
      <table className="w-full text-left">
        <thead className="text-sm text-gray-500 border-b">
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Correo</th>
            <th className="py-2">RUN</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {usuarios.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="py-3">{u.nombre}</td>
              <td className="py-3">{u.correo}</td>
              <td className="py-3">{u.run}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
