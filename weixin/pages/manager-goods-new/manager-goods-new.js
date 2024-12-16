// pages/manager-goods-new/manager-goods-new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commoditys: {
      price: "",
      discount: "",
      Commodityname: "",
      number: "",
      subbranch_id:"",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const subbranch_id=options.branch_id;
    this.setData({"commoditys.subbranch_id":subbranch_id});
  },
  onNameChange(e) {
    this.setData({
      "commoditys.Commodityname": e.detail.value,
    });
  },
  onNumberChange(e) {
    this.setData({
      "commoditys.number": e.detail.value,
    });
  },
  onPriceChange(e) {
    this.setData({
      "commoditys.price": e.detail.value,
    });
  },

  onDiscountChange(e) {
    this.setData({
      "commoditys.discount": e.detail.value,
    });
  },
  async onSubmit() {
    const commoditys = this.data.commoditys;
    console.log(this.data.commoditys);


    if (!commoditys.price || !commoditys.discount || !commoditys.number || !commoditys.Commodityname) {
      wx.showToast({
        title: "请填写完整信息",
        icon: "none",
      });
      return;
    }

    try {
      const res = await new Promise((resolve, reject) => {
        wx.request({
          url: "http://8.217.117.43:8000/p1/commodity/", // 替换为你的后端接口
          method: "POST",
          data: {
            price: commoditys.price,
            discount: commoditys.discount,
            Commodityname: commoditys.Commodityname,
            number: commoditys.number,
            subbranch_id:commoditys.subbranch_id,
          },
          header: { "Content-Type": "application/json" },
          success: resolve,
          fail: reject,
        });
      });

      if (res.statusCode === 201) {
        wx.showToast({
          title: "商品创建成功",
          icon: "success",
        });
        setTimeout(() => {
          wx.navigateBack(); // 返回上一页面
        }, 1000);
      } else {
        wx.showToast({
          title: res.data.error || "创建失败",
          icon: "none",
        });
      }
    } catch (err) {
      wx.showToast({
        title: "网络错误，请稍后再试",
        icon: "none",
      });
      console.error("创建商品失败：", err);
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