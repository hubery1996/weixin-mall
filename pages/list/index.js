const app = getApp();
// pages/list/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		listItem: [],
		pageIndex: 1,
		length: '',
		sortByPrice: 'DESC'
	},
	getItem() {
		let pageIndexNew = this.data.pageIndex + 1;
		app.ajax({
			method: 'GET',
			url: '/api/goods',
			data: {
				pageSize: 8,
				pageIndex: pageIndexNew,
				sortByPrice: this.data.sortByPrice
			}
		}).then((res) => {
			console.log(res);
			// 连接数组
			let listItemOld = this.data.listItem;
			let data = res.data;
			let listItemNew = listItemOld.concat(data);
			this.setData({
				listItem: listItemNew,
				pageIndex: pageIndexNew
			})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getItem();

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
		console.log('到底了')
		this.getItem()

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
