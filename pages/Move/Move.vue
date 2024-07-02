<template>
	<view>
		<view style="height: 80rpx;"></view>
		<view class="title_gps">
			<view class="gps">
				<image src="../../static/icon/icon_52.png"></image>
				<text>重庆</text>
			</view>
			<view class="movies">
				<uni-segmented-control style="position: relative;top: -4rpx;" :current="current" :values="items" @clickItem="current = current == 1 ? 0 : 1" styleType="button" activeColor="#fc4a5b"></uni-segmented-control>
			</view>
			<view>
				<image src="../../static/icon/icon_Search.png" style="width: 40rpx;height: 40rpx;margin-top: 10rpx;" mode=""></image>
			</view>
		</view>
		<view class="content">
		    <view v-show="current === 0">
					<uni-segmented-control :current="curNum" :values="movieArr" styleType="text" @clickItem="getMoveHot" activeColor="#fc4a5b"></uni-segmented-control>
					<view style="border-bottom: 1rpx solid #eee;"></view>
					<view v-if="curNum == 0" class="HotMove">
						<view v-for="(item,index) in HotmoveData" :key="index" class="moviess">
							<image :src="item.Poster" mode="aspectFill" @click="goMoveDeatils(item.Id)"></image>
							<view>
								<view @click="goMoveDeatils(item.Id)">{{item.Name}}</view>
								<view>{{item.MovieClassify}}</view>
								<view>
									<text v-for="(row,index) in item.MovieQuality" :key="index">{{row}}</text>
								</view>
								<view>电影评分：
									<text>{{item.Score}}</text>
									<view>购票</view>
								</view>
							</view>
						</view>
					</view>
					<view v-else class="HotMove">
						<view style="font-size: 1.2em;color: #333;font-weight: 700;margin-bottom: 24rpx;">近期热门</view>
						<view class="moveLists">
							<MoveComponent v-for="(item,index) in toDayMovie" :key="index" :item='item' :index='index'></MoveComponent>
						</view>
						<!-- 日期分类 -->
						<u-empty mode="data" text="暂无数据" v-if="DateTimemove.length == 0"></u-empty>
						<view  v-for="(item,index) in DateTimemove" :key="index" >
							<view style="font-size: 1.1em;color: #333;font-weight: 700;margin-bottom: 8rpx;">{{item.DateTitle}}</view>
							<view v-for="(item,index) in item.List" :key="index" class="moviess">
								<image :src="item.Poster" mode="aspectFill" @click="goMoveDeatils(item.Id)"></image>
								<view>
									<view @click="goMoveDeatils(item.Id)">{{item.Name}}</view>
									<view>{{item.MovieClassify}}</view>
									<view>
										<text v-for="(row,index) in item.MovieQuality" :key="index">{{row}}</text>
									</view>
									<view>
										<text style="font-size: 1.2em;padding-right: 6rpx;">
											{{(item.Misslook * 1) >= 10000 ? (item.Misslook / 10000).toFixed(1)+'万' : item.Misslook}}
										</text>人想看
										<view style="background: #3397fc;">想看</view>
									</view>
								</view>
							</view>	
						</view>
					</view>
			</view>
		    <view v-show="current === 1">
		      选项卡2的内容
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				star:null,
				current:0,
				curNum: 0,
				movieArr:['即将上映','正在上映'],
				items:['电影','影院'],
				HotmoveData: [],
				toDayMovie: [],
				DateTimemove: []
			}
		},
		onLoad(options) {
			this.getMoveHot()
		},
		methods: {
			goMoveDeatils(Id){
				this.$common.LoadPage('/pages/MoveDeatils/MoveDeatils?Id=' + Id)
			},
			getMoveHot(e){
				this.HotmoveData = []
				this.curNum = e ? e.currentIndex : this.curNum
				this.$api.index.GetMovieList({IsBeon: this.curNum}).then(res=>{
					let DateList = []
					res.Result.forEach(item=>{
						item.MovieQuality =  JSON.parse(item.MovieQuality)
						if(this.curNum == 1){
							let IsNull = false
							DateList.forEach(row=>{
								if(row.DateTitle == item.ReleaseDate){
									IsNull = true
									row.List.push(item)
								}
							})	
							if(!IsNull){
								let obj = {
									DateTitle: item.ReleaseDate,
									List: []
								}
								obj.List.push(item)
								DateList.push(obj)
							}
						}
					})
					this.HotmoveData = res.Result
					if(this.curNum == 1){
						this.toDayMovie = res.Result.sort(this.compare('Misslook'))
						DateList.sort(function(a,b){
							return Date.parse(a.DateTitle) - Date.parse(b.DateTitle);
						})
						this.DateTimemove = DateList
					}
				})
			},
			compare(property){
				return function(a,b){
					var value1 = a[property];
					var value2 = b[property];
					return value2 - value1;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.title_gps{
	width: 680rpx;height: 100rpx;margin:auto; display: flex;justify-content:space-between;
	>.gps{
		height: 60rpx;line-height: 60rpx;color: #333;font-size: 26rpx;
		image{
			position: relative;top: 10rpx;width: 34rpx;height: 40rpx;margin-right: 10rpx;
		}
	}
	>.movies{
		width: 260rpx;height: 60rpx;overflow: hidden;border-radius: 30rpx;border: 3rpx solid #fc4a5b;box-sizing: border-box;
	}
}
.HotMove{
	width: 680rpx;margin: 30rpx auto;
	.moveLists{
		width: 725rpx;height: 400rpx;margin-bottom: 40rpx;display: flex;overflow-y: scroll;
		>view{
			margin-right: 20rpx;width: 260rpx;
		}
	}
	.moviess{
		display: flex;margin-bottom: 30rpx;position: relative;
		>view{
			margin-left: 20rpx;font-size: 24rpx;color: #666;				
			>view:nth-child(1){
				font-size: 28rpx;color: #333;font-weight: bold;
			}
			>view:nth-child(2){
				margin: 8rpx 0;
			}
			>view:nth-child(3){
				>text{
					padding: 2rpx 8rpx;border: 1rpx solid #ccc;border-radius: 6rpx;font-size: 16rpx;margin-right: 15rpx;color: #aaa;
				}
			}
			>view:nth-child(4){
				margin-top: 32rpx;font-size: 0.8em;
				>text{
					color: #fc9835;font-size: 1.4em;font-weight: bold;
				}
				>view{
					position: absolute;bottom:10rpx;right: 0;padding: 3rpx 20rpx;background-color: #fc4a5b;color: #fff;border-radius: 6rpx;font-size: 1em;
				}
			}
		}
		image{width: 190rpx;height: 210rpx;border-radius: 14rpx;}
	}
}
</style>
