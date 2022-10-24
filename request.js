var url = "http://124.93.196.45:10001"

export const request = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url + options.url,
			method: options.method,
			data: options.data || {},
			header: {
				'Authorization': options.url == "/prod-api/api/login" || options.url ==
					"/prod-api/api/register" || options.url == "/prod-api/api/guide" ? "" : uni
					.getStorageSync(
						'token')
			},
			success: (res) => {
				if (res.data.code == 401) {
					uni.showModal({
						title: "提示",
						content: '登录已过期，请重新登录',
						success(res) {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					})
				}
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})

}
export const setip = (options) => {
	url = options.url
}
