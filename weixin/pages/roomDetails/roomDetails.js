// pages/roomDetails/roomDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    room: {},
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options;
    this.fetchRoomDetails(id);
  },

  fetchRoomDetails(id) {
    wx.request({
      url: `http://8.217.117.43:8000/p1/room/${id}/`,
      method: "GET",
      success: (res) => {
        if (res.statusCode === 200) {
          const ROOM_CHOICES = {
            "1": "标间",
            "2": "豪华标间",
            "3": "大床",
            "4": "豪华大床",
            "5": "行政",
            "6": "豪华行政",
            "7": "套房",
          };
  
          // 检查返回的数据是否为对象
          const roomData = res.data;
          if (roomData) {
            const room = {
              id: roomData.id,
              roomtype: ROOM_CHOICES[roomData.roomtype] || "未知类型", // 防止未定义类型
              price: roomData.price,
              discount: roomData.discount,
              area: roomData.area,
              max_number_of_guest: roomData.max_number_of_guest,
              is_occupied: roomData.is_occupied,
            };
  
            // 设置到 data 中
            this.setData({ room });
          } else {
            wx.showToast({
              title: "房间数据加载失败",
              icon: "none",
            });
          }
        } else {
          wx.showToast({
            title: `请求失败，状态码: ${res.statusCode}`,
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
  onConfirmRoom() {
    const app = getApp();
    app.globalData.selectedRoom = this.data.room;
    wx.navigateBack();
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