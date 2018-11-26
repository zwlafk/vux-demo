import mock from '@/util/mockUtil'

// arguments for reply are (status, data, headers)
mock.onGet('/message/selectAllMessage').reply(200, {
  list: [
      {
        result:'操作结果标志1',
        list:'结果集{obj0,obj1,obj2….}1',
        ID:'该条数据的ID1',
        type:'消息类别1',
        title:'消息标题1',
        time_action:'数据产生时间1',
        info:'消息内容1',
        tel:'意向客户电话（非必须）、客服电话1',
        pl_person:'评论人名称1',
        pl_personid:'评论人ID1',
        pl_time:'评论时间1'
      },
    {
        result:'操作结果标志2',
        list:'结果集{obj0,obj1,obj2….}2',
        ID:'该条数据的ID2',
        type:'消息类别2',
        title:'消息标题2',
        time_action:'数据产生时间2',
        info:'消息内容2',
        tel:'意向客户电话（非必须）、客服电话2',
        pl_person:'评论人名称2',
        pl_personid:'评论人ID2',
        pl_time:'评论时间2'
    }
  ]
});
//客户查重
mock.onGet('/resource/mycust/custCheck').reply(200, {
  list: [
      {
        status:'操作结果标志(true:成功、false:失败)',
        msg:'结果说明',
        list:'列表数据',
        // Data 返回参数{customerid:1,cs_name:”企峰通信”,ownername:”所有者”，status：“客户状态”，level_sale：“销售进程”,creattime:”创建时间’}
        customerid:'客户ID',
        cs_name:'客户名称',
        ownername:'所有者',
        status:'客户状态',
        level_sale:'销售进程',
        creattime:'创建时间'
      },
      {
        status:'操作结果标志(true:成功、false:失败)',
        msg:'结果说明',
        list:'列表数据',
        // Data 返回参数{customerid:1,cs_name:”企峰通信”,ownername:”所有者”，status：“客户状态”，level_sale：“销售进程”,creattime:”创建时间’}
        customerid:'客户ID',
        cs_name:'客户名称',
        ownername:'所有者',
        status:'客户状态',
        level_sale:'销售进程',
        creattime:'创建时间'
      }
  ]
});
//登录
mock.onGet('/logins/login').reply(200, {
  list: [
      {
        user_data:'xxx',
        password_data:'123',
        state_data:'0',
        msg:'提示信息'
      },
      {
        user_data:'xxx',
        password_data:'123',
        state_data:'0',
        msg:'提示信息'
      }
  ]
});
//主页
mock.onGet('/logins/homePage').reply(200, {
  list: [
      {
        msg:true
      },
  ]
});