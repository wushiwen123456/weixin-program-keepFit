(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Home/succeed/succeed"],{"110c":function(t,e,n){"use strict";n.r(e);var o=n("2e58"),c=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=c.a},"2b54":function(t,e,n){"use strict";n.r(e);var o=n("c50e"),c=n("110c");for(var i in c)"default"!==i&&function(t){n.d(e,t,(function(){return c[t]}))}(i);n("8c19");var u,r=n("f0c5"),a=Object(r["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=a.exports},"2e58":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;n("1ecd");var o={data:function(){return{type:-1,windowHeight:0,orderInfo:[]}},onLoad:function(e){console.log(e);var n=this;n.type=e.id,0==n.type?t.setNavigationBarTitle({title:"支付成功"}):t.setNavigationBarTitle({title:"预约成功"}),t.getSystemInfo({success:function(t){n.windowHeight=t.windowHeight}}),this.orderInfo=getApp().globalData.orderInfo,console.log(this.orderInfo)},computed:{backButton:function(){return 0==this.type?"返回个人中心":"查看预约记录"}},methods:{succeedClick:function(){0==this.type?t.switchTab({url:"../../My/my"}):t.redirectTo({url:"../../My/appointmentDetail/appointmentdetail"})}}};e.default=o}).call(this,n("543d")["default"])},6110:function(t,e,n){},"8c19":function(t,e,n){"use strict";var o=n("6110"),c=n.n(o);c.a},c50e:function(t,e,n){"use strict";var o,c=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}))},efc8:function(t,e,n){"use strict";(function(t){n("39d4"),n("921b");o(n("66fd"));var e=o(n("2b54"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["efc8","common/runtime","common/vendor"]]]);