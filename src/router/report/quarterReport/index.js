import day from '@/view/report/quarterReport/day'
import quarterReport from '@/view/report/quarterReport/quarterReport'
import quarterExecution from '@/view/report/quarterReport/quarterExecution'
import quarterContractData from '@/view/report/quarterReport/quarterContractData'
import quartercallData from '@/view/report/quarterReport/quartercallData'
import quartertrendData from '@/view/report/quarterReport/quartertrendData'
import quarterTargetData from '@/view/report/quarterReport/quarterTargetData'
import quarterwidth from '@/view/report/quarterReport/quarterwidth'
export default [
  {
    path: '/report/quarterReport', component: day,
    children: [
      { path: '', name: 'quarterReport', component: quarterReport },
      { path: 'quarterContractData', name: 'quarterContractData', component: quarterContractData },
      { path: 'quarterExecution', name: 'quarterExecution', component: quarterExecution },
      { path: 'quartercallData', name: 'quartercallData', component: quartercallData },
      { path: 'quartertrendData', name: 'quartertrendData', component: quartertrendData },
      { path: 'quarterwidth', name: 'quarterwidth', component: quarterwidth },
      { path: 'quarterTargetData', name: 'quarterTargetData', component: quarterTargetData },
    ]
  },

]
