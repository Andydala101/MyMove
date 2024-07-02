<template>
	<view v-if="Data">
		<view class="box_bg_img" 
		:style="`background: linear-gradient(to top, rgba(0, 0, 0,0.9), transparent),url(${Data.Poster});
		background-size:cover`">
			<view class="btn_back" @click="goBack"><uni-icons type="arrow-left" color="#fff" size="25" style="position: absolute;top: 14rpx;left: 13rpx;"></uni-icons></view>
			<view class="deatils_title">
				<view>{{Data.Name}}</view>
				<view>{{Data.MovieClassify}} {{Data.Mins}}分钟</view>
				<view>{{Data.ReleaseDate}} ({{Data.ReleaseSite}})</view>
				<view>
					<text v-for="(item,index) in Data.MovieQuality" :key="index">{{item}}</text>
				</view>
				<uni-grid :column="3" :showBorder="false" :Boolean="false" :square="false" class="deatils_data">
					<uni-grid-item class="datalist">
						<view>{{Data.Score}}</view>
						<view>电影评分</view>
						<text></text>
					</uni-grid-item>
					<uni-grid-item class="datalist">
						<view>{{(Data.WatchCount*1) > 10000 ? (Data.WatchCount / 10000).toFixed(1) : Data.WatchCount}}</view>
						<view>{{(Data.WatchCount*1) > 10000 ? '万' : ''}}人已看</view>
						<text></text>
					</uni-grid-item>
					<uni-grid-item class="datalist">
						<view>{{(Data.BoxOffice*1) > 10000 ? (Data.BoxOffice / 10000).toFixed(1) : Data.BoxOffice}}</view>
						<view>实时票房(万元)</view>
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>
		<view class="brief">
			<view class="btn_box">
				<view @click="Misslook">
					<uni-icons type="heart" color="#666" v-if="lock" size="20" style="position: relative;top: 5rpx;margin-right: 6rpx;"></uni-icons>
					<uni-icons type="heart-filled" color="#fc4a5b" v-else size="20" style="position: relative;top: 5rpx;margin-right: 6rpx;"></uni-icons>
					<text :style="`color: ${lock ? '#666' : '#fc4a5b'};`">{{Data.kanguo}}看过</text>
					<view class="fenge"></view>
				</view>
				<view @click="lookshow">
					<uni-icons type="star" color="#666" v-if="star" size="23" style="position: relative;top: 5rpx;margin-right: 6rpx;"></uni-icons>
					<uni-icons type="star-filled" color="#3397fc" v-else size="23" style="position: relative;top: 5rpx;margin-right: 6rpx;"></uni-icons>
					<text :style="`color: ${star ? '#666' : '#3397fc'};`">{{Data.Misslook}}想看</text>
				</view>
			</view>
			<view class="jianjie"> 
				<view>剧情简介</view>
				<view :class="showtext ? 'cur' : ''" class="font-28">{{Data.DesContent}}</view>
				<view @click="showtext = !showtext">
					<view>{{showtext ? '全部展开' : '收起'}}</view>
					<image src="../../static/icon/icon.png" v-if="showtext"></image>
					<image src="../../static/icon/icon-top.png" v-else></image>
				</view>
				<uni-icons type="botton"></uni-icons>
			</view>
			<view class="hotTitle">
				<text>演员</text>
				<view class="icon_r">全部演员
					<text style="color: #fc4a5b;">({{Data.Actor.length}})</text>	
					<!-- <uni-icons type="right"></uni-icons> -->
				</view>
				<view class="actor">
					<view v-for="(item,index) in Data.Actor" :key="index">
						<image :src="item.avatar" mode="aspectFill"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="movestill">
	 			<text>剧照</text>
				<view class="icon_r">全部
					<text style="color: #fc4a5b;">({{Data.MovieStills.length}})</text>	
				</view>
				<view class="till">
					<view v-for="(items,index) in Data.MovieStills" :key="index">
						<image :src="items" mode="aspectFill" @click=" clickImg(Data.MovieStills,index)"></image>
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
				Data:null,	//请求的数据
				star:null,  //想看按钮状态
				lock:null,  //看过按钮状态
				showtext: true,
				directorList: [],
				Id: ''
			}
		},
		onLoad(options) {
			this.Id = options.Id
			this.MovieDeatils()
			
		},
		methods: {
			Misslook(){
				if(this.lock){
					this.data.kanguo= this.data.kanguo * 1 + 1
				}else{
					this.data.kanguo= this.data.kanguo * 1 - 1
				}
				this.lock = this.lock == false
				
				this.undate()
			},
			lookshow(){
				if(this.star){
					this.data.Misslook= this.data.Misslook * 1 + 1
				}else{
					this.data.Misslook= this.data.Misslook * 1 - 1
					
				}
				this.star = this.star == false
				this.undate()
			},
			undate(){
				uni.request({
					url:  this.$baseURL + "/lockUpdate",
					header: {'Content-Type': 'application/x-www-form-urlencoded'}, 
					method:'POST',
					data:{
						fid: this.data.fid,
						Misslook: this.data.Misslook,
						kanguo:this.data.kanguo,
						MissshowY: this.star == true ? 1 : 0,
						lookshowY: this.lock == true ? 1 : 0,
					},
				})
			},
			goBack(){
				uni.navigateBack({
				    delta: 1
				});
			},
			clickImg(fn,img) {
				wx.previewImage({
					urls: fn, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: img, // 当前显示图片的http链接，默认是第一个
				})
			},
			MovieDeatils(){
				this.$api.index.MovieDeatils({Id: this.Id}).then(res=>{
					// let arr = []
					res.Result.MovieStills =  JSON.parse(res.Result.MovieStills);
					res.Result.MovieQuality =  JSON.parse(res.Result.MovieQuality);
					res.Result.Actor = JSON.parse(res.Result.Actor);
					// this.directorList = arr
					this.Data = res.Result
					// this.star = this.data.MissshowY == 1 ? true : false
					// this.lock = this.data.lookshowY == 1 ? true : false
				})
			},
			UpdateMovies(){
				let obj = {
					fid: this.Id,
					director: JSON.stringify(this.directorList),
				}
				uni.request({
					url:  this.$baseURL + "/UpdateMovies",
					header: {'Content-Type': 'application/x-www-form-urlencoded'}, 
					method:'POST',
					data: obj,
					success: (res) => {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.box_bg_img{
	width: 100%;height: 820rpx;position: relative;
	.btn_back{
		width: 70rpx;height: 70rpx;background: rgba(0,0,0,0.6);position: absolute;top: 90rpx;left: 40rpx;border-radius: 50%;
	}
	.deatils_title{
		width: 100%;position: absolute;top: 420rpx;text-align: center;color: #fff;
		>view:nth-child(1){
			font-size: 1.4em;font-weight: bold;margin-bottom: 10rpx;
		}
		>view:nth-child(4){
			margin-top: 10rpx;
			>text{
				padding: 4rpx 8rpx;border: 1rpx solid #fff;border-radius: 8rpx;margin: 10rpx;
			}
		}
		>view{
			font-size: 0.8em;
		}
		.deatils_data{
			height: 100rpx;margin-top: 50rpx;
			.datalist{
				text{
					position: absolute;width: 2rpx;height: 56rpx;background: #fff;top: 20rpx;right: 0;
				}
				view:nth-child(odd){
					font-size: 1.8em;margin-bottom: 5rpx;
				}
				view:nth-child(even){
					color: #ddd;
				}
			}
		}
	}
}
.brief{
	width: 100%;height: 100%;background: #fff;border-radius: 30rpx;position: relative;top: -30rpx;
	.btn_box{
		width: 650rpx;height: 100rpx;box-shadow: 0 0 20rpx rgba(0,0,0,0.2);border-radius: 10rpx;margin: 0 auto;position: relative;top: 60rpx;display: flex;
		>view{
			width: 49.8%;text-align: center;position: relative;color: #666;line-height: 100rpx;
			>.fenge{
				width: 2rpx;height:40rpx;background: #ccc;position: absolute;right: 0;top: 30rpx;
			}
		}
	}
	.jianjie{
		margin: 0 auto;width: 700rpx;position: relative;top: 110rpx;
		>view:nth-child(1){
			font-size: 1.2em;font-weight: bold;color: #333;padding-bottom: 16rpx;
		}
		>view:nth-child(2){
			color: #666;text-indent: 48rpx;
		}
		>view:nth-child(3){
			border-top: 1rpx solid #eee;text-align: center;font-size: 0.8em;color: #999;margin-top: 30rpx;
		}
		image{
			width: 30rpx;height: 20rpx;position: relative;top: -14rpx;
		}
		.cur{
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 4;
			line-clamp: 4;
			-webkit-box-orient: vertical;
		}
	}
	.hotTitle{
		width: 700rpx;margin: 20rpx auto;line-height: 80rpx;position: relative;top: 110rpx;
		>text{
			font-size: 1.2em;color: #333;float: left;font-weight: 700;
		}
		>.icon_r{
			color: #666;float: right;
		}
		>.actor{
			width: 725rpx;overflow-y: scroll;display: flex;text-align: center;font-size: 24rpx;
			>view{
				margin: 30rpx 50rpx 0 0;
				>text{
					position: relative;top: -36rpx;color: #333;font-size: 1em;text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				line-clamp: 1;
				-webkit-box-orient: vertical;
				}
				image{
					width: 120rpx;height: 120rpx;border-radius: 50%;
				}
			}
		}
	}
	.movestill{
		width: 700rpx;margin: 120rpx auto;
		>text{
			font-size: 1.2em;color: #333;float: left;font-weight: 700;
		}
		>.icon_r{
			color: #666;float: right;
		}
		>.till{
			display: flex;width: 725rpx;overflow-y: scroll;display: flex;
			image{
				width: 230rpx;height: 150rpx;border-radius: 10rpx;margin: 30rpx 20rpx 0 0 ;
			}
		}
	}
}
</style>
