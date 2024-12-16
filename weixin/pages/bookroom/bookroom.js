// pages/bookroom/bookroom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    branches: [], // 分店列表
    selectedBranch: null, // 当前选择的分店
    rooms: [], // 当前分店的房间列表
    selectedRoom: null, // 当前选择的房间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchBranches(); // 初始化时获取分店列表
  },
// 获取分店列表
fetchBranches() {
  wx.request({
    url: "http://8.217.117.43:8000/p1/subbranch/", // 调用 Subbranch API
    method: "GET",
    success: (res) => {
      if (res.statusCode === 200) {
        const branches = res.data.map((branch) => ({
          id: branch.id,
          name: branch.name,
          address: branch.address,
        }));
        this.setData({ branches });
      } else {
        wx.showToast({
          title: "加载分店失败",
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
 // 获取分店对应的房间列表
fetchRooms(subbranchId) {
  wx.request({
    url: `http://8.217.117.43:8000/p1/SubbranchRooms/${subbranchId}/`, // 使用新 API
    method: "GET",
    success: (res) => {
      if (res.statusCode === 200) {
        // 定义房间类型映射
        const ROOM_CHOICES = {
          "1": "标间",
          "2": "豪华标间",
          "3": "大床",
          "4": "豪华大床",
          "5": "行政",
          "6": "豪华行政",
          "7": "套房",
        };

        // 解析并翻译房间数据
        const rooms = res.data.map((room) => ({
          id: room.id,
          roomtype: ROOM_CHOICES[room.roomtype] || "未知类型", // 翻译房型
        }));

        // 更新房间数据
        this.setData({ rooms });
      } else {
        wx.showToast({
          title: "加载房间失败",
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


// 选择分店
onBranchChange(e) {
  const selectedBranch = this.data.branches[e.detail.value];
  this.setData({ selectedBranch });
  this.fetchRooms(selectedBranch.id); // 获取分店房间列表
},
// 选择房间
onRoomClick(e) {
  const roomId = e.currentTarget.dataset.id;
  const selectedRoom = this.data.rooms.find((room) => room.id === roomId);
  this.setData({ selectedRoom });
  wx.navigateTo({
    url: `/pages/roomDetails/roomDetails?id=${roomId}`, // 跳转到房间详情页面
  });
},
  // 点击预定按钮
  onReserveClick() {
    wx.navigateTo({
      url: `/pages/reservation/reservation?roomid=${this.data.selectedRoom.id}`,
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