<template>
	<section class="PullScroll-Page">
		<s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
			<view class="showBox" v-for="(item,index) in list" :key="item.id">
				<view class="flex align-center padding-tb-sm">
					<view class=" train-center-all margin-right-sm"></view>
					<view class="text-white text-bold text-three">{{item.title}}</view>
				</view>
				<image @tap="venueClicik(item,index)" class="venue-image" :src="item.image" mode=""></image>
<!-- 				<view class="flex align-center padding-tb-sm">
					<view class=" train-center-all margin-right-sm"></view>
					<view class="text-white text-bold text-three">业务展示</view>
				</view>
				<image @tap="venueClicik(2)" class="venue-image" src="/static/eventb.png" mode=""></image>
				<view class="flex align-center padding-tb-sm">
					<view class=" train-center-all margin-right-sm"></view>
					<view class="text-white text-bold text-three">健身场地</view>
				</view>
				<image @tap="venueClicik(3)" class="venue-image" src="/static/eventc.png" mode=""></image> -->
			</view>
		</s-pull-scroll>
	</section>
</template>

<script>
	import {areasList} from '@/Api/NetWork'
	import sPullScroll from '@/components/s-pull-scroll';
	
	export default{
		components:{
			sPullScroll
		},
		data(){
			return{
				list:[],
				size:10
			}
		},
		onLoad() {
			this.refresh();
		},
		methods:{
			refresh () {
			  this.$nextTick(() => {
				this.$refs.pullScroll.refresh();
			  });
			},
			pullDown (pullScroll) {
			  setTimeout(() => {
				this.getAreaList(pullScroll);
			  }, 200);
			},
			
			getAreaList(pullScroll){
				areasList(pullScroll.page,this.size).then(res => {
					console.log(res)
					let list = res.data
					list.forEach(x => {
						
					})
					if(pullScroll.page == 1) this.list = []
					if(pullScroll.page == 1 && list.length == 0){
						pullScroll.empty(); 
					}
					this.list = this.list.concat(list)
					if(list.length < this.size){
						pullScroll.finish(this.list.length > 5)
					}else{
						pullScroll.success()
					}
					
					
				})
			},
			venueClicik(item,index){
				console.log(item)
				uni.navigateTo({
					url:'venuedetails?type=' + item.id
				})
			},
		}
	}
</script>

<style scoped>
	.train-center-all{
		width:12upx;
		height:28upx;
		background:linear-gradient(0deg,rgba(214,141,9,1),rgba(252,217,63,1));
		border:0px solid rgba(82,82,80,1);
		border-radius:6upx;
	}
	.venue-image{
		width: 100%;
		height: 260upx;
	}
	.showBox{
		box-sizing: border-box;
		padding: 0 30rpx;
	}
</style>
