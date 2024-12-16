// pages/consumption/consumption.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billId: null,
    subbranchId: null,
    commodities: [], // 商品列表
    selectedItems: {}, // 用户选择的商品 {商品ID: 数量}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      const { billId } = options;
      this.setData({ billId });
      this.fetchgoods();
  },
  fetchgoods(){
        // 加载账单信息
        wx.request({
          url: `http://8.217.117.43:8000/p1/bill/${this.data.billId}/`,
          method: "GET",
          success: (res) => {
            const { subbranch_id } = res.data;
            this.setData({ subbranchId: subbranch_id });
            this.setData({selectedItems:res.data.consumption});
            console.log(this.data.selectedItems);
    
            // 加载分店的商品列表
            this.loadCommodities(subbranch_id);
          },
        });
  },
  loadCommodities(subbranchId) {
    wx.request({
      url: `http://8.217.117.43:8000/p1/Subbranch-Commodity/${subbranchId}/`,
      method: "GET",
      success: (res) => {
        this.setData({ commodities: res.data });
      },
    });
  },
  // 修改选择的商品数量
  updateQuantity(e) {
    const { id, action } = e.currentTarget.dataset;
    const { selectedItems } = this.data;

    if (action === "add") {
      selectedItems[id] = (selectedItems[id] || 0) + 1;
    } else if (action === "subtract" && selectedItems[id] > 0) {
      selectedItems[id] -= 1;
    }
    this.setData({ selectedItems });
  },
  // 提交订单
  submitOrder() {
    wx.request({
      url: `http://8.217.117.43:8000/p1/bill/${this.data.billId}/`,
      method: "PATCH",
      data: {
        consumption: this.data.selectedItems,
      },
      success: () => {
        wx.showToast({ title: "下单成功", icon: "success" });
        wx.navigateBack();
      },
      fail: () => {
        wx.showToast({ title: "下单失败", icon: "none" });
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