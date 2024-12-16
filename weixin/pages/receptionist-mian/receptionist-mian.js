// pages/receptionist-mian/receptionist-mian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    branch_id:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      branch_id: options.branch_id
    });
  },
  btn1(){
    wx.navigateTo({
      url: `/pages/receptionist-in/receptionist-in?branch_id=${this.data.branch_id}`,
   });
  },
  btn2(){
    wx.navigateTo({
      url: `/pages/receptionist-out/receptionist-out?branch_id=${this.data.branch_id}`,
   });
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