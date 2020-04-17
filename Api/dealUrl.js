import {BASE_URL,HOST1} from './CONST.js'
// 替换单个Url的路径
export function replaceImage(str){
	if(str){
		const reg = new RegExp(`${BASE_URL}`)
		let flag = true 
		if(!reg.test(str)){
			if(!~str.indexOf(HOST1)){
				flag = false
			}		
		}
		if(flag){
			return str.replace(reg,HOST1)
		}else{
			return 'http://' + HOST1 + str
		}
	}
	return ''
}
