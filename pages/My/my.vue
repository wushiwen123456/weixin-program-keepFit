<template>
	<view>
		<view class="flex margin-top padding-lr-lg">
			<view class="my-avatar">
				<image :src="userInfo.avatarUrl || '/static/homeb.png' "></image>
			</view>
			<view class="flex flex-direction justify-around margin-left">
				<view @tap="userAutho" class="text-white text-lg">{{userInfo.nickName || '请授权'}}</view>
			</view>
		</view>
		<view v-if="!isUserAuthorize">
			<Authorize @isGetuserinfo="isGetuserinfo"/>
		</view>
		<view class="grid col-1 margin-top-lg">
			<view class="flex align-center justify-around margin-lr bg-black my-three-all">
				<view class="flex flex-direction align-center justify-center">
					<view class="text-three-all">{{userInfo.allMoney || 0}}</view>
					<view class="text-white text-xs"  >总金额</view>
				</view>
				<view class="flex flex-direction align-center justify-center">
					<view class="text-three-all">{{userInfo.use_money || 0}}</view>
					<view class="text-white text-xs">可用金额</view>
				</view>
				<view class="flex flex-direction align-center justify-center">
					<view class="text-three-all">{{avaliable}}</view>
					<view class="text-white text-xs">已用</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu sm-border card-menu margin-top" >
			<view @tap="appointmentClick" class="cu-item arrow" >
				<view class="content">
					<image src="/static/myb.png" class="png" mode="aspectFit"></image>
					<text class="text-white">预约记录</text>
				</view>
			</view>
			<view @tap="moneyDetailClick" class="cu-item arrow" >
				<view class="content">
					<image src="/static/myc.png" class="png" mode="aspectFit"></image>
					<text class="text-white">充值记录</text>
				</view>
			</view>
			<view class="cu-item arrow" >
				<view class="content">
					<image src="/static/myd.png" class="png" mode="aspectFit"></image>
					<text class="text-white">关于我们</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import login from '@/Api/login'
	// 导入vuex
	import {mapState} from 'vuex'
	export default{
		data (){
			return{

			}
		},
		onLoad() {
		
		},
		onShow() {
			console.log(this.isUserAuthorize)
			// uni.authorize({
			// 	scope:'scope.userInfo',
			// 	success:(res) => {
			// 		console.log(res)
			// 		this.$store.commit('setAuthorize',true)
			// 		login((obj) => {
			// 			this.$store.commit('setUserInfo',obj)
			// 			this.$store.commit('setAuthorize',true)
			// 		},getApp().globalData.cache_key)
			// 	},
			// 	fail:() => {
			// 		// this.$store.commit('setAuthorize',false)
			// 	}
			// })
			// if(this.isUserAuthorize)
			const res = this.$interceptor(this.userInfo.token)
			if(res){
				login((obj) => {
					this.$store.commit('setUserInfo',obj)
				},getApp().globalData.cache_key)
			}
		},
		methods:{
			// 用户点击授权按钮
			isGetuserinfo(res){
				uni.showLoading({
					title:'正在登录'
				})
				if(res.detail.errMsg == "getUserInfo:ok"){
					// 获取用户信息
					console.log('用户已授权')
					login((obj) => {
						this.$store.commit('setUserInfo',obj)
						this.$store.commit('setAuthorize',true)
						console.log(this.isUserAuthorize)
					},getApp().globalData.cache_key)
				}else{
					console.log(res)
					this.$store.commit('setAuthorize',true)
					uni.showToast({
						title:'授权失败:用户未授权',
						icon:'none'
					})
				}
			},
			
			//预约记录
			appointmentClick(){
				const res = this.$interceptor(this.userInfo.token)
				if(res){
					uni.navigateTo({
						url:'appointmentDetail/appointmentdetail'
					})
				}else{
					const key = getApp().globalData.cache_key
					if(key){
						this.$store.commit('setAuthorize',false)
					}else{
						uni.showToast({
							title:'请登录',
							icon:'none'
						})
					}
				}
			},
			//消费明细
			moneyDetailClick(){
				const res = this.$interceptor(this.userInfo.token)
				if(res){
					uni.navigateTo({
						url:'moneyDetail/moneydetail'
					})
				}else{
					const key = getApp().globalData.cache_key
					if(key){
						this.$store.commit('setAuthorize',false)
					}else{
						uni.showToast({
							title:'请登录',
							icon:'none'
						})
					}
				}
			},
			userAutho(){
				if(!this.userInfo.nickName){
					this.$store.commit('setAuthorize',false)
				}
			}
		},
		computed:{
			...mapState(['isUserAuthorize','userInfo']),
			avaliable(){this.userInfo
				return Object.keys(this.userInfo).length != 0 ? this.userInfo.allMoney - this.userInfo.use_money : 0
			}
		}
	}
</script>

<style>
	.my-phone-image{
		width:36upx;
		height:38upx;
	}
	.my-three-all{
		height: 174upx;
		border-radius: 20upx;
	}
	.text-three-all{
		background:linear-gradient(0deg,rgba(214,141,9,1) 0%, rgba(252,217,63,1) 100%);
		-webkit-background-clip:text;
		-webkit-text-fill-color:transparent;
		font-weight:bold;
		font-size:40upx;
		line-height:70upx;
	}
	.my-avatar{
		width: 80upx;
		height: 80upx;
	}
	.my-avatar image{
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
	.Authorize{
		background: transparent;
		font-size: 25upx;
		border: none;
		color: #FFFFFF;
	}
</style>
