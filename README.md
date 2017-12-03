# react-babylon
一个完整的 React + React-Redux + React-Router 4 + webpack 2 Demo.

### 使用步骤:
1. clone 该工程到相应的文件夹下,然后 cd react-babylon,切换到该工程的根目录,执行 npm install,安装相应的依赖包.
2. 开发环境中,直接在命令行中执行 npm run dev,就可以启动一个本地服务,然后就可以愉快的开发了.
3. 关于生产环境中的构建和代码打包步骤:
    >* 执行 npm run dll**: 将第三方包/模块单独打包压缩成一个 chunk.
    >* 执行 npm run build**: 将业务代码单独打包,压缩成另一个 chunk.
