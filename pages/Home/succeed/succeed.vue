<template>
	<view :style="{height: windowHeight + 'px' }" class="flex flex-direction align-center justify-around">
		<view class="flex flex-direction align-center">
			<view>
				<image class="succeed-image" src="../../../static/succness_pay.png"></image>
			</view>
			<view v-if="type == 0">
				<view class="text-white text-xxl">支付成功</view>
			</view>
			<view v-else class="text-lg">
				<view class="margin-bottom-sm" v-for="(item,index) in orderInfo" :key="index">
					<text class="text-white">已为您预约</text>
					<text class="text-yellow margin-left-sm">羽毛球{{item.address_id}}号场地({{item.start_time + ':00'}}-{{item.end_time + ':00'}}场)</text>
				</view>
<!-- 				<view>
					<text class="text-white">请于</text>
					<text class="text-yellow margin-lr-sm ">2020-01-03 9:00</text>
					<text class="text-white">前到店</text>
				</view> -->
				<view class="text-center">
									<text class="text-white">请在</text>
									<text class="text-yellow margin-lr-sm ">我的-预约记录</text>
									<text class="text-white">中查看详情</text>
				</view> 
			</view>
		</view>
		<view @tap="succeedClick" class="button-succeed">{{backButton}}</view>
		
	</view>
</template>

<script>
	import {formatDate} from '@/Api/dealDate.js'
	export default{
		data(){
			return{
				type:-1,//0支付成功  1预约成功
				windowHeight:0,//屏幕高度
				orderInfo:[]
			}
		},
		onLoad(e){
			console.log(e)
			var that = this
			that.type = e.id
			if(that.type == 0){
				uni.setNavigationBarTitle({
					title:'支付成功'
				})
			}else{
				uni.setNavigationBarTitle({
					title:'预约成功'
				})
			}	
			
			uni.getSystemInfo({
			    success: function (res) {
					that.windowHeight = res.windowHeight
					
			    }
			});
			// 获取全局变量order
			this.orderInfo = getApp().globalData.orderInfo
			console.log(this.orderInfo)
		},
		computed:{
			backButton(){
				return this.type == 0 ? '返回个人中心' : '查看预约记录'
			}
		},
		methods:{
			succeedClick(){
				if(this.type == 0){
					uni.switchTab({
						url:'../../My/my'
					})
				}else{
					uni.redirectTo({
						url:'../../My/appointmentDetail/appointmentdetail'
					})
				}
			},
		}
	}
</script>

<style>
	.succeed-image{
		width: 112upx;
		height: 112upx;
		margin-bottom: 80upx;
	}
	.button-succeed{
		width:360upx;
		height:88upx;
		line-height: 88upx;
		text-align: center;
		font-weight: bold;
		background:rgba(252,214,25,1);
		border-radius:44upx;
		font-size:32upx;
		color: #000000;
	}
</style>
