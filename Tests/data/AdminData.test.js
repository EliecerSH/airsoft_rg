// tests/data/AdminData.test.js

describe('AdminData', () => {
  describe('Operaciones CRUD', () => {
    it('debe crear un nuevo producto', async () => {
      // Arrange
      const newProduct = createMockProduct({ name: 'Nuevo Producto' });
      mockFetchSuccess({ ...newProduct, id: 100 });
      
      // Act
      const response = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(newProduct)
      });
      const result = await response.json();
      
      // Assert
      expect(fetch).toHaveBeenCalledWith('/api/products', jasmine.any(Object));
      expect(result.name).toBe('Nuevo Producto');
      expect(result.id).toBe(100);
    });

    it('debe actualizar un producto existente', async () => {
      const updatedProduct = createMockProduct({ 
        id: 1, 
        name: 'Producto Actualizado',
        price: 149.99
      });
      
      mockFetchSuccess(updatedProduct);
      
      const response = await fetch('/api/products/1', {
        method: 'PUT',
        body: JSON.stringify(updatedProduct)
      });
      const result = await response.json();
      
      expect(result.name).toBe('Producto Actualizado');
      expect(result.price).toBe(149.99);
    });
  });
});