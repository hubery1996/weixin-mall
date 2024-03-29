let app = getApp();
// images/adress/adress.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		multiIndex: [0, 0, 0],
		region: ['请选择：省', '市', '区'],
		customItem: '请选择',
		formData: {
			id: '',
			name: '',
			tel: '',
			province: '',
			city: '',
			area: '',
			street: '',
			code: '',
			isDefault: 1,

		},
		key: true
	},
	bindRegionChange(e) {
		let region = e.detail.value;
		this.setData({
			region,
			'formData.province': region[0],
			'formData.city': region[1],
			'formData.area': region[2],
		})
	},
	nameInput(e) {
		this.setData({
			'formData.name': e.detail.value
		})
		this.setPrev()
	},
	telInput(e) {
		this.setData({
			'formData.tel': e.detail.value
		})
		this.setPrev()
	},
	codeInput(e) {
		this.setData({
			'formData.code': e.detail.value
		})
		this.setPrev()
	},
	streetInput(e) {
		this.setData({
			'formData.street': e.detail.value
		})
		this.setPrev()
	},
	checkboxChange(e) {
		let flag = e.detail.value.length;
		console.log(flag)
		this.setData({
			'formData.isDefault': flag
		})
		this.setPrev()
	},
	saveHandle() {
		app.ajax({
			method: 'POST',
			url: '/api/address/update',
			data: { ...this.data.formData
			}
		}).then((res) => {
			if (res.status) {
				wx.showToast({
					title: res.msg,
					success() {
						setTimeout(() => {
							wx.redirectTo({
								url: '../IPAM/IPAM'
							})
						}, 1500);
					}
				});
			}
		})
	},
	setPrev() {
		let pages = getCurrentPages();
		let currPage = null; //当前页面
		let prevPage = null; //上一个页面

		if (pages.length >= 2) {
			currPage = pages[pages.length - 1]; //当前页面
			prevPage = pages[pages.length - 2]; //上一个页面
		}
		let formData = this.data.formData;
		console.log(formData);
		if (prevPage) {
			prevPage.setData({
				'list[0]': formData
			});
			app.ajax({
				method: 'POST',
				url: '/api/address/update',
				data: { ...this.data.formData
				}
			}).then((res) => {
				if (res.status) {
					console.log('已实时保存')
				}
			})

		}
	},
	savePrev() {

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// 参数key从订单页传过来，以控制编辑保存按钮的隐藏
		if (options.key) {
			let key = options.key;
			let flagKey = !this.data.key;
			this.setData({
				key: flagKey
			})
		}
		let id = options.id;
		app.ajax({
			method: 'GET',
			url: '/api/address/detail',
			data: {
				id
			}
		}).then((res) => {
			console.log(res)
			this.setData({
				formData: { ...res.data
				},
				'region[0]': res.data.province,
				'region[1]': res.data.city,
				'region[2]': res.data.area
			})

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
	onShow: function() {},

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
