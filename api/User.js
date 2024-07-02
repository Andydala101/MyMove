// 首页 相关接口
import api from './request.js';

export default {
	CreateUser(data){ // 添加用户
		return api.post("/api/User/CreateUser", data)
	},
	Login(data){ // 登录
		return api.post("/api/User/Login", data)
	},
	GetUserDetails(data){ // 查询用户信息
		return api.get("/api/User/GetUserDetails", data)
	},
	
}
