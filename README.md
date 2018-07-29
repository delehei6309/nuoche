# 挪车 WeChat APP

> A Vue.js project

## Build Setup

``` bash
# 全局安装webpack
cnpm install -g webpack

# 安装依赖
cnpm install

# 打包代码
webpack

# 开发过程中, 打包代码
cnpm run dev
```

访问 [localhost:8088](http://localhost:8088) 

# 代码规范

## 目录结构
* 如src/ 下所示

* 注意 containers 为展示组件，每个页面对应该目录下的一个vue文件，components 为公用组件，如Toast，Alert等
## 命名规则
* js，less文件用小写字母命名，单词之间以 - 分割，image文件实际上也应该如此
* Vue 文件首字母大写，多个单词组成时，所有首字母大写，比如 Toast，CicleProgress
* 函数，变量名使用驼峰命名规则  ,比如user ,getUser
* 样式的class 用小写字母命名，单词之间以 - 分割，比如.login ,.login-tab

## 样式书写规则

* 每个less文件由独立，唯一的class包裹，通常为该less的文件名，比如login.less如下
```less
.login {
    width: 100%;
    height: 100%;
    .other{
    ...
    }
}
```
这样可避免样式冲突，每个container组件对应一个less文件

* 使用变量，常用的字体颜色以及背景颜色变量存放于less/variables.less文件里，使用时只需引入该文件

* 使用rem，设计稿基于iphone6 ，less/rem.less以针对不同机型做了适配，
使用时将设计师标注的px数值除以20变算为rem数值，rem数值精确到0.05.
* 使用padding或者margin来控制边距，通常为0.8rem,比如
* 这样可以使.index占满宽度，并且边上由一定空隙
```less
.index {
    position:relative;
    padding:0.5rem 0.8rem;
}
```



##  服务端通信
*  使用fetch，api已经封装于tools/api.js 里

## 使用es6
* 使用es6语法
* 为保证兼容性，不可以使用es6新增的原型方法 ，比如 Array.prototype.filter ,String.prototype.startWith等
 因为要使用这些方法，必须引入 babel-polyfill ,然后这个文件巨大。
*  如有需要可使用lodash/core里等方法,链接[lodash/core](https://github.com/lodash/lodash/wiki/build-differences)
 

