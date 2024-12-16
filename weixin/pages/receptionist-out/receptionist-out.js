// pages/receptionist-out/receptionist-out.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    branch_id:"",
    bills: [],
  },

  onLoad(options) {
    this.setData({
      branch_id: options.branch_id,
    });
    this.fetchBillDetail();
  },
  fetchBillDetail() {
    wx.request({
      url: `http://8.217.117.43:8000/p1/Subbranch-Bill/${this.data.branch_id}/`,
      method: "GET",
      success: (res) => {
        this.setData({
          bills: res.data,
        });
        console.log(this.data.bill);
      },
      fail: (err) => {
        wx.showToast({ title: "获取账单详情失败", icon: "none" });
      },
    });
  },
    // 点击账单查看详情
    onBillClick(e) {
      const bill_id = e.currentTarget.dataset.bill_id;
      console.log(bill_id);
      wx.navigateTo({
        url: `/pages/receptionist-out-detail/receptionist-out-detail?bill_id=${bill_id}`,
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
    this.fetchBillDetail();

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