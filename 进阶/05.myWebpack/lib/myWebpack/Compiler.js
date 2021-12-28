const { getAst, getDeps, getCode } = require('./parser')
class Compiler {
  constructor(options = {}) {
    // webpack配置对象
    this.options = options;
    // 所有依赖容器
    this.modules = [] 
  }
  // 启动webpack打包
  run() {
    // 读取入口文件内容
    // 入口文件路径
    const filePath = this.options.entry;

    // 第一次构建，得到的入口文件信息
    const fileInfo = this.build(filePath);

    this.modules.push(fileInfo)
    // 遍历所有的依赖
    this.modules.forEach((fileInfo)=> {
      // {
      //   './add': '/Users/jianghui/my/webpack/进阶/05.myWebpack/src/add',
      //   './count': '/Users/jianghui/my/webpack/进阶/05.myWebpack/src/count'
      // }

      // 取出当前文件的所有依赖
      const deps = fileInfo.deps;
      for(const relativePath in deps) {
        // 依赖文件的绝对路径
        const absolutePath = deps[relativePath];
        // 对依赖文件进行处理
        const fileInfo = this.build(absolutePath);
        // 将处理后的结果添加到modules中， 后面就会继续遍历它了
        this.modules.push(fileInfo);
      }

    })

    console.log(this.modules)
  }

  build(filePath) {
    // 1. 将文件解析成ast
    const ast = getAst(filePath);
    // 2. 获取ast中所有的依赖
    const deps = getDeps(ast, filePath);
    // 3. 将ast解析成code
    const code = getCode(ast);
    console.log(code)
    console.log(deps)
    console.log(ast)
    return {
      // 文件路径
      filePath, 
      // 当前文件的所有依赖
      deps,
      // 当前文件解析后的代码
      code
    }
  }
}

module.exports = Compiler;