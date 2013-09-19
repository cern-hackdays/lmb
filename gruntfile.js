var harp = require('harp')

module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    })
    

    grunt.registerTask('test', 'Run the unit tests.', function() {
        grunt.log.write('wtfjs')
    })

    grunt.registerTask('serve', 'Serve www with Harp.', function() {
        var done = this.async()
        var projectPath = path.join(__dirname, 'www')
        harp.server(projectPath, [], function cb() {
            grunt.log.write("\nHarp server is now running at http://localhost:9966\n\n")
        })        
    })
}
