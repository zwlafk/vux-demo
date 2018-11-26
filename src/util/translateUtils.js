

const translateObj = {
  sexStatus: {
    0:"",
    1:"男",
    2:"女"
  },
  bindStatus:{
    0:"未选择",
    1:"已选择",
    2:"已绑定"
  },
  defaultStatus:{
    0:"否",
    1:"是"
  },
  /*自定义字段类型*/
  dataType:{
    1:"文本类型",
    2:"日期类型",
    3:"单选类型",
    4:"多选类型",
    5:"多选类型",
  }
}


const commonUtils = {

  sexDic:(val)=>{
    return translateObj.sexStatus[ Number(val) ]
  },
  bindDic:(val)=>{
    return translateObj.bindStatus[ Number(val) ]
  },
  defaultDic:(val)=>{
    return translateObj.defaultStatus[ Number(val) ]
  }
}

export default commonUtils
