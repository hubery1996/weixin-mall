let app = getApp();
// pages/IPAM/IPAM.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list: [],
	},
	// 获取收货地址
	getAdressList() {
		// 获取收货地址列表
		app.ajax({
			method: 'GET',
			url: '/api/address/list',
		}).then((res) => {
			if (res.status) {
				this.setData({
					list: res.data,
				})
			}
		})
	},
	// 删除模态框
	showDeleteModal(e) {
		let id = e.currentTarget.dataset.id;
		wx.showModal({
			title: '删除确认',
			content: '确认删除此收货地址吗？',
			success: (res) => {
				if (res.confirm) {
					// 这里箭头函数里的this指向全局变量
					this.deleteAdress(id);
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	// 删除收货地址
	deleteAdress(id) {
		app.ajax({
			method: 'POST',
			url: '/api/address/delete',
			data: {
				id
			}
		}).then((res) => {
			if (res.status) {
				wx.showToast({
					title: res.msg,
				});
				this.getAdressList();
			}

		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getAdressList();
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
