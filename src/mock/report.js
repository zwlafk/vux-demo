import mock from '@/util/mockUtil'

// arguments for reply are (status, data, headers)
mock.onGet('/report/business/count').reply(200, {
  'info':  {
    'signNum':'dasd',
    'orderNum':'dasd',
    'saleMoney':'dasd',
    'signMoney':'dasd',
    'signNumRatio':'dasd',
    'orderNumRatio':'dasd',
    'saleMoneyRatio':'dasd',
    'signMoneyRatio':'dasd',
    'willNum':'dasd',
    'willCustNum':'dasd',
    'callOutNum':'dasd',
    'inCallAllNum':'dasd',
    'callTime':'dasd',
    'inCallTime':'dasd',
    'outCallTimeAvg':'dasd',
    'inCallTimeAvg':'dasd',
    'doorCount':'dasd',
    'gjCount':'dasd',
    'planMoney':'dasd',
    'factMoney':'dasd',
    'planMoneyAll':'dasd',
    'planRatio':'50',
    'charList':'dasd',
    "charList":[{
        'saleMoney':'222',
        'signMoney':'33',
        'signNum':'1',
        'orderNum':'20',
        "dateFmt":"2018-07-01"
    },{
        'saleMoney':'12',
        'signMoney':'14',
        'signNum':'5',
        'orderNum':'6',
        "dateFmt":"2018-07-02"
    }]
    }
})
mock.onGet('/report/business/rankCount').reply(200, {
      "ranking":[{
          "saleMoney":1000,
          "signMoney":0,
          "userId":"rd170",
          'userName':'张三'
      },{
          "saleMoney":100,
          "signMoney":0,
          "userId":"rd170",
          'userName':'李四'
      },{
          "saleMoney":500,
          "signMoney":0,
          "userId":"rd170",
          'userName':'王五'
      }],
  })
  mock.onGet('/report/business/yxCount').reply(200, {
    "yxlist":[{
        "optionName":'B无疑义准备签约',
        "num":40
    },{
        'optionName':'准备签约',
        'num':30
    }]
})