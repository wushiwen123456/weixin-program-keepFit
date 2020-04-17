import { login_index }	from '@/Api/NetWork.js'
export default function(fn,cache_key){
				console.log(cache_key)
				uni.getUserInfo({
					provider: 'weixin',
						success:(infoRes) => {
						// 设置全局属性userInfo
						let obj
						obj = {...infoRes.userInfo}
						let datas = {
							cache_key:cache_key,
							code:0,	
							encryptedData:infoRes.encryptedData,
							iv:infoRes.iv,
							spid:0
						}
						login_index(datas)
						.then(res =>{
							obj.token = res.token
							obj.allMoney = res.all_money
							obj.use_money = res.use_money
							console.log(obj)
							fn(obj)
							uni.hideLoading()
						})
						.catch(err => {
							uni.showToast({
								title:'连接失败',
								icon:'none'
							})
							uni.hideLoading()
						})
					},
					fail:(err) => {
						return fn(err)
						uni.hideLoading()
					}
				});
			}