<template>
	<view>
		<swiper 
		class="screen-swiper" 
		:circular="true"
		:autoplay="true" 
		interval="5000" 
		duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.pic" mode="aspectFill" ></image>
			</swiper-item>
		</swiper>
		<view v-if="!isUserAuthorize">
			<Authorize @isGetuserinfo="isGetuserinfo"/>
		</view>
		<view class="tui-rolling-news">
			<view class="bg-black home-new-all">
				<text class="text-yellow">资讯 </text>
				<text class="text-white">公告</text>
			</view>
			
			<swiper 	
			vertical 
			autoplay 
			circular 
			interval="3000" 
			class="tui-swiper"
			disable-touch="true">
				<swiper-item v-for="(item,index) in newsList" :key="index" class="tui-swiper-item">
					<view class="tui-news-item">{{item}}</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="margin-lr">
			<view class="grid margin-bottom text-center col-2">
				<view>
					<view @tap="rechargeClick" class="flex flex-direction align-center justify-center padding-tb-xl bg-black home-four-all">
						<image class="home-all-image" src="/static/homea.png"></image>
						<view>在线充值</view>
					</view>
				</view>
				<view>
					<view @tap="appointmentClick" class="flex flex-direction align-center justify-center padding-tb-xl bg-black home-four-all margin-left-home">
						<image class="home-all-image" src="/static/homeb.png"></image>
						<view>预约场地</view>
					</view>
				</view>
				<view>
					<view @tap="trainClick" class="flex flex-direction align-center justify-center padding-tb-xl bg-black home-four-all">
						<image class="home-all-image" src="/static/homec.png"></image>
						<view>培训课程</view>
					</view>
				</view>
				<view>
					<view @tap="venueClick" class="flex flex-direction align-center justify-center padding-tb-xl bg-black home-four-all margin-left-home">
						<image class="home-all-image" src="/static/homed.png"></image>
						<view>场馆介绍</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {index_data,my_list} from '@/Api/NetWork.js'
	import login from '@/Api/login'
	import {openSeting} from '@/utils/openSet.js'
	// 导入替换路径的方法
	import { replaceImage } from '@/Api/dealUrl'
	// 导入vuex
	import {mapState} from 'vuex'
	export default {

		data() {
			return {
				swiperList: [],//首页轮播图
				newsList: [],//首页新闻公告
				data:{},
				// isUserAuthorize:false
			}
		},
		onLoad() {
			this.HomeBannerNew();
		},
		onShow() {

		},
		computed:{
			...mapState(['isUserAuthorize','userInfo'])
		},
		methods: {
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
			//首页轮播图和滚动新闻
			HomeBannerNew(){
				index_data().then(res=>{
					// this.swiperList = replaceImage(obj.data)
					const list = res.data
					// list.forEach((item) => {
					// 	item.pic =  item.pic
					// })
					this.swiperList = list
					let newList = []
					res.roll.forEach(function(item){
						newList.push(item.info)
					})
					this.newsList = newList
					const shareList = res.sharUrl.map(x =>  replaceImage(x.image))
					console.log(shareList)
					this.$store.commit('setShareImages',shareList)
				})
			},
			handleTap(){
				uni.openSetting({
				  success(res) {
				    console.log(res.authSetting)
				  },
				  fail(err) {
				  	console.log(err)
				  }
				});
			},
			// WXauthorize(){
			// //查看用户授权信息。
			// 	uni.getSetting({
			// 	   success:(res) => {
			// 		  const status = res.authSetting
			// 		  // 为true表示授权成功
			// 		  if(status['scope.userInfo']){
			// 			this.login()
			// 		  }else{
			// 			this.isUserAuthorize = true
			// 		  }
			// 	   }
			// 	})
				
			// },
			
			//在线充值
			rechargeClick(){
				const res = this.$interceptor(this.userInfo.token)
				if(res) {
					uni.navigateTo({
						url:'recharge/recharge'
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
				
				// 测试
				// uni.navigateTo({
				// 	url:'recharge/recharge'
				// })
			},
			//在线预约
			appointmentClick(){
				const res = this.$interceptor(this.userInfo.token)
				if(res) {
					uni.navigateTo({
						url:'appointment/appointment'
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
				
				
				// 测试
				// uni.navigateTo({
				// 	url:'appointment/appointment'
				// })
			},
			//培训课程
			trainClick(){
				// const res = this.$interceptor(this.userInfo.token)
				// if(res) {
					
				// }else{
				// 	uni.showToast({
				// 		title:'您还未进行登录'
				// 	})
				// }
				uni.navigateTo({
					url:'train/train'
				})
			},
			//场馆介绍
			venueClick(){
				// const res = this.$interceptor(this.userInfo.token)
				// if(res) {
				// }else{
				// 	uni.showToast({
				// 		title:'您还未进行登录'
				// 	})
				// }
					uni.navigateTo({
						url:'venue/venue'
					})
			},
		}
	}
</script>

<style>
	.home-four-all{
		border-radius: 20upx;
		margin: 0 20upx 20upx 0;
	}
	.home-four-all image{
		width: 114upx;
		height: 114upx;
		margin-bottom: 30upx;
	}
	.margin-left-home{
		margin-right: 0upx;
	}
	.home-new-all{
		width:136upx;
		height:52upx;
		line-height: 52upx;
		text-align: center;
		margin-right: 20upx;
		border-radius: 10upx;
		font-size: 30upx;
	}
	/* 滚动条 */
	.tui-rolling-news {
		width: 100%;
		padding: 12upx 30upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
	}
	.tui-swiper {
		font-size: 28upx;
		height: 50upx;
		flex: 1;
	}
	
	.tui-swiper-item {
		display: flex;
		align-items: center
	}
	
	.tui-news-item {
		line-height: 28upx;
		color: #FFFFFF;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	/* 滚动条end */
	
</style>
