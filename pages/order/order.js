const app = getApp();
// pages/order/order.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		date: '请选择配送时间',
		startDate: '',
		endData: '',
		list: [],
		good: '',
		totalNum: 0,
		totalPrice: 0,
		goodsList: '',
		switchFlag: false
	},
	getArrId(options) {
		let idArr = options.idArr;
		idArr = idArr.split(',');
		idArr = idArr.map(Number)
		console.log(idArr);
		app.ajax({
			method: 'POST',
			url: '/api/order/settle',
			data: {
				goods: idArr
			},
			config: {
				'content-type': 'application/json'
			}
		}).then((res) => {
			if (res.status) {
				console.log(res)
				let arr = []
				arr.push(res.data.address)
				this.setData({
					list: arr,
					good: res.data.goods
				})
				this.contTotal();
				console.log(res)
			}

		})
	},
	// 计算总价
	contTotal() {
		// 计算总价、总数量
		let good = this.data.good;
		let totalPrice = 0;
		let totalNum = 0;
		let goodsArr = [];
		for (let i = 0; i < good.length; i++) {
			// 所有价格加起来 count_money
			totalPrice += good[i].goods_num * good[i].price;
			totalNum += good[i].goods_num;
			let goodsObj = {};
			// 生成goodsList
			goodsObj.id = good[i].id;
			goodsObj.num = good[i].goods_num;
			goodsArr.push(goodsObj);
		}
		this.setData({
			totalNum: totalNum,
			totalPrice: totalPrice,
			goodsList: goodsArr
		})
	},

	getData() {
		// 把当前时间赋值给开始时间
		let d = new Date();
		let year = d.getFullYear();
		let mouth = d.getMonth() + 1;
		console.log(mouth);
		let day = d.getDate();
		let startDay = day + 1
		let currenTime = year + '-' + mouth + '-' + startDay;
		// 暂定最多预约15天
		let endTime = day + 15
		endTime = year + '-' + mouth + '-' + endTime;
		console.log(endTime);
		this.setData({
			startDate: currenTime,
			endData: endTime
		})
	},
	bindDateChange: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date: e.detail.value
		})
	},
	// 提交订单
	createHandle() {
		let payment = this.data.totalPrice.toFixed(2);
		payment = Number(payment);
		let addressId = this.data.list[0].id;
		app.ajax({
			method: 'POST',
			url: '/api/order/create',
			data: {
				payment: payment,
				addressId: addressId,
				goodsList: this.data.goodsList
			},
			config: {
				'content-type': 'application/json'
			}
		}).then((res) => {
			if (res.status) {
				wx.showToast({
					title: '进入付款页面',
					icon: 'success',
					duration: 1500,
					success: () => {
						setTimeout(() => {
							wx.navigateTo({
								url: '/pages/allOrders/orders?current=1'
							})

						}, 1500);
					},
				})
			}
		})
	},
	switchHandle() {
		let flag = this.data.switchFlag
		flag = !flag;
		this.setData({
			switchFlag: flag
		})
	},
	pagesHandle() {
		let id = this.data.list[0].id;
		wx.navigateTo({
			url: '/pages/editeAddress/edite?key=key&id=' + id
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getArrId(options);
		this.getData();
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
