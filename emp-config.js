const withVue2 = require('@efox/emp-vue2')
const path = require('path')
const ProjectRootPath = path.resolve('./')
const { getConfig } = require(path.join(ProjectRootPath, './src/config'))
module.exports = withVue2(({ config, env, empEnv }) => {
  const confEnv = env === 'production' ? 'prod' : 'dev'
  const conf = getConfig(empEnv || confEnv)
  const port = conf.port
  const projectName = 'vue2Project'
  const publicPath = conf.publicPath
  const remoteEntry = 'http://localhost:8009/emp.js'
  // 设置项目URL
  config.output.publicPath(publicPath)
  // 设置项目端口
  config.devServer.port(port)
  config.plugin('mf').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        // 项目名称
        name: projectName,
        // 暴露项目的全局变量名
        library: { type: 'var', name: projectName },
        // 被远程引入的文件名
        filename: 'emp.js',
        remotes: {
          // 远程项目别名:远程引入的项目名
          '@emp/vue2Base': 'vue2Base',
        },
        // 需要暴露的东西
        exposes: {
          // 别名:组件的路径
          './Content.vue': './src/components/Content',
        },
        // 需要共享的依赖
        shared: ['vue/dist/vue.esm.js'],
      },
    }
    return args
  })

  // 配置 index.html
  config.plugin('html').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        // head 的 title
        title: 'EMP Vue2 Components',
        // 远程调用项目的文件链接
        files: {
          js: [remoteEntry]
        },
      },
    }
    return args
  })
})