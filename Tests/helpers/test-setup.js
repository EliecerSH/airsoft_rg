// tests/helpers/test-setup.js
// Configuración global para las pruebas

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
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

// Mock de React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jasmine.createSpy('navigate'),
  useParams: () => ({}),
}));

// Mock de react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jasmine.createSpy(),
    error: jasmine.createSpy(),
    info: jasmine.createSpy(),
  }
}));