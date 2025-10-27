// karma.conf.cjs
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    
    files: [
      // Solo tus archivos de test - ajusta según tu estructura
      'tests/**/*.test.js',
      'tests/**/*.spec.js'
    ],
    
    exclude: [
      'node_modules/**/*'
    ],
    
    // SIN preprocessors por ahora
    preprocessors: {},
    
    reporters: ['progress', 'kjhtml'],
    browsers: ['Chrome'],
    
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter'
    ],
    
    client: {
      jasmine: {
        random: false,
        stopOnFailure: false,
        timeoutInterval: 10000
      },
      clearContext: false // Mantiene los resultados visibles
    },
    
    jasmineHtmlReporter: {
      suppressAll: false, // MUESTRA todos los resultados
      suppressFailed: false // MUESTRA los tests fallidos
    },
    
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity
  });
};