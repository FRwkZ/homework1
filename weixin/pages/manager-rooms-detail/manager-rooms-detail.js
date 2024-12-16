// pages/manager-rooms-detail/manager-rooms-detail.js
Page({

    data: {
      room: {}, // 房间详情
      roomTypeOptions: ["标间", "豪华标间", "大床", "豪华大床", "行政", "豪华行政", "套房"],
      roomTypeIndex: 0, // 默认选中的房型索引
    },
  
    onLoad(options) {
      console.log(options);
      this.fetchRoomDetails(options.id); 
    },
  
    async fetchRoomDetails(roomId) {
      try {
        const res = await new Promise((resolve, reject) => {
          wx.request({
            url: `http://8.217.117.43:8000/p1/room/${roomId}/`, // 替换为实际API地址
            method: "GET",
            success: resolve,
            fail: reject,
          });
        });
  
        if (res.statusCode === 200) {
          const room = res.data;
          const roomTypeIndex = res.data.roomtype-1;
          this.setData({ room, roomTypeIndex });
        } else {
          wx.showToast({ title: "获取房间详情失败", icon: "none" });
        }
      } catch (err) {
        wx.showToast({ title: "网络错误，请稍后再试", icon: "none" });
      }
    },
  
    onInputChange(e) {
      const { field } = e.currentTarget.dataset;
      this.setData({ [`room.${field}`]: e.detail.value });
    },
  
    onRoomTypeChange(e) {
      const roomTypeIndex = e.detail.value;
      this.setData({
        roomTypeIndex,
        "room.roomtype": String(Number(roomTypeIndex)+1),
      });
    },
  
    onOccupiedChange(e) {
      const isOccupied = e.detail.value === "1"; // 0: 否, 1: 是
      this.setData({ "room.is_occupied": isOccupied });
    },
  
    async onSaveRoom() {
      console.log(this.data.room);
      try {
        const res = await new Promise((resolve, reject) => {
          wx.request({
            url: `http://8.217.117.43:8000/p1/room/${this.data.room.id}/`, // 替换为实际API地址
            method: "PUT",
            data: this.data.room,
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