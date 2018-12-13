import SignWrapper from '@/view/sign/SignWrapper'
import SignList from '@/view/sign/SignList'
import SignDetail from '@/view/sign/SignDetail'
import SignReplyForm from '@/view/sign/SignReplyForm'
import SignForm from '@/view/sign/SignForm'

export default [
  {
    path: '/sign', component: SignWrapper,
    children: [
      {
        path: '', name: 'SignList', component: SignList, beforeEnter: (to, from, next) => {
          document.title = "签到"
          next()
        }
      },
      { path: 'detail/:wsiId', name: 'SignDetail', component: SignDetail },
      {
        path: 'reply/:targetid', name: 'SignReplyForm', component: SignReplyForm, beforeEnter: (to, from, next) => {
          document.title = "回复"
          next()
        }
      },
      { path: 'signform', name: 'SignForm', component: SignForm }
    ]
  },

]
