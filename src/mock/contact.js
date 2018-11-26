import mock from '@/util/mockUtil'

// arguments for reply are (status, data, headers)
mock.onGet('/res/cust/linkman/search/company').reply(200, {
  list: [ {
      "tscidId" : "0622285146314874a4b08719a4018056s",
      "rciId" : "3cf8aa5263124a2cb4eb887a316611a0",
      "orgId" : "hyx53y",
      "sex" : "",
      "name" : "林713",
      "work" : "",
      "telphone" : "15636011757",
      "telphonebak" : "15636011456",
      "email" : "",
      "context" : "",
      "fax" : "",
      "birthday" : "",
      "keyword" : "",
      "groupname" : "",
      "wangwang" : "",
      "qq" : "",
      "isDefault" : 0,
      "conDefined1" : "",
      "conDefined2" : "",
      "conDefined3" : "",
      "conDefined4" : "",
      "conDefined5" : "",
      "callNum" : ""
    },
    {
        "tscidId" : "0622285146314874a4b08719a4018056",
        "rciId" : "3cf8aa5263124a2cb4eb887a316611a0",
        "orgId" : "hyx53y",
        "sex" : "",
        "name" : "林713",
        "work" : "",
        "telphone" : "15636011757",
        "telphonebak" : "15636014789",
        "email" : "",
        "context" : "",
        "fax" : "",
        "birthday" : "",
        "keyword" : "",
        "groupname" : "",
        "wangwang" : "",
        "qq" : "",
        "isDefault" : 0,
        "conDefined1" : "",
        "conDefined2" : "",
        "conDefined3" : "",
        "conDefined4" : "",
        "conDefined5" : "",
        "callNum" : ""
      } ]
});

mock.onGet('/res/cust/linkman/detail').reply(200, {
  "tscidId" : "0622285146314874a4b08719a4018056",
  "rciId" : "3cf8aa5263124a2cb4eb887a316611a0",
  "orgId" : "hyx53y",
  "sex" : "",
  "name" : "林713",
  "work" : "",
  "telphone" : "15636011757",
  "telphonebak" : "15636011456",
  "email" : "",
  "context" : "",
  "fax" : "",
  "birthday" : "",
  "keyword" : "",
  "groupname" : "",
  "wangwang" : "",
  "qq" : "",
  "isDefault" : 0,
  "conDefined1" : "",
  "conDefined2" : "",
  "conDefined3" : "",
  "conDefined4" : "",
  "conDefined5" : "",
  "callNum" : ""
});

mock.onPost('/res/cust/linkman/saveDetail').reply(200,{
  resultCode:1
})

mock.onGet('/res/cust/linkman/externalUserInfosInWx').reply(200,{
  list:[{
    'userid':"aliluya",
    'name':"aliluya",
    'sex':"2",
    'avatar':"",
    'bindStatus':1,
    "tscidId" : "0622285146314874a4b08719a40d18056",
    "rciId" : "3cf8aa5263124a2cb4eb887a316611a0",
    'lmName':"aliluya",
    'lmTelphone':"13265564884"
  },{
    'userid':"123456",
    'name':"张三",
    'sex':"2",
    'avatar':"",
    'bindStatus':1,
    "tscidId" : "0622285146314874a4b08719vba4018056",
    "rciId" : "3cf8aa5263124a2cb4eb887a316611a0",
    'lmName':"aliluya",
    'lmTelphone':"13265564884"
  },{
    'userid':"aliluya",
    'name':"李四",
    'sex':"2",
    'avatar':"",
    'bindStatus':1,
    "tscidId" : "06222851463148734a4b08719a4018056",
    "rciId" : "3cf8aa5263124a2cb4eb887a316611a0",
    'lmName':"aliluya",
    'lmTelphone':"13265564884"
  }]
})

mock.onGet('/res/cust/linkman/importExternalUserInfos').reply(200,{
  list:[

  ]
})
