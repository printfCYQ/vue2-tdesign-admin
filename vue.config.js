//配置路径别名
module.exports = {
  publicPath: "./",
  //声明配置webpack
  configureWebpack: {
    resolve: {
      //配置路径别名
      alias: {
        api: "@/api",
        assets: "@/assets",
        components: "@/components",
        views: "@/views",
      },
    },
  },
};
