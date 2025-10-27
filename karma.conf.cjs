// karma.conf.cjs
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    
    files: [
      'Tests/helpers/test-setup.js',
      'Tests/**/*.test.js',
      'Tests/**/*.spec.js'
    ],
    
    exclude: [
    ],
    
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
      clearContext: false 
    },
    
    jasmineHtmlReporter: {
      suppressAll: false, 
      suppressFailed: false 
    },
    
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity
  });
};