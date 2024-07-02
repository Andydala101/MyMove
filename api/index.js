// 首页 相关接口
import api from './request.js';

export default {
	zixunList(data){ // 获取首页资讯列表
		return api.get("/api/Moves/zixunList", data)
	},
	alldynamic(data){ // 获取动态列表
		return api.get("/api/Moves/alldynamic", data)
	},
	GetUserDynamic(data){ // 获取用户发布的动态
		return api.get("/api/Moves/GetUserDynamic", data)
	},
	CreateDiscuss(data){ // 发布动态评论
		return api.post("/api/Moves/CreateDiscuss", data)
	},
	CreateDynamic(data){ // 新增动态
		return api.post("/api/Moves/CreateDynamic", data)
	},
	DelDynamic(data){ // 获取用户发布的动态
		return api.get("/api/Moves/DelDynamic", data)
	},
	SearchMovies(data){ // 搜索电影
		return api.get("/api/Moves/SearchMovies", data)
	},
	MovieDeatils(data){ // 电影详情
		return api.get("/api/Moves/MovieDeatils", data)
	},
	CreateMovie(data){ // 添加电影
		return api.post("/api/Moves/CreateMovie", data)
	},
	GetMovieList(data){ // 添加电影
		return api.get("/api/Moves/GetMovieList", data)
	},
}
