import Vue from 'vue'
import App from './App'
import store from '@/store'
import interceptor from '@/Api/interceptor.js'

console.log(store)
Vue.config.productionTip = false

import Authorize from '@/components/Authorize/Authorize'
Vue.component('Authorize',Authorize)

// 导入弹窗
import XModal from '@/components/x-modal/x-modal'
Vue.component('XModal',XModal)

App.mpType = 'app'



Vue.prototype.$interceptor = interceptor
const app = new Vue({
    ...App,
	store,
	interceptor
})
// 为每个页面设置统一分享路径
Vue.mixin({
		onShareAppMessage(res) {
			const imgUrl = this.$store.state.shareImage[0]
			return {
				title:'生活段运动馆',
				path: 'pages/Home/home',  
				imageUrl:imgUrl,
				complete:() => {
					uni.hideLoading()
					console.log('完成分享')
				},
				success:() => {
					uni.hideLoading()
				}
			}			
		}
})
app.$mount()
