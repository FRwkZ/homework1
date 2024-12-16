// pages/manager-goods/manager-goods.js
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
    this.fetchGoods(this.data.branch_id); // 初始化时获取房间列表
  },
 //获取商品列表
 fetchGoods(subbranchId) {
   wx.request({
    url: `http://8.217.117.43:8000/p1/Subbranch-Commodity/${subbranchId}/`, // 使用新 API
    method: "GET",
    success: (res) => {
      if (res.statusCode === 200) {
        // 解析并翻译房间数据
        const commoditys = res.data.map((commodity) => ({
          id: commodity.id,
          Commodityname: commodity.commodityname,
        }));

        // 更新房间数据
        this.setData({ commoditys });
      } else {
        wx.showToast({
          title: "加载商品失败",
          icon: "none",
        });
      }
    },
    fail: () => {
      wx.showToast({
        title: "网络错误，请稍后重试",
        icon: "none",
      });
    },
   });
  }, 
  onRoomClick(e) {
    const Id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: `/pages/manager-goods-detail/manager-goods-detail?id=${Id}`, // 跳转到房间详情页面
    });
  },
  onnewClick(){
    wx.navigateTo({
      url: `/pages/manager-goods-new/manager-goods-new?branch_id=${this.data.branch_id}`, 
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
    this.fetchGoods(this.data.branch_id); // 初始化时获取房间列表
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