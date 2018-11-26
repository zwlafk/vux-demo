import day from '@/view/report/monthReport/day'
import monthReport from '@/view/report/monthReport/monthReport'
import monthExecution from '@/view/report/monthReport/monthExecution'
import monthContractData from '@/view/report/monthReport/monthContractData'
import monthcallData from '@/view/report/monthReport/monthcallData'
import monthtrendData from '@/view/report/monthReport/monthtrendData'
import monthtrendDataOrder from '@/view/report/monthReport/monthtrendDataOrder'
import monthTargetData from '@/view/report/monthReport/monthTargetData'
import monthwidth from '@/view/report/monthReport/monthwidth'
export default [
  {
    path: '/report/monthReport', component: day,
    children: [
      { path: '', name: 'monthReport', component: monthReport },
      { path: 'monthContractData', name: 'monthContractData', component: monthContractData },
      { path: 'monthExecution', name: 'monthExecution', component: monthExecution },
      { path: 'monthcallData', name: 'monthcallData', component: monthcallData },
      { path: 'monthtrendData', name: 'monthtrendData', component: monthtrendData },
      { path: 'monthtrendDataOrder', name: 'monthtrendDataOrder', component: monthtrendDataOrder },
      { path: 'monthwidth', name: 'monthwidth', component: monthwidth },
      { path: 'monthTargetData', name: 'monthTargetData', component: monthTargetData },
    ]
  },

]
