module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    script:'json2java',
    banner:'/*!\n * <%= script %>.js\n'+
           ' * Author:<%= pkg.author %>\n'+
           ' * Summary:<%= pkg.description %>\n'+
           ' * License:<%= pkg.license %>\n'+
           ' * Version: <%= pkg.version %>\n'+
           ' *\n * URL:\n * <%= pkg.homepage %>\n'+
           ' * <%= pkg.homepage %>/blob/master/LICENSE\n *\n */\n',
    uglify: {
      options: {
        banner: '<%= banner %>',
          compress: {
          drop_console: true
        }
      },
      clean:{
        options: {
          beautify: {
            width: 50,
            beautify: true
          },
          mangle: {
            except: ['json2java']
          }
      },
        src: '<%= script %>.origin.js',
        dest: '<%= script %>.js',
      },
      compress: {
        src: '<%= script %>.js',
        dest: '<%= script %>.min.js'
      }
    }
  });

 
  grunt.loadNpmTasks('grunt-contrib-uglify');
 

  grunt.registerTask('build',['uglify:clean','uglify:compress']);
  function writeOut(cls,content){
  grunt.file.write('out/'+cls+'.java', content,{encoding:'utf8'});
  }
  grunt.registerTask('test','test',function(){

    var JSON2Java = require('./json2java.js'),
    data = grunt.file.readJSON('sample.json'),
    parser = new JSON2Java('AuthorProfile',{'ONLY_GETTER':false,'LESS_GETTER':false,'callback':writeOut});
    parser.parse(data);

  });

};