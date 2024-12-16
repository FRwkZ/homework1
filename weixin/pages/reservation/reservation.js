// pages/reservation/reservation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    persons: [{ name: "", id_card: "", phone: "" }], // 入住人员信息
    checkInDate: "",
    checkOutDate: "",
    roomid: "",
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { roomid } = options;
    this.setData({roomid:roomid});
    console.log(this.data.roomid);
  },
  // 更新姓名
  onNameChange(e) {
    const index = e.currentTarget.dataset.index;
    const persons = this.data.persons;
    persons[index].name = e.detail.value;
    this.setData({ persons });
  },

  // 更新身份证号
  onIdCardChange(e) {
    const index = e.currentTarget.dataset.index;
    const persons = this.data.persons;
    persons[index].id_card = e.detail.value;
    this.setData({ persons });
  },

  // 更新手机号
  onPhoneChange(e) {
    const index = e.currentTarget.dataset.index;
    const persons = this.data.persons;
    persons[index].phone = e.detail.value;
    this.setData({ persons });
  },

  // 增加人员
  onAddPerson() {
    this.setData({
      persons: [...this.data.persons, { name: "", id_card: "", phone: "" }],
    });
    wx.showToast({
      title: "人员已添加",
      icon: "success",
    });
  },

  // 更新日期
  onDateChange(e) {
    const { mode } = e.currentTarget.dataset;
    if (mode === "checkIn") {
      this.setData({ checkInDate: e.detail.value });
    } else {
      this.setData({ checkOutDate: e.detail.value });
    }
  },
  onSubmit() {
    const app = getApp();
    const id = app.globalData.id;
    const roomid=this.data.roomid;
  
    if (!this.data.checkInDate || !this.data.checkOutDate) {
      wx.showToast({
        title: "请选择入住和退房日期",
        icon: "none",
      });
      return;
    }
  
    if (this.data.persons.some((person) => !person.name || !person.id_card || !person.phone)) {
      wx.showToast({
        title: "请填写完整的入住人员信息",
        icon: "none",
      });
      return;
    }
  
    // 第一步：创建订单
    wx.request({
      url: "http://8.217.117.43:8000/p1/order/", // 订单接口
      method: "POST",
      data: {
        room_number: roomid, // 房间编号
        number_of_guests: this.data.persons.length, // 入住人数
        check_in_date: this.data.checkInDate, // 入住日期
        check_out_date: this.data.checkOutDate, // 退房日期
        booked_user: id, // 用户 ID
      },
      success: (res) => {
        if (res.statusCode === 201) {
          const orderNumber = res.data.order_number; // 获取订单编号
          this.createPersonInfo(orderNumber); // 第二步：创建人员信息
        } else {
          wx.showToast({ title: "订单创建失败", icon: "none" });
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
  
  // 第二步：创建人员信息
  createPersonInfo(orderNumber) {
    const persons = this.data.persons.map((person) => ({
      id_card: person.id_card,
      name: person.name,
      phone_number: person.phone,
      order_id: orderNumber, // 关联订单编号
    }));
    console.log(persons);
  persons.forEach((person)=>{
    wx.request({
      url: "http://8.217.117.43:8000/p1/personinfo/", // 人员信息接口
      method: "POST",
      data: person, // 批量提交人员信息
      success: (res) => {
        if (res.statusCode === 201) {
          

        } else {
          console.log(res.data);
          wx.showToast({ title: "人员信息提交失败", icon: "none" });
        }
      },
      fail: () => {
        wx.showToast({
          title: "网络请求失败",
          icon: "none",
        });
      },
    });
    setTimeout(()=>{
      wx.showToast({ title: "订单成功", icon: "success" });
      wx.navigateBack({ delta: 2 }); // 返回上两页
    },500);

  })

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