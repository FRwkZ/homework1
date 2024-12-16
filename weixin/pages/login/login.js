// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      username: "", // 存储用户名
      password: "", // 存储密码
  },
// 监听用户名输入
onUsernameInput(e) {
  this.setData({
    username: e.detail.value,
  });
},

// 监听密码输入
onPasswordInput(e) {
  this.setData({
    password: e.detail.value,
  });
},

// 登录处理
async onLogin() {
  const { username, password } = this.data;

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
        url: "http://8.217.117.43:8000/p1/login/", // 替换为你的后端登录 API 地址
        method: "POST",
        data: { username, password },
        header: { "Content-Type": "application/json" },
        success: resolve,
        fail: reject,
      });
    });

    // 处理响应
    if (res.statusCode === 200) {
      wx.showToast({
        title: "登录成功",
        icon: "success",
      });
      const app = getApp();
      app.globalData.role = res.data.role;
      app.globalData.id = res.data.id;
      app.globalData.isLoggedIn=true;
      console.log(app.globalData.role);
      setTimeout(() => {
        // 注册成功后跳转到登录页面
        if(res.data.role==="customer"){
          wx.navigateTo({
            url: "/pages/customer-mian/customer-mian",
         });
        }
        else if(res.data.role==="manager"){
          wx.navigateTo({
            url: `/pages/manager-mian/manager-mian?branch_id=${res.data.branch_id}`,
         });
        }
        else if(res.data.role==="receptionist"){
          wx.navigateTo({
            url: `/pages/receptionist-mian/receptionist-mian?branch_id=${res.data.branch_id}`,
         });
        }
      }, 1000); 
    } else if (res.statusCode === 401) {
      wx.showToast({
        title: res.data.error || "密码错误",
        icon: "none",
      });
    } else {
      wx.showToast({
        title: res.data.error || "登录失败",
        icon: "none",
      });
    }
  } catch (err) {
    wx.showToast({
      title: "网络错误，请稍后再试",
      icon: "none",
    });
    console.error("登录失败：", err);
  }
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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