const app = getApp();
// pages/allOrders/orders.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		indicatorDots: false,
		autoplay: false,
		interval: 5000,
		duration: 1000.,
		headerBar: [{
			title: '待付款',
			status: 0
		}, {
			title: '待发货',
			status: 3
		}, {
			title: '待收货',
			status: 4
		}, {
			title: '待评价',
			status: 5
		}],
		current: 0,
		// status: 0,
		list: ''
	},
	// 获取订单列表
	getOrders() {
		let current = this.data.current;
		app.ajax({
			method: 'POST',
			url: '/api/order/list',
			data: {
				status: this.data.headerBar[current].status
			}
		}).then((res) => {
			if (res.status) {
				this.setData({
					list: res.data
				})
			}
		})
	},
	// 轮播下标改变事件 
	swiperChange(e) {
		this.setData({
			current: e.detail.current
		})
		this.getOrders();
	},
	changeSwiperItem(e) {
		let current = e.target.dataset.index;
		this.setData({
			current: current
		})
		this.getOrders();
	},
	/**
	 * 生命周期函数--监听页面加载
	 */

	onLoad: function(options) {
		if (options.current) {
			this.setData({
				current:options.current
			})
		}
		this.getOrders();
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
