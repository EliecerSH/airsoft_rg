// tests/test-setup.js
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
    addListener: jasmine.createSpy(),
    removeListener: jasmine.createSpy(),
    addEventListener: jasmine.createSpy(),
    removeEventListener: jasmine.createSpy(),
  })
});

// Mock de scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jasmine.createSpy()
});

// Variables globales para testing
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};