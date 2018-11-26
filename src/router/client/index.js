import ClientWrapper from '@/view/client/ClientWrapper'
import ClientList from '@/view/client/ClientList'
import ClientPreview from '@/view/client/ClientPreview'
import ClientDetail from '@/view/client/ClientDetail'
import ClientForm from '@/view/client/ClientForm'
import ClientFollowList from '@/view/client/ClientFollowList'
import ClientFeedbackList from '@/view/client/ClientFeedbackList'
import ClientCommentList from '@/view/client/ClientCommentList'
import ClientCommentForm from '@/view/client/ClientCommentForm'
import ClientSoundList from '@/view/client/ClientSoundList'
import ClientFollowForm from '@/view/client/ClientFollowForm'
import ClientFollowDetail from '@/view/client/ClientFollowDetail'

export default [
  {
    path: '/client', component: ClientWrapper,
    children: [
      { path: '', name: 'ClientList', component: ClientList },
      { path: 'add', name: 'ClientAddForm', component: ClientForm },
      { path: ':custId', name: 'ClientPreview', component: ClientPreview, },
      { path: ':custId/detail', name: 'ClientDetail', component: ClientDetail },
      { path: ':custId/edit', name: 'ClientEditForm', component: ClientForm },
      { path: ':custId/follow', name: 'ClientFollowList', component: ClientFollowList },
      { path: ':custId/follow/:followId', name: 'ClientFollowDetail', component: ClientFollowDetail },
      { path: ':custId/followform', name: 'ClientFollowForm', component: ClientFollowForm },
      { path: ':custId/feedback', name: 'ClientFeedbackList', component: ClientFeedbackList },
      { path: ':custId/comment', name: 'ClientCommentList', component: ClientCommentList },
      { path: ':custId/commentform', name: 'ClientCommentForm', component: ClientCommentForm },
      { path: ':custId/soundlist', name: 'ClientSoundList', component: ClientSoundList },
    ]
  },

]
