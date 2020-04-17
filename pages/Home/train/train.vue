<template>
	<view class="margin-lr-sm">
		<block v-if="noData">
			<block v-for="(vo,key) in list" :key="key">
				<view class="bg-black padding-tb-xl padding-lr-xl margin-top-sm">
					<view class="flex justify-between align-center">
						<view class="flex align-center">
							<view>
								<image class="train-image" mode="aspectFit" src="/static/mytime.png"></image>
							</view>
							<view class="flex">
								<text class="margin-right">{{vo.start_time}}-{{vo.end_time}}</text>
							</view>
						</view>
						<view class="flex align-center">
							<view>
								<image class="train-image" mode="aspectFit" src="/static/homed2.png"></image>
							</view>
							<view>{{vo.address_id}}号场地</view>
						</view>
					</view>
					
					<view class="flex align-center padding-tb-sm">
						<view class=" train-center-all margin-right-sm"></view>
						<view class="text-white text-bold text-three">课程介绍</view>
					</view>
					<view style="line-height: 44upx;" class="text-df">{{vo.notice || '暂无数据'}}</view>
				</view>
				
			</block>
		</block>
		<view v-else class="noData">
			暂无数据
		</view>
	</view>
</template>

<script>
	import {course_list} from '@/Api/NetWork.js'
	export default{
		data(){
			return{
				list:[],
				noData:false
			}
		},
		onLoad() {
			course_list().then(res =>{
				this.list = res
				if(this.list.length != 0) this.noData = true
			})
		},
		methods:{
			
			
		}
	}
</script>

<style>
	.train-image{
		width: 30upx;
		height: 30upx;
		margin-right: 12upx;
	}
	.train-center-all{
		width:12upx;
		height:28upx;
		background:linear-gradient(0deg,rgba(214,141,9,1),rgba(252,217,63,1));
		border:0px solid rgba(82,82,80,1);
		border-radius:6upx;
	}
	.noData{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
