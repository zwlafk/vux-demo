import SignWrapper from '@/view/sign/SignWrapper'
import SignList from '@/view/sign/SignList'
import SignDetail from '@/view/sign/SignDetail'
import SignReplyForm from '@/view/sign/SignReplyForm'
import SignForm from '@/view/sign/SignForm'

export default [
  {
    path: '/sign', component: SignWrapper,
    children: [
      { path: '', name: 'SignList', component: SignList },
      { path: 'detail/:targetid', name: 'SignDetail', component: SignDetail },
      { path: 'reply/:targetid', name: 'SignReplyForm', component: SignReplyForm },
      { path: 'signform', name: 'SignForm', component: SignForm }
    ]
  },

]
