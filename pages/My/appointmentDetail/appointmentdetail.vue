<template>
	<section class="PullScroll-Page">
		<s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
			<view v-for="(vo,key) in list" :key="key">
				<view class="flex align-center bg-black padding-lr padding-tb-sm margin-tb-sm appointment-onebg">
					
					<view class="margin-right">
						<image class="appointment-image" mode="bottom" src="/static/moneya.png"></image>
					</view>
					<view class="appointment-text-all">
						<view class="text-white text-three">羽毛球{{vo.address_id}}号馆</view>
						<view class="text-erliu">预约日期：{{vo.payTime}}</view>
						<view class="text-erliu">
							预约时间：{{vo.start_time + ':00'}} - {{vo.end_time + ':00'}}
						</view>
						<view class="text-erliu">预约人数：{{vo.people_num}}人</view>
						<view class="text-erliu">订单编号：{{vo.order_id}}</view>
					</view>
					
					
				</view>
			</view>
		</s-pull-scroll>
	</section>
</template>

<script>
import sPullScroll from '@/components/s-pull-scroll';

// 导入接口
import {myAppointmentList} from '@/Api/NetWork'

// 导入时间戳方法
import { formatDate } from '@/Api/dealDate'
export default {
	components: {
		sPullScroll
	},
	data () {
		return {
			list: [],
			token:'',
			size:10
		};
	},
	onLoad () {
		this.token = this.$store.state.userInfo.token
		this.refresh();
		// this.MyAppointmentList()
	},
	methods: {
		refresh () {
		  this.$nextTick(() => {
			this.$refs.pullScroll.refresh();
		  });
		},
		pullDown (pullScroll) {
		  setTimeout(() => {
			this.loadData(pullScroll);
		  }, 200);
		},
		loadData (pullScroll) {
			if(this.token){
				
				myAppointmentList(this.token,pullScroll.page,this.size).then(res => {
					console.log(res)
					let list = res.data
					list.forEach(x => {
						// x.payTime = formatDate(new Date(x.add_time).getTime()*1000,'yyyy-MM-dd')
						// // console.log(new Date(add_time))
						// console.log(x.add_time)
						x.payTime = formatDate(new Date(x.add_time*1000),'yyyy-MM-dd hh:mm:ss')
					})
					
					
					console.log(list)
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
				}).catch(err => {
					pullScroll.error()
				})
			}else{
				pullScroll.error()
			}
		
		}
	}

};
</script>

<style scoped>
	.appointment-image{
		width: 180upx;
		height: 180upx;
		margin-top: -10upx;
	}
	.appointment-text-all{
		width: 100%;
	}
	.margin-right{
		/* margin-top: -40upx; */
	}
</style>