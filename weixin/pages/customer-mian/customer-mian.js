// pages/customer-mian/customer-mian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //预定跳转函数
  btn1(){
    wx.navigateTo({
      url: "/pages/bookroom/bookroom",
   });
  },
  btn2(){
    wx.navigateTo({
      url: "/pages/goods/goods",
   });
  },
  btn3(){
    wx.navigateTo({
      url: "/pages/person/person",
   });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})