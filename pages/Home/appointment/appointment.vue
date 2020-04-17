<template>
	<view class="body">
		<section class="PullScroll-Page">
			<s-pull-scroll 
				ref="pullScroll" 
				:back-top="true" 
				:pullDown="pullDown" >
				<view class="margin-lr" >
					<view class="bg-black margin-tb-sm padding">
						<view class="flex align-center justify-center title-tips">
							<!-- <view class="lg text-yellow cuIcon-title"></view> -->
							<view class="text-white title-text">工作日(周一至周五)</view>
						</view>
						<view class="flex align-center margin-tb-sm">
							<view class="lg text-yellow cuIcon-title"></view>
							<view class="text-erliu">07:00-10:00，每人{{moneyDetail.weekMoney.morning_money || 'x'}}元，按人数统计(最多4人)</view>
						</view>
						<view class="flex align-center margin-tb-sm">
							<view class="lg text-yellow cuIcon-title"></view>
							<view class="text-erliu">10:00-17:00，每小时{{moneyDetail.weekMoney.noon_money || 'x'}}元</view>
						</view>
						<view class="flex align-center">
							<view class="lg text-yellow cuIcon-title"></view>
							<view class="text-erliu">17:00-21:00，每小时{{moneyDetail.weekMoney.night_money || 'x'}}元</view>
						</view>
						<view class="flex align-center margin-tb-sm title-tips">
							<!-- <view class="lg text-yellow cuIcon-title"></view> -->
							<view class="text-white title-text">周末(周六至周日)</view>
						</view>
						<view class="flex align-center margin-tb-sm">
							<view class="lg text-yellow cuIcon-title"></view>
							<view class="text-erliu">7:00-9:00，{{moneyDetail.weekendMoney.morning_money || 'x'}}元/人(最多4人)</view>
						</view>
						<view class="flex align-center margin-tb-sm">
							<view class="lg text-yellow cuIcon-title"></view>
							<view class="text-erliu">9:00-17:00，{{moneyDetail.weekendMoney.noon_money || 'x'}}元/小时</view>
						</view>
						<view class="flex align-center margin-tb-sm">
							<view class="lg text-yellow cuIcon-title"></view>
							<view class="text-erliu">17:00-21:00，{{moneyDetail.weekendMoney.night_money || 'x'}}元/小时</view>
						</view>
					</view>
					<view class="flex align-center">
						<view class=" flex flex-direction align-end margin-right-sm margin-top-lg">
							<block v-if="!isWeekend">
								<block v-for="(vo,item) in weekTime" :key="item">
									<view class="text-sm text-white all-time">{{vo.time}}</view>
								</block>
							</block>
							<block v-else>
								<block v-for="(vo,item) in weekendTime" :key="item">
									<view class="text-sm text-white all-time">{{vo.time}}</view>
								</block>
							</block>
						</view>
						<scroll-view
							scroll-x="true"
							scroll-left="0"
							show-scrollbar="true"
							style="transform: translateY(-10upx);"
						>
							<view class="grid text-center col-4 margin-bottom">
								<view class="text-sm text-white" v-for="(item,index) in weekTime[0].areaNames" :key="item.id">{{item.name}}</view>
							</view>
							
							<block v-if="!isWeekend">
								<block v-for="(vo,keyword) in weekTime" :key="keyword" v-if="keyword < weekTime.length-1">
								
										<view class="flex align-center justify-around appointment-all">
											<view class="appointment-all-view" v-for="(item,index) in vo.areaNames" :key="item.id"  @tap="selectClick(item,index,vo,keyword)" :class="[item.select === true ? 'isSelected' : '',item.canSelect === false ? 'isCanSelect' : '']"><text class="text-price text-df">{{vo.price}}{{!item.canSelect ? '(已满)' : ''}}</text>
												<view v-if="vo.time == '7:00'">{{vo.time == '7:00' ? '(' + item.surplus + '/4' + ')': ''}}</view>
											</view>
										</view>
								</block>
							</block>
							<block v-else>
								<block v-for="(vo,keyword) in weekendTime" :key="keyword" v-if="keyword < weekendTime.length-1">
								
										<view class="flex align-center justify-around appointment-all">
											<view class="appointment-all-view" v-for="(item,index) in vo.areaNames" :key="item.id"  @tap="selectClick(item,index,vo,keyword)" :class="[item.select === true ? 'isSelected' : '',item.canSelect === false ? 'isCanSelect' : '']"><text class="text-price text-df">{{vo.price}}{{!item.canSelect ? '(已满)' : ''}}</text>
												<view v-if="vo.time == '7:00'">{{vo.time == '7:00' ? '(' + item.surplus + '/4' + ')': ''}}</view>
											</view>
										</view>
								</block>
							</block>
						</scroll-view>
					</view>
					
					<view class="flex align-center justify-center margin-tb-xl">
						<block v-for="(vo,keycolor) in colorList" :key="keycolor">
							<view class="flex align-center margin-right-lg text-sm">
								<view :style="[{'background':vo.color}]" class="appionment-color"></view>
								<view>{{vo.text}}</view>
							</view>
						</block>
					</view>
					<view :style="[{height: bootomheight + 'px'}]"></view>
					<view id="appointmentBottm" class="appointment-bottom">
						<view v-if="selected.length != 0">
							<view class="flex align-center justify-between text-white margin-top padding-lr">
								<view>已选场地</view>
								<view @tap="emptyClick">清空</view>
							</view>
							<scroll-view
								scroll-x="true"
								scroll-left="0"
								show-scrollbar="true"
								class="scroll-view-item_H"
							>
							<div class="flex">
								<block v-for="(vo,listkey) in selected" :key="listkey">
									<view class="selected">
										<view class="flex align-center appointment-bottom-all text-white">
											<view>{{vo.address_id}}号场地</view>
											<view>{{vo.start_time}}-{{vo.end_time}}</view>
										</view>
										<!-- <view class="people-box">
											<view class="people">
												人数
											</view>
											<view class="select-people">
												{{vo.people}}人
											</view>
										</view> -->
									</view>
								</block>
								
							</div>
							</scroll-view>
							<view class="cu-form-group choose-people">
								<view class="title text-white">选择人数</view>
								<picker @change="PickerChange" :value="pickerIndex" :range="picker">
									<view class="picker text-white">
										{{dealPicker}}
									</view>
								</picker>
							</view>
						</view>
						<view class="text-width appointment-width" @tap="confirmApp">{{buttontext}} <text v-if="totalPrice" class="text-price">{{totalPrice}}</text></view>
					</view>
					
					
					
				</view>
			</s-pull-scroll>
			<XModal v-model="show" title='提示'  text='您选择预约的场馆正在进行中,是否继续预约' @confirm="continueToApp" />
			<XModal v-model="show1" title='提示' text='是否确定预约' @confirm="goPay" :text-center="true" />
		</section>
	</view>
