
const http = (options) => {
	console.log(options)
	if(options.mask){
		uni.showLoading({
			title:'加载中...',
		})
	}
	return new Promise((resolve,reject) => {
		uni.request({
			method:options.method,
			url:options.url,
			data:options.data,
			header:options.header,
			success:(res) => {
				uni.hideLoading()
				if(res){
					console.log(res)
					if(res.data.code == 200){
						let data = res.data.data
						console.log('成功')
						resolve(data)
					}else{
						if(res.data.code == 402){
							uni.showToast({
								icon:'none',
								title:'登录已过期,请重新登录',
							})
						}else{
							// uni.showToast({
							// 	icon:'none',
							// 	title:'请检查返回状态码',
							// })
							console.log('失败1')
							reject(res)
						}
						
					}
					
				}else{
					uni.hideLoading()
					// #ifdef APP-PLUS
					plus.nativeUI.toast('连接服务器失败',{duration:'long'})
					// #endif
					console.log('失败2')
					reject(res)
				}
				
			},
			fail:(err) => {
				console.log('失败3')
				reject(err)
			},
			complete:() => {
				if(options.mask){uni.hideLoading()}
			}
		})
	})
}
export default http