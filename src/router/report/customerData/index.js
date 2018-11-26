import day from '@/view/report/customerData/day'
import dataReport from '@/view/report/customerData/dataReport'
// import dataAnalysis from '@/view/customerData/dataAnalysis'
import dataGuestDepartment from '@/view/report/customerData/dataGuestDepartment'
import dataProductSalesD from '@/view/report/customerData/dataProductSalesD'
import dataCustomerAttribute from '@/view/report/customerData/dataCustomerAttribute'
import dataCustomerType from '@/view/report/customerData/dataCustomerType'

// import leaderboard from '@/view/report/leaderboard'
export default [
  {
    path: '/report/customerData', component: day,
    children: [
      { path: '', name: 'dataReport', component: dataReport },
      // { path: 'dataAnalysis', name: 'dataAnalysis', component: dataAnalysis },
      { path: 'dataGuestDepartment', name: 'dataGuestDepartment', component: dataGuestDepartment },
      { path: 'dataProductSalesD', name: 'dataProductSalesD', component: dataProductSalesD },
      { path: 'dataCustomerAttribute', name: 'dataCustomerAttribute', component: dataCustomerAttribute },
      { path: 'dataCustomerType', name: 'dataCustomerType', component: dataCustomerType },
    ]
  },

]
