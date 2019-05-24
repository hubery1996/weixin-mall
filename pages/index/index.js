// 获取应用实例
const app = getApp();
Page({
	data: {
		imgUrls: [
			'/images/index/18_birthday_m.jpg',
			'/images/index/18_byz_m.jpg',
			'/images/index/18_youflower_m.jpg',
		],
		indicatorDots: false,
		autoplay: false,
		interval: 5000,
		duration: 1000,
		AuthModelShow: false,

	},
	// 获取授权
	authHandle(e) {
		console.log(e.detail);
		app.ajax({
			method: 'POST',
			url: '/api/user/info/upload/',
			data: {
				...e.detail
			}
		}).then((res) => {
			if (res.status) {
				console.log(res)
				// 子组件传递信息给getAuth，getAuth找到authHandle事件
				this.setData({
					// 关闭模态框
					AuthModelShow: true,
				})
			}
		})

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		wx.getSetting({
			success: res => {
				app.globalData.isAuth = res.authSetting['scope.userInfo'] ? true : false;
				console.log(app.globalData.isAuth)
				this.setData({
					AuthModelShow: app.globalData.isAuth,
				})
			}
		})

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}




})
