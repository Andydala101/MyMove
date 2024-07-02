<template>
	<view>
		<view style="height: 50rpx;"></view>
		<!-- 顶部搜索栏 -->
		<view class="box_search">
			<view class="search">
				<image src="../../static/icon/icon_Search.png" mode=""></image>
				<input type="text" placeholder="请输入影片/影院/影人">
			</view>
			<image src="../../static/icon/icon_58.png" mode=""></image>
		</view>
		<!-- banner轮播图 -->
		<uni-swiper-dot mode="round" selectedBackgroundColor="#fff" :info="banners" :current="current" style="width: 700rpx;height: 400rpx;margin: 0 auto;border-radius: 16rpx;">
			<swiper :autoplay="true" :interval="3000" :duration="500" :circular='true' @change="doChange" style="height: 340rpx;border-radius: 16rpx;box-shadow: 0 0 30rpx rgba(0,0,0,0.7); ">
				<swiper-item v-for="(item, indx) in banners" :key="indx">
					<image :src="item" style="width: 100%;height: 340rpx;border-radius: 16rpx;"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<!-- 最新预告、实时票房 -->
		<uni-grid :column="4" :showBorder="false" :Boolean="false" class="fenl">
			<uni-grid-item>
				<image src="../../static/icon/icon_03.png" mode=""></image>
				<text>最新预告</text>
			</uni-grid-item>
			<uni-grid-item>
				<image src="../../static/icon/icon_05.png" mode=""></image>
				<text>实时票房</text>
			</uni-grid-item>
			<uni-grid-item>
				<image src="../../static/icon/icon_07.png" mode=""></image>
				<text>历史榜单</text>
			</uni-grid-item>
			<uni-grid-item>
				<image src="../../static/icon/icon_09.png" mode=""></image>
				<text>周边商城</text>
			</uni-grid-item>
		</uni-grid>
		<d-divider :height="20" background="#f9f9f9"></d-divider>
		<!-- 热映列表 -->
		<view class="HotMove" v-if="HotmoveData">
			<view class="hotTitle">
				<text>正在热映</text>
				<view @click="goMovies('0')">全部
					<text style="color: #fc4a5b;">({{HotmoveData.length}})</text>	
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="moveList">
				<view v-for="(item,index) in HotmoveData" :key="index">
					<view>
						<text>{{item.MovieClassify}}</text>
						<image :src="item.Poster" style="width:220rpx;height: 300rpx;" mode="" @click="goMoveDeatils(item.Id)"></image>
						<view>观众评分<text style="padding-left: 5rpx; font-size: 1.15em;">{{item.Score ? item.Score:'暂无'}}</text></view>
					</view>
					<view>{{item.Name}}</view>
					<view>{{(item.WatchCount * 1) >= 10000 ? (item.WatchCount / 10000).toFixed(1)+'万' : item.WatchCount}}人看过</view>
				</view>
			</view>
		</view>
		<d-divider :height="20" background="#f9f9f9"></d-divider>
		<!-- 即将上映 -->
		<view class="HotMove" v-if="moveData">
			<view class="hotTitle">
				<text>即将上映</text>
				<view @click="goMovies('1')">全部
					<text style="color: #fc4a5b;">({{moveData.length}})</text>	
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="moveList">
				<MoveList v-for="(item,index) in moveData" :key="index" :item='item' :index='index'></MoveList>
			</view>
		</view>
		<d-divider :height="20" background="#f9f9f9"></d-divider>
		<!-- 精选资讯 -->
		<view class="Information" v-if="zixun">
			<view class="hotTitle">精选资讯</view>
			<view class="boxList" v-for="(item,index) in zixun" :key="index">
				<image :src="item.img" mode="aspectFill" @click="goZixunDeatils(item.hid)"></image>
				<view class="zixunTilte">
					<view @click="goZixunDeatils(item.hid)">{{item.title}}</view>
					<text>{{(item.looks * 1) >= 1000 ? (item.looks / 1000).toFixed(1)+'k' : item.looks}}阅读</text>
					<text>{{item.htimes}}前</text>
					<view class="userInfo">
						<image :src="item.userimg" mode="aspectFill" ></image>
						<text style="font-size: 0.9em;">{{item.username}}</text>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				HotmoveData:null,
				moveData:null,
				zixun:null,
				current:0,
				banners:['../../static/img/banner01.jpg','../../static/img/banner02.jpg','../../static/img/banner03.jpg']
			}
		},
		onLoad(){
			this.getData1()
			this.getData2()
			this.ZiXunList()
		},
		methods: {
			goMovies(num){

				uni.switchTab({
				    url: '/pages/Move/Move?Type=' + num 
				});
			},
			btn_star(){
				this.star = this.star == false
			},
			doChange(e){
				this.current = e.detail.current
			},
			goZixunDeatils(lid){
				this.$common.LoadPage('/pages/zixunDeatils/zixunDeatils?hid=' + lid)
			},
			goMoveDeatils(fid){
				uni.navigateTo({
				    url: '/pages/MoveDeatils/MoveDeatils?fid=' + fid
				});
			},
			getData1(){
				this.$api.index.GetMovieList({IsBeon: 1}).then(res=>{
					this.HotmoveData = res.Result
				})
			},
			getData2(){
				this.$api.index.GetMovieList({IsBeon: 0}).then(res=>{
					this.moveData = res.Result
				})
			},
			ZiXunList(){
				this.$api.index.zixunList().then(res=>{
					this.zixun = res.Result
				})
			}
		}
	}
