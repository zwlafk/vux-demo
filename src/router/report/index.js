import day from '@/view/report/day'
import dayReport from '@/view/report/dayReport'
import dayExecution from '@/view/report/dayExecution'
import dayContractData from '@/view/report/dayContractData'
import daycallData from '@/view/report/daycallData'
import dayanalysis from '@/view/report/dayanalysis'
import daywidth from '@/view/report/daywidth'
import reportview from '@/view/report/reportview'

// shut F2 track
import F2 from '@antv/f2'
F2.track(false)


export default [
  {
    path: '/report', component: day,
    children: [
      { path: '', name: 'reportview', component: reportview , beforeEnter: (to, from, next) => {
        document.title = "经营报告"
        next()
      }
    },
      { path: 'dayContractData', name: 'dayContractData', component: dayContractData },
      { path: 'dayExecution', name: 'dayExecution', component: dayExecution },
      { path: 'daycallData', name: 'daycallData', component: daycallData },
      { path: 'dayanalysis', name: 'dayanalysis', component: dayanalysis },
      { path: 'daywidth', name: 'daywidth', component: daywidth },
    ]
  },

]
