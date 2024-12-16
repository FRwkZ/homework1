// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "", // 用户名
    password: "", // 密码
    role: "customer", // 角色选项
  },
  // 输入框绑定事件
  onUsernameChange(e) {
    this.setData({
      username: e.detail.value,
    });
  },

  onPasswordChange(e) {
    this.setData({
      password: e.detail.value,
    });
  },

  async onRegister() {
    const { username, password, role} = this.data;
  
    // 表单校验
    if (!username || !password) {
      wx.showToast({
        title: "用户名和密码不能为空",
        icon: "none",
      });
      return;
    }
  
    try {
      // 使用 Promise 包装 wx.request
      const res = await new Promise((resolve, reject) => {
        wx.request({
          url: "http://8.217.117.43:8000/p1/user/", // 替换为你的后端注册 API 地址
          method: "POST",
          data: {
            username,
            password,
            role // 使用 roles 和 roleIndex 来获取角色
          },
          header: {
            "Content-Type": "application/json",
          },
          success: resolve,
          fail: reject,
        });
      });
  
      // 处理响应
      if (res.statusCode === 201) {
        wx.showToast({
          title: "注册成功",
          icon: "success",
        });
        // 注册成功后跳转到登录页面
        // 使用 setTimeout 延迟跳转，确保 wx.showToast 先显示一段时间
       setTimeout(() => {
         // 注册成功后跳转到登录页面
          wx.navigateTo({
           url: "/pages/login/login",
        });
       }, 1000); 
      } else if(res.statusCode === 400){
        wx.showToast({
          title: res.data.error || "注册失败",
          icon: "none",
        });
      }
    } catch (err) {
      wx.showToast({
        title: "网络错误，请稍后再试",
        icon: "none",
      });
      console.error("注册失败：", err);
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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