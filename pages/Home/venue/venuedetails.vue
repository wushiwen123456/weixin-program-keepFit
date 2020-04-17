<template>
	<view>
		<block>
			<image class="venue-image" :src="areasDetailAs.image" mode="widthFix"></image>
			<view class="margin-lr">
				<view class="text-white text-bold text-three">{{areasDetailAs.title}}</view>
				<view class="flex align-center margin-top-sm">
					<image class="venue-image-time margin-right-sm" src="/static/mytime.png"></image>
					<view>am {{areasDetailAs.start_time}}:00-pm {{areasDetailAs.end_time}}:00</view>
				</view>
				<view class="flex align-center padding-tb-sm">
					<view class=" train-center-all margin-right-sm"></view>
					<view class="text-white text-bold text-three">场馆介绍</view>
				</view>
				<block  v-if="areasDetailAs.content">
					<parser :html="areasDetailAs.content"></parser>
				</block>
			</view>
		</block>
	</view>
</template>

<script>
	import {areasDetail} from '@/Api/NetWork'
	import parser from '@/components/jyf-Parser/index'
	export default{
		data(){
			return{
				areasDetailAs:{},
			}
		},
		components:{
			parser
		},
		onLoad(e){
			const id = e.type
			this.areasDetail(id)
		},
		methods:{
			areasDetail(id){
				areasDetail(id).then(res => {
					this.areasDetailAs = res
					console.log(res)
				})
				
			}
		}
	}
</script>

<style>
	.venue-image{
		width: 100%;
	}
	.train-center-all{
		width:12upx;
		height:28upx;
		background:linear-gradient(0deg,rgba(214,141,9,1),rgba(252,217,63,1));
		border:0px solid rgba(82,82,80,1);
		border-radius:6upx;
	}
	.venue-image-time{
		width: 40upx;
		height: 40upx;
	}
</style>