</template>

<script>
import sPullScroll from '@/components/s-pull-scroll';
import { appointmentOnline,allAppointment } from '@/Api/NetWork'
import {dealTime} from '@/Api/dealTime'
// 导入vuex
import {mapState} from 'vuex'
export default {
	components: {
		sPullScroll
	},
	data () {
		return {
			show:false,
			currentArea:{},
			currentObj:{},
			currentKeyword:-1,
			moneyDetail:{
				weekMoney:{},
				weekendMoney:{}
			},
			show1:false,
			weekTime:[{time:'7:00',id:0,price:5,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true,surplus:0},
				{id:1,name:'二号场地',select:false,canSelect:true,surplus:0},
				{id:2,name:'三号场地',select:false,canSelect:true,surplus:0},
				{id:3,name:'四号场地',select:false,canSelect:true,surplus:0}
			]
			},{time:'10:00',id:3,price:30,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'11:00',id:4,price:30,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'12:00',id:5,price:30,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'13:00',id:6,price:30,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'14:00',id:7,price:30,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'15:00',id:8,price:30,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'16:00',id:9,price:30,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'17:00',id:10,price:35,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'18:00',id:11,price:35,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'19:00',id:12,price:35,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'20:00',id:13,price:35,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'21:00',id:14,price:35,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			}],
			topMoney:5,//7:00-10:00
			centerMoney:30,//10:00-17:00
			bottomMoney:35,//17:00-21:00
			list: [],
			colorList:[{color:'#DCDCDC',text:'可选'
			},{	color:'#E76446',text:'不可选'
			},{ color:'#85BC3B',text:'已选'	
			}],
			buttontext:'立即预约',
			selected:[],//选中的场地
			bootomheight:60,//底部动态高度
			picker: ['1人', '2人', '3人','4人','5人','6人','7人','8人','9人','10人'],
			pickerIndex:0,
			isWeekend:false,//是否是周末
			
			
			
			
			
			
			weekendTime:[{time:'7:00',id:0,price:10,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true,surplus:0},
				{id:1,name:'二号场地',select:false,canSelect:true,surplus:0},
				{id:2,name:'三号场地',select:false,canSelect:true,surplus:0},
				{id:3,name:'四号场地',select:false,canSelect:true,surplus:0}
			]
			},{time:'9:00',id:3,price:35,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'10:00',id:4,price:35,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'11:00',id:5,price:35,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'12:00',id:6,price:35,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'13:00',id:7,price:35,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'14:00',id:8,price:35,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'15:00',id:9,price:35,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'16:00',id:10,price:35,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'17:00',id:11,price:40,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'18:00',id:12,price:40,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'19:00',id:13,price:40,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},{time:'20:00',id:14,price:40,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},
			{time:'21:00',id:15,price:40,
			areaNames:[
				{id:0,name:'一号场地',select:false,canSelect:true},
				{id:1,name:'二号场地',select:false,canSelect:true},
				{id:2,name:'三号场地',select:false,canSelect:true},
				{id:3,name:'四号场地',select:false,canSelect:true}
			],
			},
			],
			
			
		};
	},
	onLoad () {
		// 获取所有预约
		this.allAppointment()
	},
	computed:{
		...mapState(['isUserAuthorize','userInfo']),
		
		// 总价
		totalPrice(){
			const sum = 0
			let arr = this.selected
			let arr2 = arr.filter((item,index) => {
				return dealTime(item.start_time) == 7
			})
			let arr3 = arr.filter((item,index) => {
				return dealTime(item.start_time) != 7
			})
			if(arr2.length != 0){
				return arr2.reduce((prev,next) => {
					return prev*1 + next.price * this.dealPicker.replace('人','')
				},0) + this.totalP(arr3)
			}else{
				return this.totalP(arr3)
			}
		},
		dealPicker(){
			return this.pickerIndex > -1 ? this.picker[this.pickerIndex] ? this.picker[this.pickerIndex] : this.picker[0]  :'请选择人数'
		}
	},
	methods: {
		totalP(arr) {
			return arr.reduce((prev,next) => {
				return prev * 1 + next.price * 1 
			},0)
		},
		refresh () {
		  this.$nextTick(() => {
			this.$refs.pullScroll.refresh();
		  });
		},
		pullDown (pullScroll) {
			console.log('123')		 
		 // 清空页面信息
		this.selected = []
		if(this.isWeekend){
			this.weekendTime.forEach(x => {
				x.areaNames.forEach(y => {
					this.$set(y,'select',false)
				})
			})
		}else{
			this.weekTime.forEach(x => {
				x.areaNames.forEach(y => {
					this.$set(y,'select',false)
				})
			})
		}
		 // 获取所有预约
			this.allAppointment()
		},
		//选择
		selectClick(item,index,vo,keyword){
			console.log(item)
			if(!item.canSelect){
				return
			}
			
			this.bottomHeigth()
			
			// 判断预约时间是否小于当前时间
			let nowHour = new Date().getHours();
			console.log(nowHour)
			
			
			const obj = {
				address_id:item.id*1+1,
				start_time:vo.time,
				end_time:this.isWeekend ? this.weekendTime[keyword + 1].time : this.weekTime[keyword + 1].time,
				price:vo.price
			}
			console.log(obj)
			// this.selected.push(obj)
			// item.select = !item.select
			if(item.select){
				item.select = false
				// 删除数组中的元素
				this.removeArr(obj)
				if(keyword == 0){
					this.picker = ['1人', '2人', '3人','4人','5人','6人','7人','8人','9人','10人']
				}
			}else{
				if(vo.time.replace(/:00/,'') == nowHour){
					this.currentArea = item
					this.currentObj = obj
					this.currentKeyword = keyword
					this.show = true
				}else{
					
					this.addSelected(item,obj,keyword)
					
				}
				
			}
			
		},
		addSelected(item,obj,keyword){
			// 添加数组中的元素
			item.select = true
			// 添加进末尾
			this.selected.push(obj)
			// 排序数组
			this.orderSelect()
			if(keyword == 0){
				this.picker = ['1人', '2人', '3人','4人']
			}
			
		},
		// 删除数组中的元素
		removeArr(obj){
			const index = this.selected.findIndex((x) => {
				return x.address_id == obj.address_id && x.start_time == obj.start_time
			})
			this.selected.splice(index,1)
		},
		// 排序数组
		orderSelect(){
			// const arr = this.selected
			this.selected.sort((a,b) =>{
				if(a.address_id == b.address_id){
					return parseInt(a.start_time.replace(/:00/,'')) < parseInt(b.start_time.replace(/:00/,'')) ? -1 : 1
				}else{
					return parseInt(a.address_id) < parseInt(b.address_id) ? -1 : 1
				}
			})
			console.log(this.selected)
			
		},
		//动态修改底部高度
		bottomHeigth(){
			var that = this
			setTimeout(()=>{
				const query = uni.createSelectorQuery().in(this);
				query.select('#appointmentBottm').boundingClientRect(data => {
					that.bootomheight = data.height
				}).exec();
			},100)
			
		},
		// 继续预约
		continueToApp(){
			this.addSelected(this.currentArea,this.currentObj,this.currentKeyword)
			this.bottomHeigth()
		},
		// 确认预约
		confirmApp(){
			this.show1 = true
		},	
		//清空
		emptyClick(){
			this.selected = []
			if(this.isWeekend){
				this.weekendTime.forEach(x => {
					x.areaNames.forEach(y => {
						this.$set(y,'select',false)
					})
				})
			}else{
				this.weekTime.forEach(x => {
					x.areaNames.forEach(y => {
						this.$set(y,'select',false)
					})
				})
			}
			// this.weekendTime.forEach(x => {
			// 	x.areaNames.forEach(y => {
			// 		this.$set(y,'select',false)
			// 	})
			// })
			console.log()
			this.bootomheight = 60
		},
		
		// 提交数据
		goPay(){
			
			let arr = this.selected,token = this.userInfo.token
			if(arr.length == 0){
				uni.showToast({
					title:'您还没选场地',
					icon:'none'
				})
				
			}else{
				arr = arr.map(x => {
					return {
						address_id:x.address_id,
						start_time:dealTime(x.start_time),
						end_time:dealTime(x.end_time),
						peopleNum:this.picker[this.pickerIndex].replace('人','')*1
					}
				})
				console.log(arr)
				uni.showLoading({
					title:'',
				})
				appointmentOnline(arr,token)
					.then(res => {
						console.log(res)
						// 设置全局变量存值
						getApp().globalData.orderInfo = res
						console.log()
						uni.reLaunch({
							url:'../succeed/succeed?id=1'
						})
					})
					.catch(err => {	
						if(err.data.msg){
							uni.showToast({
								title:err.data.msg || '支付失败' ,
								icon:'none'
							})
						}else{
							uni.showToast({
								title:'支付失败',
								icon:'none'
							})
						}
							
						}
					)
			}
		},
		allAppointment(){
			allAppointment().then(res => {
				const data = res	
				// 判断是否是周末
				// 1：周末  2.工作日
				this.$refs.pullScroll.success()
				this.isWeekend = data.time == 1
				const money = res.money
				money.forEach(x => {
					if(x.work_or_day == 0) {
						this.moneyDetail.weekMoney = x
					}else if(x.work_or_day == 1){
						this.moneyDetail.weekendMoney = x
					}
				})
				console.log('价格获取成功' + this.moneyDetail)
				// // 处理场馆对象中的价格
				// let timeAres = this.isWeekend ? this.weekendTime:this.weekTime
				// this.dealData(timeAres)
				
				// 对数据进行筛选，匹配出哪些是不可选的
				this.dealUnAble(data.result)
			})
		},
		// 对过期的场馆进行处理
		dealData(arr){
			const localHour = new Date().getHours()
			arr.forEach(x => {
				// x.areaNames.forEach(y => {
					
				// })
				if(x.time.replace(/:00/,'') < localHour){
					x.areaNames.forEach(y => {
						y.canSelect = false
					})
				}
			})
		},
		dealUnAble(arr){
			// 筛选出已支付的场馆
			const newArr = arr.filter(x => {
				return x.pay_status == 1
			})
			
			// 对数据进行处理
			if(this.isWeekend){
				this.dealRed(newArr,this.weekendTime,this.moneyDetail.weekendMoney)
			}else{
				this.dealRed(newArr,this.weekTime,this.moneyDetail.weekMoney)
			}
		},
		// 单列选择
		PickerChange(e){
			this.pickerIndex = e.detail.value
		},
		// 对数据进行处理
		dealRed(newArr,allArr,moneyObj){
			console.log(newArr)
			
			var that = this
			// 得到开始时间为7的所以已预约房间
			const sevenArr = newArr.filter(x => x.start_time == 7)
			// 当前小时数
			const localHour = new Date().getHours()
			
			for(let i = 0;i<allArr.length;i++){
				if(allArr[i].time == '7:00'){
					const areas = allArr[i].areaNames
					for(let i = 0;i<areas.length;i++){
						for(let j = 0;j<sevenArr.length;j++){
							if(sevenArr[j].address_id == areas[i].id *1 +1){
								// areas[i].surplus = sevenArr[j]
								// this.$set(areas[i],'surplus',sevenArr[j].people_num)
								areas[i].surplus += sevenArr[j].people_num
								if(areas[i].surplus >= 4 ){
									this.$set(areas[i],'canSelect',false)
								}
							}
						}
					}				
				}else{
					for(let j = 0;j<newArr.length;j++){
						if(this.dealTimeStr(allArr[i].time)  == newArr[j].start_time){
							for(let t = 0;t<allArr[i].areaNames.length;t++){
								let area = allArr[i].areaNames[t]
								if(area.id *1  + 1 == newArr[j].address_id){
									// 如果所有条件都符合							
									that.$set(area,'canSelect',false)							
								}
							}
						}
					}
				}
				let allTime = allArr[i].time.replace(/:00/,'')
				// 处理时间
				if(this.isWeekend){
					if(allTime >= 7 && allTime < 9){
						// 早上时段
						allArr[i].price = moneyObj.morning_money
					}else if(allTime >= 9 && allTime < 17){
						// 中午时段
						allArr[i].price = moneyObj.noon_money
					}else if(allTime >= 17 && allTime < 21){
						// 晚上时段
						allArr[i].price = moneyObj.night_money
					}
				}else{
					if(allTime >= 7 && allTime < 10){
						// 早上时段
						allArr[i].price = moneyObj.morning_money
					}else if(allTime >= 10 && allTime < 17){
						// 中午时段
						allArr[i].price = moneyObj.noon_money
					}else if(allTime >= 17 && allTime < 21){
						// 晚上时段
						allArr[i].price = moneyObj.night_money
					}
				}
				// 处理过期的场馆
				
				// arr.forEach(x => {
				// 	// x.areaNames.forEach(y => {
						
				// 	// })
				// 	if(x.time.replace(/:00/,'') < localHour){
				// 		x.areaNames.forEach(y => {
				// 			y.canSelect = false
				// 		})
				// 	}
				// })
				if(allTime < localHour){
					allArr[i].areaNames.forEach(y => {
						y.canSelect = false
					})
				}
				
			}
			
		},
		dealTimeStr(str){
			return str.replace(':00','')
		}
	}
};
</script>

