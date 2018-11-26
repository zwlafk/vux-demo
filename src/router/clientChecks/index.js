import clientChecksWrapper from '@/view/clientChecks/clientChecksWrapper'
import clientCheck from '@/view/clientChecks/clientCheck'
import clientNearby from '@/view/clientChecks/clientNearby'

export default [
  {
    path: '/clientChecks', component: clientChecksWrapper,
    children: [
      { path: 'clientCheck', name: 'clientCheck', component: clientCheck },
      { path: 'clientNearby', name: 'clientNearby', component: clientNearby },
    ]
  },

]
