// pages/receptionist-in/receptionist-in.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    branch_id: "", // 分店ID
    orders: [], // 存储订单数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      branch_id: options.branch_id
    });
    this.fetchOrders();
  },
  fetchOrders() {
    console.log(100);
    wx.request({
      url: `http://8.217.117.43:8000/p1/Subbranch-Order/${this.data.branch_id}/`,
      method: "GET",
      success: (res) => {
        this.setData({
          orders: res.data,
        });
        
      },
      fail: (err) => {
        wx.showToast({ title: "获取订单失败", icon: "none" });
      },
    });
  },
  onOrderClick(e) {
    const order_id = e.currentTarget.dataset.order_id;
    console.log(order_id);
    wx.navigateTo({
      url: `/pages/receptionist-in-detail/receptionist-in-detail?order_number=${order_id}`,
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
    this.fetchOrders();
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