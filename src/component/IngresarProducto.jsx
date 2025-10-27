import React, { useState, useEffect } from "react";
import { productos } from "../data/Productos";

export default function IngresarProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [tipo, setTipo] = useState("rifle");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [listaProductos, setListaProductos] = useState([]);

  // Cargar productos de localStorage al iniciar
  useEffect(() => {
    const almacen = JSON.parse(localStorage.getItem("productos")) || productos;
    setListaProductos(almacen);
  }, []);

  // Guardar productos en localStorage cuando cambie la lista
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(listaProductos));
  }, [listaProductos]);

  const agregarProducto = (e) => {
    e.preventDefault();
    if (!nombre || !precio || !tipo) return alert("Complete todos los campos");

    const nuevoProducto = {
      id: listaProductos.length + 1,
      nombre,
      precio: parseInt(precio),
      tipo,
      desc,
      img: img || "https://via.placeholder.com/150", // si no hay imagen
      cantidad: 1,
    };

    setListaProductos([...listaProductos, nuevoProducto]);

    // Limpiar formulario
    setNombre("");
    setPrecio("");
    setTipo("rifle");
    setDesc("");
    setImg("");
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Ingresar Nuevo Producto</h2>
      <form onSubmit={agregarProducto} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="rifle">Rifle</option>
          <option value="pistola">Pistola</option>
          <option value="subfusil">Subfusil</option>
          <option value="lmg">LMG</option>
          <option value="sniper">Sniper</option>
          <option value="escopeta">Escopeta</option>
        </select>
        <input
          type="text"
          placeholder="Descripción"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar Producto
        </button>
      </form>

      {/* Lista de productos */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Productos actuales</h3>
        <ul className="space-y-2">
          {listaProductos.map((p) => (
            <li key={p.id} className="border p-2 rounded flex justify-between">
              <span>{p.nombre}</span>
              <span>${p.precio}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
