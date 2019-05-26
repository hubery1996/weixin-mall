const app = getApp();
// pages/detail/detail.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgUrls: [],
		indicatorDots: true,
		autoplay: false,
		interval: 5000,
		duration: 1000,
		list: [],
		gid: '',
		num: 1,
		cartNumIcon: '',
		goodsNum: ''
	},
	addCartHandle() {
		app.ajax({
			method: 'POST',
			url: '/api/cart/add',
			data: {
				gid: this.data.gid,
				num: this.data.num
			}
		}).then((res) => {
			if (res.status) {
				wx.showToast({
					title: '加入购物车成功',
					icon: 'success',
					duration: 1500,
					success: () => {
						setTimeout(() => {
							this.cartNum();
						}, 1500);
					},


				})
			}
		})
	},
	// 获取购物车里商品数量，显示到图标上
	cartNum() {
		app.ajax({
			method: 'GET',
			url: '/api/cart'
		}).then((res) => {
			if (res.status) {
				var num = 0;
				for (let i = 0; i < res.data.length; i++) {
					num += res.data[i].goods_num;
				}
				this.setData({
					cartNumIcon: num
				})
			}

		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let id = options.id;
		console.log(id)
		app.ajax({
			method: 'GET',
			url: '/api/goods/detail',
			data: {
				id: id
			}
		}).then((res) => {
			console.log(res)
			let str = res.data.slider.split(',');
			console.log(str)
			this.setData({
				list: res.data,
				imgUrls: str,
				gid: id
			})
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		this.cartNum();
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
