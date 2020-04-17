export function dealTime(str) {
	console.log(str.replace(/:00/,''))
	return str.replace(/:00/,'')*1
}