// tests/Carrito.test.js
describe('Carrito - Lógica de Negocio', () => {
  
  it('debe manejar carrito vacío', () => {
    const carrito = [];
    expect(carrito.length).toBe(0);
  });

  it('debe agregar productos al carrito', () => {
    const carrito = [];
    const producto = { id: 1, nombre: "M4A1", precio: 150000 };
    
    carrito.push({ ...producto, cantidad: 1 });
    
    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe("M4A1");
  });

  it('debe calcular subtotal correctamente', () => {
    const carrito = [
      { precio: 150000, cantidad: 2 },
      { precio: 60000, cantidad: 1 }
    ];
    
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    expect(subtotal).toBe(360000);
  });
});