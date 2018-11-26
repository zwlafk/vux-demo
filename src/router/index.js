import Vue from 'vue'
import Router from 'vue-router'


// router modules
const requireComponent = require.context(
  './',
  true,
  // /^[^\.\/index]+\.js$/
  // /\.js$/
  // /^(?!\.\/index)+\.js$/
  /^(?!\.\/index).*\.js$/
)
// console.log(requireComponent.keys(), 'requireComponentrequireComponent')
Vue.use(Router)
let routeArray = []
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  // console.log(componentConfig)
  routeArray.push(...componentConfig.default)
})
// console.log(routeArray, 'routeArray')
export default new Router({
  routes: routeArray
})
