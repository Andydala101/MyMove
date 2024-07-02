export default {
	config: {
		baseURL: "http://localhost:5000",
		beforeRequest(options = {}) {
			return new Promise((resolve, reject) => {
				// 公共参数处理
				options.url = options.externalURL ? options.externalURL + options.url : this.baseURL + options
					.url
				options.method = options.method || 'GET'
				// let token = uni.getStorageSync('token') ? uni.getStorageSync('token') : ''
				// if (token) {
				options.header = {
					// 设置默认token
					'Content-Type': 'application/x-www-form-urlencoded'
				}
				//}
				resolve(options)
			})
		},
		// 响应拦截器
		handleResponse([error, res]) {
			// 请求头有token 放入本地
			return new Promise((resolve, reject) => {
				if (res) {
					if (res.statusCode == 404) {
						uni.showToast({
							title: res.data.Message,
							icon: 'none'
						})
						uni.hideLoading()
						return
					}
					if (res.data.code == 1 && res.data.statusCode == 401) {
						uni.showToast({
							title: '请先登录',
							icon: 'none'
						})
						uni.reLaunch({
							url: "/pages/Login/Login"
						})
						uni.hideLoading()
						return
					}
					if (!res.data.Success) {
						resolve(res.data)
						uni.showToast({
							title: res.data.Message ? res.data.Message : '请求失败',
							icon: 'none'
						})
						uni.hideLoading()
						return;
					}
					// 成功返回
					if (res.data.Success) {
						resolve(res.data)
					}
				}
			})
		}
	},
	request(options = {}) {
		return this.config.beforeRequest(options).then(opt => uni.request(opt)).then(this.config.handleResponse)
	},
	get(url, params = null, options = {}, externalURL) {
		options.url = url
		options.url += params ? ('?' + Object.keys(params).map(key => key + '=' + params[key]).join('&')) : ''
		options.method = 'GET'
		return this.request(options)
	},
	put(url, params = null, options = {}) {
		options.url = url
		options.url += params ? ('?' + Object.keys(params).map(key => key + '=' + params[key]).join('&')) : ''
		options.method = 'PUT'
		return this.request(options)
	},
	post(url, data = {}, options = {}, externalURL) {
		if (data.token) {}
		options.url = url
		options.method = 'POST'
		options.data = data
		return this.request(options)
	},
	delete(url, data = {}, options = {}) {
		options.url = url
		options.method = 'DELETE'
		options.data = data
		return this.request(options)
	}
}
