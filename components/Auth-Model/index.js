// components/Auth-Model/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		// 父组件给子组件传递信息properties
		//组件的对外属性，是属性名到属性设置的映射表
		show: {
			type: 'Boolean',
			value: true
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},


	/**
	 * 组件的方法列表
	 */
	methods: {
		// 请求用户授权获取信息
		userInfoHandle(e) {
			// console.log(e);
			// 找到父组件的事件
			this.triggerEvent('getAuth', e.detail.userInfo);
		},
	}
})
