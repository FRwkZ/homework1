// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bills: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const app=getApp();
    console.log(app.globalData.id);
    this.fetchBills(app.globalData.id);
  },
  fetchBills(id) {
    wx.request({
      url: `http://8.217.117.43:8000/p1/User-Bill/${id}/`,
      method: "GET",
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({ bills: res.data });
        } else {
          wx.showToast({
            title: "获取账单失败",
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
  onBillClick(e) {
    const billId = e.currentTarget.dataset.bill_id;
    wx.navigateTo({
      url: `/pages/person-detail/person-detail?bill_id=${billId}`,
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
    const app=getApp();
    this.fetchBills(app.globalData.id);

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