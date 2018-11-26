
export default {
  handleOpenEnterpriseChat(userIds,externalUserIds,groupName) {
    wx.openEnterpriseChat({
      // 注意：userIds和externalUserIds至少选填一个，且userIds+openIds总数不能超过2000。
        userIds: userList.join(';'),    //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
        // externalUserIds: 'wmEAlECwAAHrbWYDOK5u3Af13xlYDDNQ;wmEAlECwAAHrbWYDOK5u3Af13xlYDDNT', // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
        groupName: '',  // 必填，会话名称。单聊时该参数传入空字符串""即可。
        success: function(res) {
            // 回调
        },
        fail: function(res) {
            if(res.errMsg.indexOf('function not exist') > -1){
                alert('版本过低请升级')
            }
        }
    });
  }
}