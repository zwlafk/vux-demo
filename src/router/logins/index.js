import loginsWrapper from '@/view/logins/loginsWrapper'
import login from '@/view/logins/login'
import homePage from '@/view/logins/homePage'
import messageCenter from '@/view/logins/messageCenter'

export default [
  {
    path: '/', component: loginsWrapper,
    children: [
      { path: '', name: 'login', component: login },
      {
        path: 'homePage', name: 'homePage', component: homePage, beforeEnter: (to, from, next) => {
          document.title = "主页"
          next()
        }
      },
      {
        path: 'messageCenter', name: 'messageCenter', component: messageCenter, beforeEnter: (to, from, next) => {
          document.title = "消息中心"
          next()
        }
      }
    ]
  },

]
