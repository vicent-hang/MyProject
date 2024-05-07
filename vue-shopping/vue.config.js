const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
//   目标:打包的命令 和 配置
// 说明:vue脚手架工具已经提供了打包命令，直接使用即可
// 命令:yarn build
// 结果:在项目的根目录会自动创建一个文件夹`dist，dist中的文件就是打包后的文件，
// 只需要放到服务器中即可。配置:默认情况下，需要放到服务器根目录打开，如果希望双击运行，需要配置publicPath 配成相对路径
  publicPath: './',
  transpileDependencies: true
})
