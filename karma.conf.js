module.exports = function(config) {
    config.set({
        files: [
            'vendor/almond.js',
            'vendor/resolver.js',
            'vendor/jquery/jquery.js',
            'vendor/handlebars/handlebars.js',
            'vendor/ember/index.js',
            'vendor/ember-data/index.js',
            'vendor/firebase/index.js',
            'lib/ember-data-firebase.js',
            'tests/**/*.js'
        ],
        frameworks: ['qunit'],
        plugins: [
            'karma-qunit',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher'
        ],
        exclude: [],
        port: parseInt(process.env.PORT, 10) + 1 || 9876,
        runnerPort: 9100,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        captureTimeout: 60000,
        singleRun: false
    });
};
