import mock from '@/util/mockUtil'

// arguments for reply are (status, data, headers)
mock.onPost('/resource/custList/page').reply(200, {
  list: [
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name',
      custStatus: 1,
      address: '的萨大声的发撒旦111',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name2',
      custStatus: 1,
      address: '的萨大声的发撒旦312',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name321',
      custStatus: 1,
      address: '的萨大声的发撒旦dsa',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name2',
      custStatus: 1,
      address: '的萨大声的发撒旦312',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name321',
      custStatus: 1,
      address: '的萨大声的发撒旦dsa',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name2',
      custStatus: 1,
      address: '的萨大声的发撒旦312',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name321',
      custStatus: 1,
      address: '的萨大声的发撒旦dsa',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: '的萨大声的发撒旦dsa的萨大声的发撒旦dsa的萨大声的发撒旦dsa的萨大声的发撒旦dsa的萨大声的发撒旦dsa',
      custStatus: 1,
      address: '的萨大声的发撒旦312',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name321',
      custStatus: 1,
      address: '的萨大声的发撒旦dsa的萨大声的发撒旦dsa的萨大声的发撒旦dsa的萨大声的发撒旦dsa的萨大声的发撒旦dsa',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name2',
      custStatus: 1,
      address: '的萨大声的发撒旦312',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name321',
      custStatus: 1,
      address: '的萨大声的发撒旦dsa',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name2',
      custStatus: 1,
      address: '的萨大声的发撒旦312',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name321',
      custStatus: 1,
      address: '的萨大声的发撒旦dsa',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name2',
      custStatus: 1,
      address: '的萨大声的发撒旦312',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name321',
      custStatus: 1,
      address: '的萨大声的发撒旦dsa',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name2',
      custStatus: 1,
      address: '的萨大声的发撒旦312',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name321',
      custStatus: 1,
      address: '的萨大声的发撒旦dsa',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name2',
      custStatus: 1,
      address: '的萨大声的发撒旦312',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    },
    {
      custId: `${Math.random()}`.slice(2),
      custName: 'name321',
      custStatus: 1,
      address: '的萨大声的发撒旦dsa',
      mobilePhone: '13333333333',
      wxId: 'dsadasdsaa'
    }
  ]
});
mock.onPost('/resource/custList/search').reply(200, {
  list: [
    {
      id: '321'
      , searchName: 'dsdsaadas',
      searchCode: 'dsadas',
      displayContent: 'dsadas',
      dataType: 'dsadas',
      value: 'dsadas',
      developCode: 'dsadas',
      paramValue: 'dsadas',
      defined1: 'dsadas',
      isFiledSet: 'dsadas',
      childList: 'dsadas',
      childList: 'dsadas',
      value: 'dsadas',
      name: 'dsadas',
      isCheck: 'dsadas',
      order: 'dsadas',
    }, {
      id: '321321'
      , searchName: 'dsadas',
      searchCode: 'dsadas',
      displayContent: 'dsadas',
      dataType: 'dsadas',
      value: 'dsadas',
      developCode: 'dsadas',
      paramValue: 'dsadas',
      defined1: 'dsadas',
      isFiledSet: 'dsadas',
      childList: 'dsadas',
      childList: 'dsadas',
      value: 'dsadas',
      name: 'dsadas',
      isCheck: 'dsadas',
      order: 'dsadas',
    }, {
      id: '3221'
      , searchName: 'dsadas',
      searchCode: 'dsadas',
      displayContent: 'dsadas',
      dataType: 'dsadas',
      value: 'dsadas',
      developCode: 'dsadas',
      paramValue: 'dsadas',
      defined1: 'dsadas',
      isFiledSet: 'dsadas',
      childList: 'dsadas',
      childList: 'dsadas',
      value: 'dsadas',
      name: 'dsadas',
      isCheck: 'dsadas',
      order: 'dsadas',
    }, {
      id: '332121'
      , searchName: 'dsadas',
      searchCode: 'dsadas',
      displayContent: 'dsadas',
      dataType: 'dsadas',
      value: 'dsadas',
      developCode: 'dsadas',
      paramValue: 'dsadas',
      defined1: 'dsadas',
      isFiledSet: 'dsadas',
      childList: 'dsadas',
      childList: 'dsadas',
      value: 'dsadas',
      name: 'dsadas',
      isCheck: 'dsadas',
      order: 'dsadas',
    },
  ]
})


mock.onGet('/res/cust/custInfoData').reply(200, {
  data: {
    type: 1,
    cs_name: "94单位",
    toucher_name: "",
    lat: "",
    lon: "",
    time_near: 1534177572000,
    sale_status: 2,
    sale_jc: "F初步沟通有意向",
    ownerid: "hyx53y001",
    ownername: "531531531",
    tel_usual: "17963256414",
    tel_double: "15600001200",
    address: "浙江省杭州市西湖区教工路90号",
    label: "",
    list_toucher: [
      {
        toucherid: "75cdbe5c23f644789a0e7c8a2c5e807f",
        nickname: "林94",
        position: "",
        tel: "17963256414#15600001200"
      }
    ],
    toucher_size: 1,
    obj_gjjl: [
      {
        id: "5a9ca91fa90f4db295b6b72c6e4b98da",
        nickname: "531531531",
        time: 1531733499000,
        info: "如听完"
      }
    ],
    gjjl_size: 1,
    obj_fwhf: [
      {
        id: "31b318e2f35045d6a03626d3a59e42cd",
        nickname: "531531531",
        time: 1542347964000,
        info: "11111"
      }, {
        id: "31b318e2f35045d6a03626d3a59e42cd",
        nickname: "531531531",
        time: 1542347964000,
        info: "2222"
      }, {
        id: "31b318e2f35045d6a03626d3a59e42cd",
        nickname: "531531531",
        time: 1542347964000,
        info: "2233333"
      },
    ],
    fwhf_size: 3,
    obj_dp: [
      {
        id: "31b318e2f35045d6a03626d3a59e42cd",
        nickname: "531531531",
        time: 1542347964000,
        info: "11111"
      }, {
        id: "31b318e2f35045d6a03626d3a59e42cd",
        nickname: "531531531",
        time: 1542347964000,
        info: "2222"
      }, {
        id: "31b318e2f35045d6a03626d3a59e42cd",
        nickname: "531531531",
        time: 1542347964000,
        info: "2233333"
      },
    ],
    dp_size: 2,
    list_calllg: [
      {
        id: "31b318e2f35045d6a03626d3a59e42cd",
        toucher_name: "531531531",
        call_num: 13333333333,
        type: 1
      }, {
        id: "31b328e2f35045d6a03626d3a59e42cd",
        toucher_name: "531531531",
        call_num: 13333333333,
        type: 2
      }, {
        id: "31b318e2q35045d6a03626d3a59e42cd",
        toucher_name: "531531531",
        call_num: 13333333333,
        type: 4
      }
    ],
    calllg_size: 3
  }
})

