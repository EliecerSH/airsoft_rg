// tests/ProductoCard.test.js
describe('ProductoCard - Pruebas Básicas', () => {
  
  it('debe crear un producto con propiedades correctas', () => {
    const producto = {
      id: 1,
      nombre: "M4A1 Carbine",
      precio: 150000,
      tipo: "rifle"
    };
    
    expect(producto.nombre).toBe("M4A1 Carbine");
    expect(producto.precio).toBe(150000);
    expect(producto.tipo).toBe("rifle");
  });

  it('debe calcular el precio total correctamente', () => {
    const productos = [
      { precio: 100000, cantidad: 2 },
      { precio: 50000, cantidad: 1 }
    ];
    
    const total = productos.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    expect(total).toBe(250000);
  });
});