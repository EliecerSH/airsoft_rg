// karma.conf.js
module.exports = function(config) {
  config.set({
    // Frameworks base
    frameworks: ['jasmine'],
    
    // Archivos a incluir
    files: [
      'tests/**/*.test.js'
    ],
    
    // Excluir archivos
    exclude: [],
    
    // Preprocesadores
    preprocessors: {
      'tests/**/*.test.js': ['webpack', 'sourcemap']
    },
    
    // Reporters
    reporters: ['progress', 'kjhtml'],
    
    // Navegadores
    browsers: ['Chrome'],
    
    // Configuración de Chrome
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: ['--headless', '--disable-gpu', '--remote-debugging-port=9222']
      }
    },
    
    // Configuración de Webpack
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react', '@babel/preset-env']
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            use: {
              loader: 'url-loader'
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },
    
    // Webpack middleware
    webpackMiddleware: {
      stats: 'errors-only'
    },
    
    // Configuración específica de Jasmine
    client: {
      jasmine: {
        random: false,
        stopOnFailure: false,
        timeoutInterval: 10000
      },
      clearContext: false // Para el reporter HTML
    },
    
    // Puertos y configuración general
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity
  });
};