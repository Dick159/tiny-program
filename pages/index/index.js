//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    animation:'',
    interval:2000,
    arrowDisplay:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady:function(){
       this.doAnimation()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  doAnimation : function(){
    console.log(this.data.arrowDisplay)
    this.animation = wx.createAnimation({
      duration: this.data.interval,
      timingFunction: 'linear'
    });
    this.animation.opacity(0).step()
    this.setData({
      animation: this.animation.export()
    })
    if(this.data.arrowDisplay){
    setTimeout(function () {
      this.animation.opacity(1).step()
      this.setData({
        animation: this.animation.export()
      })
      setTimeout(function () {
          this.doAnimation()
      }.bind(this), this.data.interval)
    }.bind(this), this.data.interval)
    }
  },
  bindchangeTag : function(e){
    this.c = e.detail.current;
    this.setData({
      arrowDisplay:false,
      interval:100
    })
  }
})