</script>

<style scoped lang="scss">
//顶部搜索栏
.box_search{ 
	width:640rpx;display: flex;margin:30rpx auto;
	>image{
		width:46rpx;height: 50rpx;margin: 8rpx 0 0 30rpx;
	}
	.search{
		width: 560rpx;height: 66rpx;position: relative;display: flex;background-color: #e6e6e6;border-radius:35rpx;
		>image{
			width: 45rpx;height: 40rpx;margin: 13rpx 20rpx;
		}
		>input{
			width: 500rpx;height: 100%;font-size: 28rpx;color: #333;padding-left: 6rpx;
		}
	}
}
//banner轮播图
.fenl{
	margin-top: 30rpx;
	text-align: center;
	image{
		width: 80rpx;height: 80rpx;display: block;margin: 10rpx auto;
	}
	text{font-size: 24rpx;color: #333;}
}
//电影上映以及即将上映列表
.HotMove{
	width: 700rpx;margin:20rpx auto;
	.hotTitle{
		width: 100%;height: 80rpx;line-height: 80rpx;
		>text{
			font-size: 32rpx;color: #333;float: left;font-weight: 700;
		}
		>view{
			color: #666;float: right;font-size: 24rpx;
		}
	}
	.moveList{
		width: 725rpx;height: 400rpx;display: flex;overflow-y: scroll;
		>view{
			margin-right: 20rpx;width: 220rpx;height: 400rpx;
			>view:nth-child(1){
				height: 290rpx;width: 100%; overflow: hidden;border-radius: 10rpx;position: relative;
				>view{
					width: 100%;padding: 10rpx 0; position: absolute;bottom: 0;text-align: center;color: #fc9835;background-color: rgba(0,0,0,0.6);
				}
				>text{
					padding: 4rpx 15rpx;position: absolute;top: 0;left:0;background-color: rgba(0,0,0,0.5);color: #fff;z-index: 99;font-size: 22rpx;
				}
			}
			>view:nth-child(2){
				font-size: 28rpx;
				padding-top: 14rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				line-clamp: 1;
				-webkit-box-orient: vertical;
			}
			>view:nth-child(3){
				font-size: 24rpx;color: #999;
			}
		}
	}
}
.Information{
	width: 700rpx;margin:20rpx auto;
	.hotTitle{
		width: 100%;height: 80rpx;line-height: 80rpx;font-size: 32rpx;color: #333;font-weight: 700;
	}
	.boxList{
		display: flex;margin-bottom: 30rpx;
		>image{
			width: 250rpx;height: 180rpx;border-radius: 10rpx;
		}
		>.zixunTilte{
			width: 430rpx; margin-left: 20rpx;line-height: 36rpx;font-size: 28rpx;color: #333;
			>view:nth-child(1){
				height: 80rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			>text{
				font-size: 0.8em;color: #999;padding-right: 40rpx;
			}
			.userInfo{
				>image{
					width: 50rpx;height: 50rpx;border: 1rpx solid #ccc;border-radius: 50%;position: relative;top: 10rpx;
				}
				>text{
					font-size: 0.8rpx;color: #666;position: relative;top: -6rpx;left: 15rpx;
				}
				
			}
		}
	}
}
</style>
