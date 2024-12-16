// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bills: [], // 存储未支付账单
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.fetchBill();
  },
  fetchBill(){
    const app=getApp();

    wx.request({
      url: `http://8.217.117.43:8000/p1/User-Bill/${app.globalData.id}/`, // 未支付账单的API
      method: "GET",
      success: (res) => {
        const unpaidBills = res.data.filter((bill) => bill.payment_status === "unpaid");
        this.setData({ bills: unpaidBills });
      },
      fail: () => {
        wx.showToast({ title: "加载账单失败", icon: "none" });
      },
    });
  },
    // 跳转到消费页面
    goToConsumption(e) {
      const { billId } = e.currentTarget.dataset;
      wx.navigateTo({
        url: `/pages/consumption/consumption?billId=${billId}`,
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
    this.fetchBill();
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