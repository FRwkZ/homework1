// pages/manager-rooms-new/manager-rooms-new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    room: {
      price: "",
      discount: "",
      area: "",
      max_number_of_guest: "",
      subbranch_id:"",
    },
    roomTypeOptions: ["标间", "豪华标间", "大床", "豪华大床", "行政", "豪华行政", "套房"],
    roomTypeIndex: -1, // 默认未选择
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const subbranch_id=options.branch_id;
    this.setData({"room.subbranch_id":subbranch_id});
  },

  onRoomTypeChange(e) {
    this.setData({
      roomTypeIndex: parseInt(e.detail.value),
    });
  },

  onPriceChange(e) {
    this.setData({
      "room.price": e.detail.value,
    });
  },

  onDiscountChange(e) {
    this.setData({
      "room.discount": e.detail.value,
    });
  },

  onAreaChange(e) {
    this.setData({
      "room.area": e.detail.value,
    });
  },

  onMaxGuestsChange(e) {
    this.setData({
      "room.max_number_of_guest": e.detail.value,
    });
  },

  async onSubmit() {
    const { roomTypeIndex, room, roomTypeOptions } = this.data;
    console.log(this.data.room);

    if (roomTypeIndex === -1) {
      wx.showToast({
        title: "请选择房型",
        icon: "none",
      });
      return;
    }

    if (!room.price || !room.discount || !room.area || !room.max_number_of_guest) {
      wx.showToast({
        title: "请填写完整信息",
        icon: "none",
      });
      return;
    }

    try {
      const res = await new Promise((resolve, reject) => {
        wx.request({
          url: "http://8.217.117.43:8000/p1/room/", // 替换为你的后端接口
          method: "POST",
          data: {
            roomtype: String(Number(roomTypeIndex)+1),
            price: room.price,
            discount: room.discount,
            area: room.area,
            max_number_of_guest: room.max_number_of_guest,
            subbranch_id:room.subbranch_id,
          },
          header: { "Content-Type": "application/json" },
          success: resolve,
          fail: reject,
        });
      });

      if (res.statusCode === 201) {
        wx.showToast({
          title: "房间创建成功",
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
      console.error("创建房间失败：", err);
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