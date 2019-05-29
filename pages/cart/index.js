const app = getApp();
// pages/cart/index.js
Page({
	data: {
		swiper: {
			info: []
		},
		indicatorDots: false,
		autoplay: false,
		interval: 5000,
		duration: 1000,
		list: '',
		totalPrice: 0,
		totalNum: 0,
		idArr: [],
		pageindex: 4

	},
	// 获取购物车里商品数量，显示到图标上
	cartNum() {
		app.ajax({
			method: 'GET',
			url: '/api/cart'
		}).then((res) => {
			if (res.status) {
				for (var i = 0; i < res.data.length; i++) {
					res.data[i].checked = false
				}
				this.setData({
					list: res.data,
				})
			}
		})
	},
	// 获取推荐的商品，显示到页面
	getReferral(e) {
		// 点击标题切换轮播图内容通过ajax,get数据
		if (e) {
			let pageindex = e.target.dataset.pageindex;
			pageindex = Number(pageindex)
			this.setData({
				pageindex: pageindex,
			})
		};
		app.ajax({
			method: 'GET',
			url: '/api/goods',
			data: {
				pageSize: 8,
				pageIndex: this.data.pageindex
			}
		}).then((res) => {
			this.setData({
				'swiper.info': res.data
			})
		})
	},
	// 添加推荐的商品到购物车中
	referralHamdle(e) {
		let id = e.currentTarget.dataset.id;
		let i = e.currentTarget.dataset.index;
		app.ajax({
			method: 'POST',
			url: '/api/cart/add',
			data: {
				gid: id,
				num: 1
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
	// 减
	decrease(e) {
		let i = e.target.dataset.index;
		if (this.data.list[i].goods_num > 1) {
			let goods_num = this.data.list[i].goods_num;
			app.ajax({
				method: 'POST',
				url: '/api/cart/decrease',
				data: {
					id: e.target.dataset.id,
					num: 1
				}
			}).then((res) => {
				if (res.status) {
					let list = [...this.data.list];
					list[i].goods_num = goods_num - 1
					this.setData({
						list: list
					})
					this.contTotal();
				}
			})
		}

	},
	// 加
	increase(e) {
		let i = e.target.dataset.index;
		let goods_num = this.data.list[i].goods_num;
		console.log(e)
		app.ajax({
			method: 'POST',
			url: '/api/cart/increase',
			data: {
				id: e.target.dataset.id,
				gid: e.target.dataset.gid,
				num: 1
			}
		}).then((res) => {
			if (res.status) {
				let list = [...this.data.list];
				list[i].goods_num = goods_num + 1
				this.setData({
					list: list
				})
				this.contTotal();
			}
		})
	},
	// 删除
	delete(id, i) {

		app.ajax({
			method: 'POST',
			url: '/api/cart/delete',
			data: {
				id: id
			}
		}).then((res) => {
			if (res.status) {
				let list = [...this.data.list];
				list.splice(i, 1)
				this.setData({
					list: list
				})
				this.contTotal();
			}
		})
	},
	// 删除模态框和状态框
	deleteModal(e) {
		let i = e.currentTarget.dataset.index;
		console.log(i)
		let id = e.currentTarget.dataset.id;
		wx.showModal({
			content: '确定删除此商品吗？',
			success: (res) => {
				if (res.confirm) {
					wx.showToast({
						title: '删除成功',
						icon: 'success',
						duration: 1500,
						success: () => {
							setTimeout(() => {
								this.delete(id, i);
							}, 1500);
						}
					})
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	// 计算总价
	contTotal() {
		// 计算总价、总数量
		let list = this.data.list;
		let totalPrice = 0;
		let totalNum = 0;
		for (let i = 0; i < list.length; i++) {
			if (list[i].checked) {
				// 所有价格加起来 count_money
				totalPrice += list[i].goods_num * list[i].price;
				totalNum += list[i].goods_num
			}
		}
		this.setData({
			totalNum: totalNum,
			totalPrice: totalPrice
		})
	},
	// 选择
	checkboxChange(e) {
		let value = e.detail.value;
		let i = e.target.dataset.index;
		let list = [...this.data.list];
		list[i].checked = !this.data.list[i].checked;
		this.setData({
			list
		})
		this.contTotal()
	},
	// 提交订单
	payHandle(e) {
		let idArr = [];
		let list = [...this.data.list]
		for (let i = 0; i < list.length; i++) {
			if (list[i].checked) {
				idArr.push(list[i].goods_id);
			}
		}
		this.setData({
			idArr
		})
		wx.navigateTo({
			url: '../order/order?idArr=' + idArr
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// 获取购物车商品
		this.cartNum();
		// 获取推荐商品（暂时调用了获取商品列表接口）
		this.getReferral();
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
