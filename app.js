//app.js
// 获取应用实例
// const app = getApp();
App({
	onLaunch: function() {
		// 登录
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				// 请求ajax
				this.ajax({
					// 传参
					method: "POST",
					url: '/api/user/token',
					data: {
						// 传参code
						code: res.code
					}
				}).then(function(res) {
					wx.setStorageSync('token', res.token)
				});

			}
		})
		// 获取用户信息
		// wx.getSetting({
		
			// 			success: res => {
			// 				if (res.authSetting['scope.userInfo']) {
			// 					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
			// 					wx.getUserInfo({
			// 						success: res => {
			// 							// 可以将 res 发送给后台解码出 unionId
			// 							this.globalData.userInfo = res.userInfo
			// 
			// 							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 							// 所以此处加入 callback 以防止这种情况
			// 							if (this.userInfoReadyCallback) {
			// 								this.userInfoReadyCallback(res)
			// 							}
			// 						}
			// 					})
			// 				}
			// 			}
		// })
	},
	// 全局数据
	globalData: {
		userInfo: null,
		//存服务器域名地址
		url: 'http://localhost:3000',
		isAuth: '',
	},
	// model:{method,url,data,config}
	ajax(model) {
		// 默认header ticket、token、params参数是每次请求需要携带的认证信息
		let token = wx.getStorageSync('token');
		token = token ? `Bearer ${token}` : '';
		let headerConfig = {
			Authorization: token,
			'content-type': 'application/x-www-form-urlencoded'
		};
		wx.showLoading({
			title: '加载中',
		})
		// method默认
		model.method = model.method || "POST";
		//拼接url
		model.url = this.globalData.url + model.url;
		//返回Promise对象
		return new Promise(function(resolve) {
			wx.request({
				method: model.method,
				url: model.url,
				data: model.data,
				//合并传递进来的配置
				header: Object.assign({}, headerConfig, model.config),
				success: (res) => {
					wx.hideLoading();
					if (res.statusCode == 200) {
						resolve(res.data);
					} else {
						//错误信息处理
						wx.showModal({
							title: '提示',
							content: '服务器错误，请联系客服',
							showCancel: false,
						})
					}
				}
			})
		})
	},

})
