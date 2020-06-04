module.exports = function (config) {
	config.set({
		basePath: '',
		exclude: ['src/js/index.js'],
		files: [
			{ pattern: 'src/js/*.js', watched: true, served: true, included: true },
			{ pattern: 'tests/*.js', watched: true, served: true, included: true }
		],

		autoWatch: false,
		singleRun: true,
		failOnEmptyTestSuite: false,
		logLevel: config.LOG_WARN,
		frameworks: ['jasmine'],
		browsers: ['Chrome'],
		reporters: ['mocha', 'kjhtml', 'progress', 'coverage'],

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
			'src/js/*.js': ['webpack', 'coverage'],
			'tests/*.js': ['webpack']
		},
		webpackMiddleware: {
			noInfo: true,
			stats: 'errors-only'
		},

		mochaReporter: {
			output: 'noFailures'
		},

		colors: true,

		coverageReporter: {
				includeAllSources: true,
				dir: 'coverage/',
				reporters: [
						{ type: 'html', subdir: 'html' },
						{ type: 'text-summary' }
				]
		}
	});
};