<style lang="scss" scoped>
	.appointment-onebg{
		background-image: url(/static/moneya.png);
		background-size: 110upx 97upx;
		background-repeat: no-repeat;
		background-position: 90% 0%;
	}
	.appointment-twobg{
		background-image: url(/static/moneyb.png);
		background-size: 110upx 97upx;
		background-repeat: no-repeat;
		background-position: 90% 0%;
	}
	.appointment-image{
		width: 180upx;
		height: 180upx;
	}
	.appointment-text-all{
		width: 100%;
	}
	.scroll-view_H{
		width: 90%;
		display: flex;
	}
	.scroll-view-item_H{
		width: auto;
		padding: 40upx 20upx;
	}
	.appointment-all{
		margin-bottom: 10upx;
	}
	.appointment-all .appointment-all-view{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 146upx;
		height:60upx;
		background: #DCDCDC;
		border-radius: 10upx;
		color: #050505;
		font-size: 22upx;
	}
	.appionment-color{
		width:28upx;
		height:28upx;
		border-radius:4upx;
		margin-right: 20upx;
	}
	.margin-right-lg:nth-child(3){
		margin-right: 0;
	}
	.appointment-width{
		height:90upx;
		text-align: center;
		line-height: 90upx;
		background:rgba(252,214,25,1);
		border-radius:10upx;
		font-size:36upx;
		font-weight:bold;
		color:rgba(0,0,0,1);
	}
	.appointment-bottom{
		padding-bottom:30upx;
		position: fixed;
		bottom: 0;
		width: 690upx;
		background-color: #0A0A0A;		
		width: 93%;
	}
	.appointment-bottom-all{
		// margin: 40upx 0 60upx 20upx;
		height: 50upx;
		border: 1px #DCDCDC solid;
		border-radius: 8upx;
		font-size: 24upx;
		width: 320upx;

	}
	.appointment-bottom-all view:nth-child(1){
		width: 150upx;
		text-align: center;
		line-height: 50upx;
		border-top-left-radius: 8upx;
		border-bottom-left-radius:8upx;
		background: #DCDCDC;
		color: #050505;
	}
	.appointment-bottom-all view:nth-child(2){
		width: 160upx;
		text-align: center;
	}
	.all-time{
		line-height: 70upx;
	}
	.isSelected{
		background: #85bc3b !important;
		color: #FFFFFF !important;
	}
	.isCanSelect{
		background: #e76446 !important;
		color: #FFFFFF !important;
	}
	.selected{
		margin-left: 20upx;
	}
	.selected:nth-child(1){
		margin-left: 0;
	}
	.people-box{
		height: 50upx;
		display: flex;
		align-items: center;
		border: 1px #DCDCDC solid;
		border-top: none;
		border-radius: 8upx;
		.people{
			width: 140upx;
			display: flex;
			height: 100%;
			justify-content: center;
			align-items: center;
			background-color: #DCDCDC;
			color: #050505;
		}
	}
	.select-people{
		width: 140upx;
		color: #FFFFFF;
		
	}
	.choose-people{
		background: transparent;
		font-size: 28upx;
		font-family: 'SimHei';
		picker{
			font-size: 28upx !important;
		}
	}
	.title-tips{
		display: flex;
		.title-text{
			text-align: center;
			flex: 1;
		}
	}
	.surplus{
		background: transparent;
	}
</style>