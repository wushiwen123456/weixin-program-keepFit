<template>
	<section class="PullScroll-Page">
		<s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
			<view v-for="(vo,key) in list" :key="key" class="flex align-center justify-between margin-tb margin-lr padding-tb-sm">
				<view class="flex align-start">
					<view>
						<image class="moneydetail-image" src="/static/moneyc.png"></image>
					</view>
					<view class="margin-left-sm">
						<view class="text-white margin-bottom-xs text-three text-bold">{{vo.type == 0 ? '充值成功' : '消费金额'}}</view>
						<view class="text-xs">{{dealAddTime(vo.add_time)}}</view>
					</view>
				</view>
				<view class="moneydetail-money">{{vo.type == 0 ? '+' : '-'}}{{vo.money}}</view>
			</view>
		</s-pull-scroll>
	</section>
</template>

<script>
// 导入组件
import sPullScroll from '@/components/s-pull-scroll';
// 导入网络接口
import { myPurse } from '@/Api/NetWork'
// 导入方法
import { formatDate } from '@/Api/dealDate'
export default {
	components: {
		sPullScroll
	},
	data () {
		return {
			list: [],
			token:'',
			size:20
		};
	},
	methods: {
		refresh () {
		  this.$nextTick(() => {
			this.$refs.pullScroll.refresh();
		  });
		},
		pullDown (pullScroll) {
			console.log('123')
		  setTimeout(() => {
			this.loadData(pullScroll);
		  }, 200);
		},
		loadData (pullScroll) {
			console.log('123456')
		 //  setTimeout(() => {
			// if (pullScroll.page == 1) {
			//   this.list = [];
			// }
			// const curList = [];
			// for (let i = this.list.length; i < this.list.length + 20; i++) {
			//   curList.push(i);
			// }
			// this.list = this.list.concat(curList);
			// if (this.list.length > 60) {
			//   // finish(boolean:是否显示finishText,默认显示)
			//   pullScroll.finish(this.list.length > 5);
			// } else {
			//   pullScroll.success();
			// }
		 //  }, 500);
			// myPurse()
			if(this.token){
				myPurse(this.token,pullScroll.page,this.size).then(res => {
					console.log(res)
					const list = res.data
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
			}else{
				pullScroll.error()
			}
		},
		dealAddTime(time){
			if(time){
				return formatDate(new Date(time*1000),'yyyy-MM-dd hh:mm:ss')
			}else{	
				return ''
			}
		}
	},
	onLoad () {
		this.refresh();
		this.token = this.$store.state.userInfo.token
		
	}
};
</script>

<style>
	.moneydetail-image{
		height: 50upx;
		width: 50upx;
	}
	.moneydetail-money{
		background:linear-gradient(0deg,rgba(214,141,9,1) 0%, rgba(252,217,63,1) 100%);
		-webkit-background-clip:text;
		-webkit-text-fill-color:transparent;
		font-weight:bold;
		font-size:30upx;
	}
</style>