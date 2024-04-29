const webpackConfig = require("./webpack.config.js");

module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-webpack");

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: {
      lib: ["lib"],
      test: ["lib", "test"],
    },
    babel: {
      options: {
        sourceMap: false,
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: "src/", // 源文件目录
            src: ["./*.js"], // 所有 js 文件
            dest: "lib/", // 输出目录
          },
        ],
      },
    },
    uglify: {
      options: {
        banner:
          '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: true,
      },
      build: {
        files: {
          "lib/awesomeExcel.min.js": ["lib/*.js"],
        },
      },
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ["lib/*"],
            dest: "test/src/",
          },
        ],
      },
    },
    webpack: {
      dev: webpackConfig,
    },
    "webpack-dev-server": {
      dev: webpackConfig,
    },
  });

  grunt.registerTask("default", ["clean:lib", "babel", "uglify"]);

  grunt.registerTask("dev", [
    "clean:test",
    "babel",
    "copy",
    "webpack",
    "webpack-dev-server",
  ]);
};
