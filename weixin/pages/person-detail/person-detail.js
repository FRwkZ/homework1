// pages/person-detail/person-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bill: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const billId = options.bill_id;
    this.fetchBillDetail(billId);
  },
  fetchBillDetail(billId) {
    wx.request({
      url: `http://8.217.117.43:8000/p1/bill/${billId}/`,
      method: "GET",
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({ bill: res.data });
        } else {
          wx.showToast({
            title: "获取账单详情失败",
            icon: "none",
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: "网络请求失败",
          icon: "none",
        });
      },
    });
  },
  onPayBill() {
    const billId = this.data.bill.id;
    wx.request({
      url: `http://8.217.117.43:8000/p1/Check-Out/${billId}/`,
      method: "GET",
      success: (res) => {
        if (res.statusCode === 200) {
          wx.showToast({ title: "支付成功", icon: "success" });
          this.fetchBillDetail(billId); // 刷新账单详情
        } else {
          wx.showToast({ title: "支付失败", icon: "none" });
        }
      },
      fail: () => {
        wx.showToast({
          title: "网络请求失败",
          icon: "none",
        });
      },
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