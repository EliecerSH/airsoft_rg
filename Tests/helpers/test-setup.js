// tests/helpers/test-setup.js
// Configuración global para las pruebas

// Evitar redeclarar mocks si el archivo se carga más de una vez
if (!window.__TEST_SETUP_DONE__) {
  // Mock de localStorage
  const localStorageMock = (function() {
    let store = {};
    return {
      getItem: function(key) {
        return store[key] || null;
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      removeItem: function(key) {
        delete store[key];
      },
      clear: function() {
        store = {};
      }
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });

  // Mock de sessionStorage
  Object.defineProperty(window, 'sessionStorage', {
    value: localStorageMock
  });

// Mock de matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jasmine.createSpy().and.returnValue({
    matches: false,
    media: '',
    onchange: null,
    addListener: jasmine.createSpy(),
    removeListener: jasmine.createSpy(),
    addEventListener: jasmine.createSpy(),
    removeEventListener: jasmine.createSpy(),
    dispatchEvent: jasmine.createSpy(),
  })
});

// Mock de scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jasmine.createSpy()
});

// Mock de alert
Object.defineProperty(window, 'alert', {
  value: jasmine.createSpy()
});

// Mock de confirm
Object.defineProperty(window, 'confirm', {
  value: jasmine.createSpy()
});

// Variables globales para testing
  window.requestAnimationFrame = function(callback) {
    return setTimeout(callback, 0);
  };

// Mock de React Router (solo si Jest está disponible). En Karma/Jasmine se omite.
if (typeof jest !== 'undefined' && typeof jest.mock === 'function') {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jasmine.createSpy('navigate'),
    useParams: () => ({}),
  }));
}

  // Mock de react-toastify (solo si Jest está disponible). En Karma/Jasmine se omite.
  if (typeof jest !== 'undefined' && typeof jest.mock === 'function') {
    jest.mock('react-toastify', () => ({
      toast: {
        success: jasmine.createSpy(),
        error: jasmine.createSpy(),
        info: jasmine.createSpy(),
      }
    }));
  }

  // Helpers para tests: crear productos de prueba y mockear fetch
  function createMockProduct(overrides = {}) {
    const base = {
      id: null,
      name: 'Producto de Prueba',
      description: 'Descripción de prueba',
      price: 99.99,
      category: 'General',
      stock: 10,
      image: '',
    };
    return { ...base, ...overrides };
  }

  function mockFetchSuccess(responseObj) {
    // Define `fetch` como un spy de Jasmine que devuelve una respuesta con json()
    window.fetch = jasmine.createSpy('fetch').and.callFake((url, options) => {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(responseObj)
      });
    });
  }

  // Adjuntar al scope global del navegador para que los tests (Jasmine) los usen
  window.createMockProduct = createMockProduct;
  window.mockFetchSuccess = mockFetchSuccess;

  // Marcar que el setup ya se ejecutó para evitar redeclaraciones
  window.__TEST_SETUP_DONE__ = true;
}