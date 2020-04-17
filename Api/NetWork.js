import http from '@/request/http.js'
import {replaceImage} from './dealUrl.js'
// 获取首页数据
export function index_data(){
	return http({
		url: getApp().globalData.ApiUrl + '/Fitness/index_data',
		method:"GET",
	})
}

//获取课程列表
export function course_list(){
	return http({
		url: getApp().globalData.ApiUrl + '/Fitness/course_list',
		method:"GET",
	})
}

//获取个人信息
export function my_list(token){
	return http({
		url: getApp().globalData.ApiUrl  + '/Fitness/my_list',
		method:"POST",
		header:{token:token}
	})
}

//登录
export function login_index(data){
	return http({
		url: getApp().globalData.ApiUrl + '/Login/index',
		data:data,
		method:"POST",
	})
}

//获取codeid
export function setCode(data){
	return http({
		// url: replaceImage('http://fontness.com/ebapi/Login/setCode'),
		url: getApp().globalData.ApiUrl + '/Login/setCode',
		data:data,
		method:"POST",
	})
}

// 在线预约
export function appointmentOnline(data,token){
	return http({
		url:getApp().globalData.ApiUrl + '/Fitness/booking',
		header:{
			token
		},
		data:{
			allbooking:data
		},
		method:"GET"
	})
}
// 所有预约
export function allAppointment(){
	return http({
		url:getApp().globalData.ApiUrl+'/Fitness/bookingInfo',
		method:"GET"
	})
}

// 预约记录
export function myAppointmentList(token,page,size){
	return http({
		url:getApp().globalData.ApiUrl+'/Fitness/bookingRecord',
		method:"GET",
		data:{
			page,size
		},
		header:{
			token
		}
	})
}

// 消费账单
export function myPurse(token,page,size){
	return http({
		url:getApp().globalData.ApiUrl+'/Fitness/userDetail',
		method:"GET",
		data:{
			page,size
		},
		header:{
			token
		}
	})
}

// 	在线充值
export function rechargeOnline(){
	return http({
		url:getApp().globalData.ApiUrl+'/Fitness/inquireRecharge',
		method:"GET"
	})
}

// 立即充值
export function goPay(token,id){
	return http({
		url:getApp().globalData.ApiUrl+'/Fitness/immediatelyRecharge',
		data:{
			id
		},
		header:{
			token
		},
		method:"GET",
		
	})
}

// 获取场馆介绍列表
export function areasList(page,size){
	return http({
		url:getApp().globalData.ApiUrl+'/Fitness/siteInfo',
		data:{
			page,
			size
		},
		method:"GET"
	})
}

// 进入某个场馆详情
export function areasDetail (id) {
	return http({
		url:getApp().globalData.ApiUrl+'/Fitness/OneSiteInfo',
		data:{
			id
		},
		method:"GET"
	})
}

// 转发
export function share(){
	console.log('--------')
	return http({
		url:getApp().globalData.ApiUrl + '/Fitness/shareImage',
		method:"GET"
	})
}