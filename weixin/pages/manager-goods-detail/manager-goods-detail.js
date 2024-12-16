// pages/manager-goods-detail/manager-goods-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commoditys: {}, // 商品详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.fetchGoodDetails(options.id); 
  },
  async fetchGoodDetails(id) {
    try {
      const res = await new Promise((resolve, reject) => {
        wx.request({
          url: `http://8.217.117.43:8000/p1/commodity/${id}/`, // 替换为实际API地址
          method: "GET",
          success: resolve,
          fail: reject,
        });
      });

      if (res.statusCode === 200) {
        const commoditys = res.data;
        this.setData({ commoditys});
      } else {
        wx.showToast({ title: "获取房间详情失败", icon: "none" });
      }
    } catch (err) {
      wx.showToast({ title: "网络错误，请稍后再试", icon: "none" });
    }
  },
  onInputChange(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({ [`commoditys.${field}`]: e.detail.value });
  },

  async onSaveGood() {
    console.log(this.data.commoditys);
    try {
      const res = await new Promise((resolve, reject) => {
        wx.request({
          url: `http://8.217.117.43:8000/p1/commodity/${this.data.commoditys.id}/`, // 替换为实际API地址
          method: "PUT",
          data: this.data.commoditys,
          header: { "Content-Type": "application/json" },
          success: resolve,
          fail: reject,
        });
      });

      if (res.statusCode === 200) {
        wx.showToast({ title: "修改成功", icon: "success" });
        wx.navigateBack(); // 返回上一页
      } else {
        wx.showToast({ title: "修改失败", icon: "none" });
      }
    } catch (err) {
      wx.showToast({ title: "网络错误，请稍后再试", icon: "none" });
    }
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