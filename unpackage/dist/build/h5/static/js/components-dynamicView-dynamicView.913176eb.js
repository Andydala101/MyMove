(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["components-dynamicView-dynamicView"],{"022a":function(i,t,e){"use strict";e.r(t);var n=e("15e5"),a=e.n(n);for(var o in n)"default"!==o&&function(i){e.d(t,i,(function(){return n[i]}))}(o);t["default"]=a.a},"0a10":function(i,t,e){"use strict";var n=e("d101"),a=e.n(n);a.a},"15e5":function(i,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={props:{item:Object},data:function(){return{onshow:!0,switchs:!1,count:0}},methods:{goMoveDeatils:function(i){uni.navigateTo({url:"/pages/MoveDeatils/MoveDeatils?fid="+i})},clickImg:function(i,t){wx.previewImage({urls:i,current:t})}}};t.default=n},"37ff":function(i,t,e){var n=e("24fb");t=n(!1),t.push([i.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.usertitle[data-v-3d82779f]{color:#333;margin:%?20?% 0;font-size:%?28?%}.usertitle > uni-image[data-v-3d82779f]{width:%?70?%;height:%?70?%;border-radius:50%;border:%?2?% solid #ccc;position:relative;top:%?6?%}.usertitle > uni-view[data-v-3d82779f]:nth-child(2){display:inline-block;font-size:1.1em;margin-left:%?20?%}.usertitle > uni-view:nth-child(2) > uni-view[data-v-3d82779f]:nth-child(2){font-size:%?24?%;color:#999}.usertitle > uni-view[data-v-3d82779f]:nth-child(3){float:right;padding:%?0?% %?15?%;border:%?2?% solid #fc4a5b;color:#fc4a5b;border-radius:%?25?%;font-size:%?24?%;margin-top:%?15?%}.usertitle .curs[data-v-3d82779f]{background:#fc4a5b}.texts[data-v-3d82779f]{width:%?590?%;margin-left:%?90?%;font-size:%?28?%}.content[data-v-3d82779f]{width:%?590?%;margin-left:%?90?%;font-size:%?28?%;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;line-clamp:3;-webkit-box-orient:vertical}.btnshow[data-v-3d82779f]{color:#fc4a5b;margin:%?10?% 0 0 %?90?%;font-size:%?28?%}.moves[data-v-3d82779f]{width:%?590?%;height:%?150?%;background:#e9e9e9;margin:%?20?% 0 0 %?90?%;display:flex}.moves > uni-view[data-v-3d82779f]{width:%?400?%;padding:%?15?%;font-size:%?28?%}.moves > uni-image[data-v-3d82779f]{width:%?120?%;height:%?120?%;margin:%?15?%;border-radius:%?6?%}.moves .yanyuan[data-v-3d82779f]{color:#666;font-size:%?24?%;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}.centimg[data-v-3d82779f]{width:%?606?%;margin:%?10?% 0 %?20?% %?90?%}.centimg > uni-view[data-v-3d82779f]{width:%?186?%;height:%?186?%;border-radius:%?8?%;margin:%?8?% 0;display:inline-block;margin-right:%?16?%}.ctiygps[data-v-3d82779f]{height:%?60?%;line-height:%?70?%;color:#999;margin:%?12?% 0 0 %?90?%;font-size:%?24?%}.givelike[data-v-3d82779f]{width:%?590?%;height:%?80?%;display:flex;margin:%?30?% 0 0 %?90?%;justify-content:space-between;color:#333;font-size:%?28?%}.givelike .icotext[data-v-3d82779f]{position:relative;top:%?6?%}',""]),i.exports=t},"559b":function(i,t,e){"use strict";e.r(t);var n=e("9470"),a=e("022a");for(var o in a)"default"!==o&&function(i){e.d(t,i,(function(){return a[i]}))}(o);e("0a10");var s,c=e("f0c5"),r=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"3d82779f",null,!1,n["a"],s);t["default"]=r.exports},9470:function(i,t,e){"use strict";e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return n}));var n={uniIcons:e("767e").default},a=function(){var i=this,t=i.$createElement,e=i._self._c||t;return e("v-uni-view",[e("v-uni-view",{staticClass:"usertitle"},[e("v-uni-image",{attrs:{src:i.item.userimg,mode:"scaleToFill"}}),e("v-uni-view",[e("v-uni-view",[i._v(i._s(i.item.username))]),e("v-uni-view",[i._v(i._s(i.item.atimes))])],1),e("v-uni-view",{class:i.switchs?"curs":"",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.switchs=!i.switchs}}},[e("uni-icons",{attrs:{type:"plusempty",size:"13",color:i.switchs?"#fff":"#fc4a5b"}}),e("v-uni-text",{style:"color: "+(i.switchs?"#fff":"#fc4a5b")+";"},[i._v(i._s(i.switchs?"已关注":"关注"))])],1)],1),i.item.aimgs?e("v-uni-view",{staticClass:"centimg"},i._l(i.item.aimgs,(function(t,n){return e("v-uni-view",{key:n,style:"background: url("+t+") no-repeat;background-size: 100% auto;",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.clickImg(i.item.aimgs,n)}}})})),1):i._e(),e("v-uni-view",{class:i.onshow?"content":"texts"},[i._v(i._s(i.item.atext))]),e("v-uni-view",{staticClass:"btnshow",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.onshow=!i.onshow}}},[i._v(i._s(i.onshow?"展开全文":"收起"))]),i.item.movieid[0]?e("v-uni-view",{staticClass:"moves",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.goMoveDeatils(i.item.movieid[0].fid)}}},[e("v-uni-view",[e("v-uni-view",{staticStyle:{color:"#333"}},[i._v(i._s(i.item.movieid[0].moviename)),e("v-uni-text",{staticStyle:{float:"right",color:"#fc9835","font-weight":"bold"}},[i._v(i._s(i.item.movieid[0].score))])],1),e("v-uni-view",{staticClass:"yanyuan"},[i._v("主演："),i._l(i.item.movieid[0].director,(function(t,n){return e("v-uni-text",{key:n,staticStyle:{margin:"0 8rpx"}},[i._v(i._s(t.name))])}))],2)],1),e("v-uni-image",{attrs:{src:i.item.movieid[0].cover,mode:"scaleToFill"}})],1):i._e(),i.item.locations?e("v-uni-view",{staticClass:"ctiygps"},[e("uni-icons",{staticStyle:{position:"relative",top:"5rpx"},attrs:{type:"location",color:"#999",size:"18"}}),i._v(i._s(i.item.locations))],1):i._e(),e("v-uni-view",{staticClass:"givelike"},[e("v-uni-view",[e("uni-icons",{staticClass:"icotext",attrs:{type:"heart",color:"#333",size:"20"}}),e("v-uni-text",[i._v("点赞")])],1),e("v-uni-view",[e("uni-icons",{staticClass:"icotext",attrs:{type:"chat",color:"#333",size:"22"}}),e("v-uni-text",[i._v("评论")])],1),e("v-uni-view",[e("uni-icons",{staticClass:"icotext",attrs:{type:"redo",color:"#333",size:"22"}}),e("v-uni-text",[i._v("分享")])],1)],1)],1)},o=[]},d101:function(i,t,e){var n=e("37ff");"string"===typeof n&&(n=[[i.i,n,""]]),n.locals&&(i.exports=n.locals);var a=e("4f06").default;a("07730194",n,!0,{sourceMap:!1,shadowMode:!1})}}]);