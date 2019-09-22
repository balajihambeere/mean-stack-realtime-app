module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        eslint: {
            target: ['*.js', './modules/**/*.js'],
            options: {
                configFile: './eslint.json'
            }
        }
    });

    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('default', ['eslint',]);
};