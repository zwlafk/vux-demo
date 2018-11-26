import day from '@/view/report/weekReport/day'
import weekReport from '@/view/report/weekReport/weekReport'
import weekExecution from '@/view/report/weekReport/weekExecution'
import weekContractData from '@/view/report/weekReport/weekContractData'
import weekcallData from '@/view/report/weekReport/weekcallData'
import weektrendData from '@/view/report/weekReport/weektrendData'
import weektrendDataOrder from '@/view/report/weekReport/weektrendDataOrder'
import weekwidth from '@/view/report/weekReport/weekwidth'
export default [
  {
    path: '/report/weekReport', component: day,
    children: [
      { path: '', name: 'weekReport', component: weekReport },
      { path: 'weekContractData', name: 'weekContractData', component: weekContractData },
      { path: 'weekExecution', name: 'weekExecution', component: weekExecution },
      { path: 'weekcallData', name: 'weekcallData', component: weekcallData },
      { path: 'weektrendData', name: 'weektrendData', component: weektrendData },
      { path: 'weektrendDataOrder', name: 'weektrendDataOrder', component: weektrendDataOrder },
      { path: 'weekwidth', name: 'weekwidth', component: weekwidth },
    ]
  },

]
