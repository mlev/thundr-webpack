var webpackConfig = require('./webpack.config')();
webpackConfig.entry = {};

module.exports = function (config) {
    config.set({

        frameworks: ['jasmine'],

        files: [
            'src/test/typescript/testIndex.ts'
        ],

        preprocessors: {
            'src/test/typescript/testIndex.ts': ['webpack']
        },

        autoWatch: true,

        browsers: ['PhantomJS'],

        logLevel: config.LOG_INFO,

        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-webpack'
        ],

        webpack: webpackConfig,
        webpackMiddleware: {noInfo: true}
    });
};