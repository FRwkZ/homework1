// pages/receptionist-in-detail/receptionist-in-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {}, // 当前订单信息
    persons: [], // 当前订单的人员信息
    festivaldiscount: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    const { order_number } = options;
    this.fetchOrderDetails(order_number);
    this.fetchPersons(order_number);
  },
  fetchOrderDetails(order_number) {
    wx.request({
      url: `http://8.217.117.43:8000/p1/order/${order_number}/`,
      method: "GET",
      success: (res) => {
        this.setData({ order: res.data });
      },
      fail: (err) => {
        wx.showToast({ title: "获取订单详情失败", icon: "none" });
      },
    });
  },
  fetchPersons(order_number) {
    wx.request({
      url: `http://8.217.117.43:8000/p1/Order-PersonInfo/${order_number}/`,
      method: "GET",
      success: (res) => {
        this.setData({ persons: res.data });
      },
      fail: (err) => {
        wx.showToast({ title: "获取人员信息失败", icon: "none" });
      },
    });
  },
  newbill(){
    wx.request({
      url: "http://8.217.117.43:8000/p1/bill/", 
      method: "POST",
      data: {
        consumption: null,
        total_price: 0,
        check_in_time: this.data.order.check_in_date,
        check_out_time: this.data.order.check_out_date,
        number_of_guest: this.data.order.number_of_guests,
        payment_status: "unpaid",
        finish_status: "unfinish",
        userid: this.data.order.booked_user,
        orderid: this.data.order.order_number,
        room: this.data.order.room_number,
        subbranch_id: this.data.order.subbranch_id,
        festivaldiscount: this.data.festivaldiscount,
      },
      success: (res) => {
      },
      fail: () => {
        wx.showToast({
          title: "网络请求失败",
          icon: "none",
        });
      },
    });

  },
  whichFestival(){
    const checkInTime = this.data.order.check_in_date;
    console.log(checkInTime);

    // 调用 API 检查节日优惠
    wx.request({
      url: "http://8.217.117.43:8000/p1/check-festival-discount/",
      method: "POST",
      data: {
        date: checkInTime,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const discountId = res.data.festival_discount_id;
            // 更新页面数据
            this.setData({
              festivaldiscount: discountId, // 保存优惠 ID
            })
            this.newbill();
        } else {
          wx.showToast({
            title: "节日优惠查询失败，请稍后重试",
            icon: "none",
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: "网络请求失败，请检查网络",
          icon: "none",
        });
      },
    });
  },
  onConfirm() {
    wx.request({
      url: `http://8.217.117.43:8000/p1/order/${this.data.order.order_number}/`, // 订单接口
      method: "PATCH",
      data: {
        order_number:this.data.order.order_number,
        order_status:1,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          wx.showToast({ title: "订单已确认", icon: "success" });
          this.whichFestival();
          wx.navigateBack(); // 返回到主页
        } else {
          wx.showToast({ title: "订单确认失败", icon: "none" });
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