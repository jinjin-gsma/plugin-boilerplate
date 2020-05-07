module.exports = function (config) {
  config.set({
    basePath: '',
    exclude: [],
    files: [
      { pattern: 'tests/*.js', watched: true, served: true, included: true }
    ],
 
    autoWatch: true,
    singleRun: false,
    failOnEmptyTestSuite: false,
    logLevel: config.LOG_WARN,
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    reporters: ['mocha', 'kjhtml'],
 
    listenAddress: '0.0.0.0',
    hostname: 'localhost',
    port: 9876,
    retryLimit: 0,
    browserDisconnectTimeout: 5000,
    browserNoActivityTimeout: 10000,
    captureTimeout: 60000,
 
    client: {
      captureConsole: true,
      clearContext: false,
      runInParent: false,
      useIframe: true,
      jasmine: {
        random: false
      }
    },
 
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/i,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    },
    preprocessors: {
      './tests/*.js': ['webpack']
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
 
    mochaReporter: {
      output: 'noFailures'
    }
  });
};