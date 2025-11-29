import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import ProductListAdmin from "../component/ProductListAdmin";
import ProductoModal from "../component/ProductoModal";
import ListaClientes from "../component/ListaClientes";
import ComprasAdmin from "../component/ComprasAdmin";

import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../service/productosService";

import { getCompras } from "../service/comprasService";

export default function AdminPage() {
  const [vistaActual, setVistaActual] = useState("productos");

  // Productos
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoEdit, setProductoEdit] = useState(null);

  // Compras
  const [compras, setCompras] = useState([]);

  async function cargarProductos() {
    const data = await obtenerProductos();
    setProductos(data);
  }

  async function cargarCompras() {
    const data = await getCompras();
    setCompras(data);
  }

  useEffect(() => {
    if (vistaActual === "productos") cargarProductos();
    if (vistaActual === "compras") cargarCompras();
  }, [vistaActual]);

  return (
    <div className="flex">
      <Sidebar onSelect={setVistaActual} />

      <main className="flex-1 bg-gray-50 p-8 min-h-screen">

        {vistaActual === "productos" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Gestión de Productos</h1>

              <button
                onClick={() => { setProductoEdit(null); setModalOpen(true); }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                + Nuevo Producto
              </button>
            </div>

            <ProductListAdmin
              productos={productos}
              onEditar={(p) => { setProductoEdit(p); setModalOpen(true); }}
              onEliminar={(id) => eliminarProducto(id).then(cargarProductos)}
            />

            {modalOpen && (
              <ProductoModal
                onClose={() => setModalOpen(false)}
                onSave={() => cargarProductos()}
                producto={productoEdit}
              />
            )}
          </>
        )}

        {vistaActual === "clientes" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Clientes Registrados</h1>
            <ListaClientes />
          </>
        )}

        {vistaActual === "compras" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Historial de Compras</h1>
            <ComprasAdmin compras={compras} />
          </>
        )}

      </main>
    </div>
  );
}







