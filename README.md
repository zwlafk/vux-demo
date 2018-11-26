
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 假设要开发模块xx
## view
创建目录：src/view/xx/xx.vue
部分已有代码在 src/components/source下

## api
创建目录：src/api/xx/index.js

依赖ajax包axios： https://github.com/axios/axios#axios-api
```javascript
import axios from 'axios'
export default {
  // ...
  fetchList(params){
    return axios.post('/res/cust/linkman/search/company',params)
  },

  saveItem(params){
    return axios.post('/res/cust/linkman/saveDetail',params)
  },

  fetchItem(params){
    return axios.post('/res/cust/linkman/detail',params)
  },
  // ...

}
```
使用时：在vue文件中某个生命周期或事件中调用
```javascript
import api from '@/api/xx'
//...
api.fetchList().then((res)=>{
  // 数据赋值操作
  this.data = res.data
  // ...
})
//...

```

## router
先写模块路由，创建文件目录：src/router/xx/index.js
```javascript
import xx from '@/view/xx/xx'
import yy from '@/view/xx/yy'

export default [
  { path: '/xx', name: 'xx', component: xx },
  { path: '/yy', name: 'yy', component: yy }
]
```

在主路由文件中合并模块路由
目录：src/router/index.js
```javascript
import xxRouter from './xx'
export default new Router({
  routes: [
    ...xxRouter,
  ]
})
```
## 数据mock
目录：src/main.js
```javascript
import './mock'// mock 不需要时注释掉
```


目录：src/mock/index.js
```javascript
import './xx'
import './xxxx'
```
在src/mock/xx.js下写具体数据
```javascript
import mock from '@/util/mockUtil'

mock.onPost('/res/cust/linkman/search/company').reply(200, {
  list: [
    { id: 1, name: 'John Smith' }
  ]
});


```



可以参考各文件夹下contact模块

# ngrok
```
ding.exe -config=.\ding.cfg -subdomain=qf 8080
```
