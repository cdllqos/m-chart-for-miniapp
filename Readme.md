# echarts for miniapp
基于百度echarts封装，参照[echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin)实现
## 优点：
1. 实现options响应式重绘canvas
## Tips：
* 官方未实现的功能，也不能实现
## 引入组件
拷贝项目目录中的m-chart文件夹至新项目或现有项目目录下，使用方式：
```
index.json
{
    "usingComponents": {"m-chart": "../m-chart/m-chart"}
}

index.wxml
<m-chart options="{{options}}"></m-chart>

index.js
Page({
  data: {
    options: {...}
  },
  onLoad: function () {
  }
})
```
