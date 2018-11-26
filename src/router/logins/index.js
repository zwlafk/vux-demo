import loginsWrapper from '@/view/logins/loginsWrapper'
import login from '@/view/logins/login'
import homePage from '@/view/logins/homePage'
import messageCenter from '@/view/logins/messageCenter'

export default [
  {
    path: '/', component: loginsWrapper,
    children: [
      { path: '', name: 'login', component: login },
      { path: 'homepage', name: 'homePage', component: homePage },
      { path: 'messageCenter', name: 'messageCenter', component: messageCenter }
    ]
  },

]
