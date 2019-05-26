const app = getApp();
// pages/category/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list: '',
		list_2: '',
		pId: '2'
	},
	geLevel_1() {
		app.ajax({
			method: 'GET',
			url: '/api/category/sub',
			data: {
				pId: 1
			}
		}).then((res) => {
			this.setData({
				list: res.data
			})
		})
	},
	geLevel_2() {
		app.ajax({
			method: 'GET',
			url: '/api/category/sub',
			data: {
				pId: this.data.pId
			}
		}).then((res) => {
			// 后台数据乱序，通过id进行二次处理排序
			var arr = res.data;
			arr.sort(function(a,b){
				let A = a.id;
				let B = b.id;
				return A - B;
			})
			this.setData({
				list_2: arr
			})
		})
	},
	changeHandle(e) {
		let id = e.target.dataset.id;
		this.setData({
			pId:id
		})
		this.geLevel_2();
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.geLevel_1(),
		this.geLevel_2()
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
