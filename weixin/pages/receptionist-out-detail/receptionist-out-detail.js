// pages/receptionist-out-detail/receptionist-out-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bill: {}, // 存储账单数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const billId = options.bill_id; // 从路由参数获取账单ID
    this.fetchBillDetails(billId);
  },
  fetchBillDetails(billId) {
    wx.request({
      url: `http://8.217.117.43:8000/p1/bill/${billId}/`,
      method: "GET",
      success: (res) => {
        this.setData({
          bill: res.data,
        });
      },
      fail: () => {
        wx.showToast({ title: "获取账单详情失败", icon: "none" });
      },
    });
  },
  onConfirm() {
    wx.showModal({
      title: "确认账单",
      content: "确定要确认此账单吗？",
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: "处理中..." }); // 显示加载提示
          wx.request({
            url: `http://8.217.117.43:8000/p1/bill/${this.data.bill.id}/`,
            method: "PATCH",
            data: {
              id: this.data.bill.id,
              finish_status: "finish",
            },
            success: (response) => {
              if (response.statusCode === 200) {
                wx.showToast({ title: "账单确认成功", icon: "success" });
                setTimeout(() => {
                  wx.navigateBack(); // 延迟返回上一页，给用户展示反馈的时间
                }, 1500);
              } else {
                wx.showToast({
                  title: response.data?.message || "确认账单失败",
                  icon: "none",
                });
              }
            },
            fail: (error) => {
              console.error("请求失败", error);
              wx.showToast({
                title: "网络错误，请稍后重试",
                icon: "none",
              });
            },
            complete: () => {
              wx.hideLoading(); // 隐藏加载提示
            },
          });
        }
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