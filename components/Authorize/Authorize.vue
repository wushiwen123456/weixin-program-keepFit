<template>
	<view class="body">
		<!-- <button open-type="getUserInfo" @getuserinfo="isGetuserinfo" class="shouquan" >去授权</button> -->
		<view class="shou_box">
			<image src="~@/static/logo.jpg" class="shou_logo" ></image>
			<view class="shou_text">
				<view class="text_title">授权提醒</view>
				<view class="text_main">请授权头像等信息，以便为您提供更好的服务</view>
			</view>
			<button open-type="getUserInfo" @getuserinfo="isGetuserinfo" class="shou_footer" >去授权</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isGetuserinfo(result){
					this.$emit('isGetuserinfo',result)
				}
			};
		}
	}
</script>

<style lang="less" scoped>
.body{
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 0;
	background: rgba(0,0,0,.8);
	z-index: 9999;
	display: flex;
	justify-content: center;
	align-items: center;
	.shou_box{
		font-size: 28upx;
		color: #333333;
		width: 500upx;
		height: 300upx;
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: center;
		.shou_logo{
			width: 120upx;
			height: 120upx;
			position: relative;
			transform: translateY(-50%);
			border-radius: 10px;
		}
		.shou_text{
			transform: translateY(-50%);
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-align: center;
			font-family: 'SimHei';
			.text_title{
				padding: 15upx 0;
			}
			.text_main{
				font-size: 24upx;
				color: #666666;
			}
		}
		.shou_footer{
			height: 80upx;
			width: 100%;
			border: none;
			display: flex;
			justify-content: center;
			align-items: center;
			background:#3c7a03;
			color: #FFFFFF;
			border-radius: 0;
			font-size: 28upx;
		}
	}
}
</style>
