import mock from '@/util/mockUtil'

// arguments for reply are (status, data, headers)
mock.onGet('/work/sign/getAll').reply(200, {
  list: [{
    id: 1, 
    userid: 'userid',
    avatar: '/static/images/head.jpg',
    nickname: '用户名',
    time_action: new Date().getTime(),
    comefrom: '设备',
    info: '内容',
    pic: '/static/images/head.jpg<$imgurl$>/static/images/head.jpg',
    time_qd: '签到时间',
    address_qd: '签到地点',
    customer: '关联客户',
    customerid: '关联客户ID',
    toucher: '联系人姓名',
    recordpath: '录音文件地址',
    recordtime: '录音时长',
    num_pl:	'评论数',
    num_zan: '赞的数量',
    is_zan: '0/1'
  }],
  status: true
});
