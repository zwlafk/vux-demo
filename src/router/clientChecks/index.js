import clientChecksWrapper from '@/view/clientChecks/clientChecksWrapper'
import clientCheck from '@/view/clientChecks/clientCheck'
import clientNearby from '@/view/clientChecks/clientNearby'

export default [
  {
    path: '/clientChecks', component: clientChecksWrapper,
    children: [
      { path: 'clientCheck', name: 'clientCheck', component: clientCheck , beforeEnter: (to, from, next) => {
          document.title = "撞单查询"
          next()
        }
    },
      { path: 'clientNearby', name: 'clientNearby', component: clientNearby , beforeEnter: (to, from, next) => {
        document.title = "附近客户"
        next()
      }},
    ]
  },

]
