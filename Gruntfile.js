module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            options: {
                configFile: 'karma.conf.js',
                browsers: ['Chrome'],
                reporters: ['dots']
            },
            test: {
                singleRun: true
            },
            browsers: {
                singleRun: true,
                browsers: [
                    'Chrome',
                    'Firefox',
                    'PhantomJS'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('default', ['karma:test']);

};