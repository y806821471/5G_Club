module.exports = {
  devServer: {
    // host: 'localhost',
    port: 8080,     // 端口
    open: true,
    disableHostCheck: true, // 禁用webpack热重载检查 解决热更新失效问题

  },
  // lintOnSave: false,  // 取消 eslint 验证
  publicPath: './', // 修改webpack的outPath.publicPath
  transpileDependencies: ['webpack-dev-server/client'],
  chainWebpack: config => {
    config.entry.app = ['babel-polyfill', './src/main.js'];
    config.resolve.symlinks(true) // 修复热更新失效
  },

};