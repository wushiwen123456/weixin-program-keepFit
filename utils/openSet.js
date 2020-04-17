//授权询问
export function openSeting(){
	uni.getSetting({
		success(res) {
			console.log(res.authSetting)
		},
		fail(e) {
			console.log('获取用户是否授权失败')
			console.log(e)
		}
	});
}