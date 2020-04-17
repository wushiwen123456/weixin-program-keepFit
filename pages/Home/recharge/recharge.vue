<template>
	<view class="margin-lr margin-top-xl">
		<view class="grid margin-bottom text-center col-2">
			<view @tap="rechargeClick(vo,key)" v-for="(vo,key) in list " :key="key" class="recharge-all-money">
				<view :class="{'select-button' : currentIndex == key}" class="recharge-button-all ">充{{vo.money}}元送{{vo.give_money}}元</view>
			</view>
		</view>
		<view style="height: 400upx;"></view>
		<view class="margin-top margin-bottom-xl">
			<view class="text-white text-lg">充值须知</view>
			<view class="text-erliu recharge-text">平台充值后，到店铺消费即可使用购买的教学课程，在APP上充值成功后，不能退款、提现或转赠他人。如有问题，致电咨询：0371-60157017</view>
		</view>
		<view @tap="recharge" class="recharge-bottom-all">立即充值</view>
	</view>
</template>
<script>
import {rechargeOnline,goPay} from '@/Api/NetWork'
	export default{
		data(){
			return{
				list:[],
				currentIndex:0,
				token:''
			}
		},
		onLoad() {
			this.token = this.$store.state.userInfo.token
			rechargeOnline().then(res => {
				// this.list = res
				const list = res
				list.forEach((item,index) => {
					if(index == 0){
						item.type = true
					}else{
						item.type == false
					}
				})	
				this.list = list
				console.log(list)
			})
		},
		methods:{
			//立即充值
			recharge(){
				// var thta = this 
				// uni.showLoading({
				// 	title:'加载中...',
				// })
				// setTimeout(function(){
				// 	uni.hideLoading()
				// 	uni.reLaunch({
				// 		url:'../succeed/succeed?id=0'
				// 	})
				// },1500)
				if(this.token){
					// 发起微信支付
					const id = this.list[this.currentIndex].id
					goPay(this.token,id)
						.catch(err => {
							uni.showToast({
								title:'支付失败',
								icon:'none'
							})
						})
						.then(res => {
							// 拿到请求对象
							let data = res
							// console.log(typeof(data.timeStamp))
							data.timeStamp = data.timeStamp.toString()
							console.log(data)
							// 发起微信支付
							// uni.requestPayment({
							// 	timeStamp:data.timestamp.toString(),
							// 	nonceStr:data.nonceStr,
							// 	package:'prepay_id=' + data.package,
							// 	signType:data.signType,
							// 	paySign:data.paySign,
							// 	provider:'wxpay',
							// 	orderInfo:data,
							// 	appId:data.appId,
							// 	// _debug:1,
							// 	// service:1,
							// 	success:(res) => {
							// 		// 接口调用成功
							// 		console.log(res)
							// 	},
							// 	fail:(err) => {
							// 		console.log(err)
							// 		// 接口调用失败
							// 	}
								
							// })
							// #ifdef MP-WEIXIN
							// 发起微信支付
							uni.requestPayment({
								provider:'wxpay',
								orderInfo:data,
								nonceStr:data.nonceStr,
								package:data.package,
								paySign:data.paySign,
								signType:data.signType,
								timeStamp:data.timeStamp,
								_debug:1,
								service:1,
								success:(res) => {
									// 接口调用成功
									console.log(res)
									if(res.errMsg == 'requestPayment:ok'){
										uni.redirectTo({
											url:'../succeed/succeed?id=0'
										})
									}
								},
								fail:(err) => {
									// 接口调用失败	
									console.log(err)
								}
							})
							// #endif
							
							
						})
						
				}else{
					uni.showToast({
						title:'登陆未授权',
						icon:'none'
					})
				}
			},
			//选择金额
			rechargeClick(type,key){
				this.currentIndex = key
			}
		}
	}
</script>

<style>
	.recharge-button-all{
		margin-bottom: 30upx;
		height: 140upx;
		width: 96%;
		color: #FFFFFF;
		font-weight: bold;
		font-size: 32upx;
		line-height: 140upx;
		border:1px solid rgba(252,217,63,1);
		border-radius:20upx;
	}
	.select-button{
		background-color: #FCD619;
		color: #000000;
	}
	.recharge-text{
		line-height: 48upx;
	}
	.recharge-bottom-all{
		width:100%;
		height:88upx;
		line-height: 88upx;
		text-align: center;
		font-weight: bold;
		background:rgba(252,214,25,1);
		border-radius:9upx;
		font-size:32upx;
		color:rgba(0,0,0,1);
	}
	.recharge-all-money{
		
	}
	.recharge-all-money:nth-child(2n){
		display: flex;
		justify-content: flex-end;
	}
</style>
