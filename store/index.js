import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		userInfo:{},
		isUserAuthorize:true,
		shareImage:[]
	},
	mutations:{
		// 存储用户信息
		setUserInfo(state,obj){
			state.userInfo = obj
		},
		// 存储用户是否登录
		setAuthorize(state,res){
			console.log(res)
			state.isUserAuthorize = res
		},
		// 存储分享的图片
		setShareImages(state,list){
			state.shareImage = list
		}
	},
	getters:{},
	actions:{}
})
export default store