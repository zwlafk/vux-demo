/** 微信图片上传组合拳
 *  wxChooseImage()
        .then(localIds => {
          this.penddingImgIds = localIds;
          if (!navigator.userAgent.includes("iPhone")) {
            this.imgArr = localIds; //android直接使用localIds作为img src显示
          }
          return uploadAllImg(this.penddingImgIds);
        })
        .then(serverIds => {
          this.penddingImgServerIds = serverIds;
          if (navigator.userAgent.includes("iPhone")) {//IOS下 src base64显示
            return getAllLocalImgData(this.penddingImgIds);
          }
          return;
        })
        .then(LocalImgData => {
          this.imgArr = LocalImgData;
        })
        .catch(e => {});
 */



//Usage: wxChooseImage().then().catch()
export const wxChooseImage = () => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。（注：用户进入拍照界面仍然可自由切换两种模式）
      success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，
        resolve(localIds)
        // andriod中localId可以作为img标签的src属性显示图片；
        // 而在IOS中需通过上面的接口getLocalImgData获取图片base64数据，从而用于img标签的显示
      }
    });
  })
}


const wxGetLocalImgData = (localId) => {
  return new Promise((resolve, reject) => {
    if (!localId) reject(new Error('localId 为空'));
    wx.getLocalImgData({
      localId: localId, // 图片的localID
      success: function (res) {
        var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
        resolve(localData)
      }
    });
  })
}
/**
 *
 * @param {Array} localIds
 * 配合上面两个使用
 * Usage:
 * wxChooseImage()
    .then(localIds => {
      return getAllLocalImgData(localIds);
    })
    .then(LocalImgData => {
      this.a = LocalImgData;
    })
    .catch(e => {});
    @returns {Array}
 */
export const getAllLocalImgData = (localIds) => {
  return Promise.all(localIds.map(element => wxGetLocalImgData(element)));
}


const wxUploadImage = (localId) => {
  return new Promise((resolve, reject) => {
    if (!localId) reject(new Error('localId 为空'));
    wx.uploadImage({
      localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得 :String
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
        var serverId = res.serverId; // 返回图片的服务器端ID
        resolve(serverId)
      }
    });
  })
}

/**
 *
 * @param {Array} localIds
 * 配合wxUploadImage使用
 * Usage:
 * uploadAllImg(this.penddingImgIds).then(serverIds => {
        this.penddingImgServerIds = serverIds;
      });
    @returns {Array}
 */
export const uploadAllImg = (localIds) => {
  return Promise.all(localIds.map(element => wxUploadImage(element)));
}
