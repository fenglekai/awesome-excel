const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./example/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "test"),
    filename: "index_bundle.js",
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "test"),
        publicPath: "/",
      },
    ],
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", //生成的html存放路径，相对于 path
      template: "example/index.html", //html模板路径
      inject: true, //允许插件修改哪些内容，包括head与body
      hash: true, //为静态资源生成hash值
      minify: {
        //压缩HTML文件
        removeComments: false, //移除HTML中的注释
        collapseWhitespace: false, //删除空白符与换行符
      },
    }),
  ],
};
