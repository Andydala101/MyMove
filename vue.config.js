
module.exports = {
	//跨域代理
	//配置开发服务器
	devServer:{
		//代理
		proxy:{
			//'https://m.douyu.com/api/room/list?type=yz'
			//配合proxy请求地址需要进行修改
			///douyu/api/room/list?type=yz  代理修改地址
			//'代理段'
			"/tedu":{
				//代理地址
				target:'https://api.tedu.cn',
				//域名变化的不一致 大部分情况都不一样
				changeOrigin:true,
				//根据协议配置secure https要配置为true
				secure:true,
				//路径重写
				pathRewrite:{
					'^/tedu':''
				}
			},
			"/capi":{
				//代理地址
				target:'http://localhost:5001',
				//域名变化的不一致 大部分情况都不一样
				changeOrigin:true,
				//路径重写
				pathRewrite:{
					'^/capi':''
				}
			}
		}
	}
}