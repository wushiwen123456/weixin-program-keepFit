<script>
	import login from '@/Api/login'
	import { setCode,login_index,share }	from '@/Api/NetWork.js'
	import {replaceImage} from '@/Api/dealUrl'
	
	export default {
		globalData: {  
			ApiUrl: 'https://sport.51kdd.com/ebapi',
			// ApiUrl: 'http://192.168.0.102/ebapi',
			cache_key:'',
			orderInfo:[]
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '自定义分享标题',
		      path: '/pages/home/home'
		    }
		 },
		onLaunch() {
			var that = this
			// 获取code
			uni.login({
				success:(res) => {
					let data = {
						code:res.code
					}
					// 获取cache_key
					setCode(data)
						.catch(err => {
							uni.showToast({
								title:'获取cache_key失败',
								icon:'none'
							})
						})
						.then( (res) => {
							console.log('获取cache_key成功')
							getApp().globalData.cache_key = res.cache_key
								uni.getSetting({
								   success:(res) => {
									  const status = res.authSetting
									  // 为true表示用户已授权，为false表示用户未授权
									  if(status['scope.userInfo']){
										// this.login()
										console.log('用户已授权')
										
										
										// 获取用户信息
										login((obj) => {
											that.$store.commit('setUserInfo',obj)
											that.$store.commit('setAuthorize',true)
											// uni.showToast({
											// 	title:'登录成功',
											// 	icon:'none'
											// })
										},getApp().globalData.cache_key)
											
									  }else{
										console.log('用户未授权')
										// that.$store.commit('setAuthorize',false)
									  }
								   }
								})
							})
							.catch(err => {
								console.log(err + '获取cache_key失败')
								uni.showToast({
									title:'登陆失败',
									icon:'none'
								})
							})
							
						
				},
				fail:(err) => {
					console.log(err + '。。。获取code失败')
					uni.showToast({
						title:'登陆失败',
						icon:"none"
					})
				}
			})
		},
		onShow: function() {

		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/animation.css"
</style>
