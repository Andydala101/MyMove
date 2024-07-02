<template>
	<view>
		<view style="height: 80rpx;"></view>
		<view class="kapian">
			<view :class="count == 0 ? 'cur' : ''" @click="count = 0"><text>推荐</text></view>
			<view :class="count == 1 ? 'cur' : ''" @click="count = 1"><text>最新</text></view>
			<view :class="count == 2 ? 'cur' : ''" @click="count = 2"><text>关注</text></view>
			<view @click="toReleaseDynamic">
				<image src="../../static/icon/icon_56.png" mode="scaleToFill"></image>
			</view>
		</view>
		<!-- 推荐 -->
		<view v-show="count == 0" class="boxs_view" v-if="ZixunData">
			<view class="HotTopic">
				<text>热门资讯</text>
				<text>全部资讯<uni-icons type="right" color="#999"></uni-icons></text>
			</view>
			<view class="topic_img">
				<view v-for="(item,index) in ZixunData" :key="index" :style="`background: linear-gradient(to top, rgba(0, 0, 0,0.7), transparent),url(${item.img});background-size: cover;`">
					<view>
						<text>{{item.states}}</text>
						<view class="titles"># {{item.title}}</view>
						<view class="userInfo">
							<image :src="item.userimg" mode="aspectFill" ></image>
							<text style="font-size: 24rpx;">{{item.username}}</text>
							<view>
								<uni-icons type="eye" color="#ccc"></uni-icons>
								<text style="position: relative;top: -4rpx;left: 4rpx;">{{(item.looks * 1) >= 1000 ? (item.looks / 1000).toFixed(1)+'k' : item.looks}}阅读</text>
							</view>
						</view>
					</view>		
				</view>
			</view>
			<!-- ============ 热门动态 ============-->
			<view class="HotTopic">
				<text>热门动态</text>
				<text>查看更多<uni-icons type="right" color="#999"></uni-icons></text>
			</view>
			
			<view class="dynamic">
				<view v-for="(item,index) in dynamicData" :key="index" style="margin-bottom: 40rpx;">
					<!-- 用户信息 -->
					<view class="usertitle">
						<image :src="`${$baseURL + item.UserImg}`" mode="scaleToFill" @click="$common.LoadPage('/pages/UserCenter/UserCenter?UserId='+ item.UserId)"></image>
						<view>
							<view>{{item.UserName}}</view>
							<view>{{item.CreateTime}}</view>
						</view>
						<view @click="item.IsFocus = item.IsFocus ? false : true" :class="item.IsFocus ? 'curs':''" v-if="!item.IsMine">
							<uni-icons type="plusempty" size="13" :color="item.IsFocus ? '#fff' : '#fc4a5b'"></uni-icons> 
							<text :style="`color: ${item.IsFocus ? '#fff':'#fc4a5b'};`">{{item.IsFocus ? '已关注' : '关注'}}</text>
						</view>
					</view>
					<!-- 发布的图片 -->
					<view class="centimg" v-if="item.JosnImg">
						<image :src="`${$baseURL + itemss}`" mode="aspectFill" v-for="(itemss,int) in item.JosnImg" :key="int" @click="clickImg(int , item.JosnImg)"></image>
					</view>
					<!-- 发布的内容 -->
					<view :class="item.IsShow ? 'texts': 'content'">{{item.PublishContent}}</view>
					<view class="btnshow" @click="item.IsShow =! item.IsShow">
						{{!item.IsShow ? '展开全文': '收起'}}
					</view>
					<!-- 电影名称 -->
					<view class="moves" @click="goMoveDeatils(item.MovieData.Id)" v-if="item.MovieData">
						<view >
							<view style="color: #333;">
								{{item.MovieData.Name}}
								<text style="float: right;color:#fc9835 ;font-weight: bold;">{{item.MovieData.Score}}</text>
							</view>
							<view class="yanyuan">主演：
								<text v-for="(tex,ind) in item.MovieData.Actor" :key="ind" style="margin:0 8rpx;">
									{{tex.name}}
								</text>
							</view>
						</view>
						<image :src="item.MovieData.Poster" mode="aspectFill"></image>
					</view>
					<!--发布位置 -->
					<view class="ctiygps" v-if="item.Location">
						<uni-icons type="location" color="#999" size="18" style="position: relative;top: 5rpx;"></uni-icons>
						{{item.Location}}
					</view>
					<!-- 点赞评论区 -->
					<view class="givelike">
						<view>
							<uni-icons class="icotext" type="heart" color="#333" size="20"></uni-icons>
							<text>点赞</text>
						</view>
						<view>
							<uni-icons class="icotext" type="chat" color="#333" size="22" @click="toLayer(item)"></uni-icons>
							<text>评论</text>
						</view>
						<view>
							<uni-icons class="icotext " type="redo" color="#333" size="22"></uni-icons>
							<text>分享</text>
						</view>
					</view>
					<view class="Discuss" v-if="item.DiscussList.length > 0">
						<view v-for="(row,int) in item.DiscussList" :key="int" :class="`line-h-md ${int > 0 ? 'pt-15':''}`">
							<image :src="$baseURL + row.UserImg"></image>
							<text class="text-666 pl-1">{{row.UserName}}：</text>
							<text class="text-999">{{row.Content}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 最新 -->
		<view v-show="count == 1">最新</view>
		<!-- 关注 -->
		<view v-show="count == 2">关注</view>
		<Dlayer ref="Layer" @Submitafter="getdynamicData()"></Dlayer>
	</view>
</template>

<script>
	import Dlayer from "@/components/d-layer.vue"
	export default {
		components: {
			Dlayer
		},
		data() {
			return {
				count:0,
				ZixunData:null,
				dynamicData:null
			}
		},
		onShow() {
			this.getZixunData()
			this.getdynamicData()
		},
		methods: {
			toLayer(Item){
				this.$refs.Layer.showModel(Item)
			},
			goMoveDeatils(Id){
				this.$common.LoadPage('/pages/MoveDeatils/MoveDeatils?Id=' + Id)
			},
			getZixunData(){
				this.$api.index.zixunList().then(res=>{
					this.ZixunData = res.Result
				})
			},
			clickImg(fn,ImgArry) {
				let newArry = []
				ImgArry.forEach(item=>{
					newArry.push(this.$baseURL + item)
				})
				uni.previewImage({
					urls: newArry, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: fn, // 当前显示图片的http链接，默认是第一个
				})
			},
			getdynamicData(){
				let user = uni.getStorageSync('user')
				this.$api.index.alldynamic().then(res=>{
					res.Result.forEach(item=>{
						item.IsShow = false
						item.IsFocus = false
						item.JosnImg =  JSON.parse(item.JosnImg);
						item.IsMine = false
						if(item.UserId == user.Id){
							item.IsMine = true
						}
						if(item.MovieData){
							item.MovieData.Actor = JSON.parse(item.MovieData.Actor)
						}
					})
					this.dynamicData = res.Result
				})
			},
			toReleaseDynamic(){
				this.$common.LoadPage('/pages/ReleaseDynamic/ReleaseDynamic')
			}
		}
	}
</script>
<style>
	page{
		background: #fafafa;
	}
</style>

<style scoped lang="scss">
.kapian{
	font-size: 28rpx;display: flex;color: #333;width: 680rpx;margin: 0 auto;position: relative;
	>view{
		margin-right: 20rpx;color: #333;font-weight: bold;
		>text{
			width: 60rpx;display: inline-block;
		}
	}
	.cur{
		width: 40rpx; font-size: 32rpx;color: #fc4a5b;position: relative;top: -6rpx;border-bottom: 4rpx solid #fc4a5b;padding-bottom: 10rpx;margin:0 40rpx 0 12rpx;
		>text{
			width: 80rpx;position: relative; left:-12rpx
		}
	}
	image{
		width: 36rpx;height: 36rpx;position: absolute;right: 0;
	}
}
.boxs_view{
	width: 680rpx;margin: 40rpx auto;
	.HotTopic{
		display: flex; justify-content:space-between;height: 40rpx;line-height: 40rpx;
		>text:nth-child(1){
			font-size: 30rpx;color: #333;font-weight: bold;
		}
		>text:nth-child(2){
			font-size: 24rpx;color: #999;
		}
	}
	.topic_img{
		width: 715rpx;height: 340rpx;margin: 20rpx 0 50rpx 0; display: -webkit-box;overflow-y: scroll;border-radius: 10rpx;
		>view{
			width: 680rpx;height: 340rpx;margin-right: 20rpx;border-radius: 10rpx;position: relative;
			>view{
				position: absolute;bottom: 30rpx;left: 50rpx;color: #fff;
				>text{
					padding: 3rpx 8rpx;background: #fc4a5b;border-radius: 4rpx;font-size: 24rpx;
				}
				>.titles{
					font-size: 30rpx;margin-bottom: 15rpx;
					width: 420rpx;text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					line-clamp: 1;
					-webkit-box-orient: vertical;
				}
				>.userInfo{
					>image{
						width: 40rpx;height: 40rpx;border: 1rpx solid #ccc;border-radius: 50%;position: relative;top: 10rpx;border: 3rpx solid #fff;
					}
					>text{
						font-size: 24rpx;position: relative;top: -6rpx;left: 15rpx;
					}
					>view{
						display: inline-block;margin-left: 100rpx;font-size: 24rpx;color: #ccc;
					}
				}
			}
			
		}
	}
	
	
		
	
}
.usertitle{
			color: #333;margin: 20rpx 0;font-size: 28rpx;
			>image{
				width: 70rpx;height: 70rpx;border-radius: 50%;border: 2rpx solid #ccc;position: relative; top:6rpx
			}
			>view:nth-child(2){
				display: inline-block;font-size: 1.1em;margin-left: 20rpx;
				>view:nth-child(2){
					font-size: 24rpx;color: #999;
				}
			}
			>view:nth-child(3){
				float: right;padding: 0rpx 15rpx; border: 2rpx solid #fc4a5b;color: #fc4a5b;
				border-radius: 25rpx;font-size: 24rpx;margin-top: 15rpx;
			}
			.curs{background:#fc4a5b ;}
		}
		.texts{
			width: 590rpx;margin-left: 90rpx;font-size: 28rpx;
		}
		.content{
			width: 590rpx;margin-left: 90rpx;font-size: 28rpx;
			overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;line-clamp: 3;-webkit-box-orient: vertical;
		}
		.btnshow{
			color: #fc4a5b;margin:10rpx 0 0 90rpx;font-size: 28rpx;
		}
	
	.moves{
		width: 590rpx;height: 150rpx;background: #e9e9e9;margin: 20rpx 0 0 90rpx;display: flex;border-radius: 10rpx;
		>view{
			width: 400rpx;padding: 15rpx;font-size: 28rpx;
		}
		>image{
			width: 120rpx;height: 120rpx;margin: 15rpx;border-radius: 6rpx;
		}
		.yanyuan{
			color: #666;font-size: 24rpx;
			overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;
		}
	}
	.centimg{
		width: 606rpx;margin: 10rpx 0 20rpx 90rpx;
		>image{
			width: 186rpx;height: 186rpx;border-radius: 8rpx;margin: 8rpx 0;margin-right: 16rpx;
		}
	}
	.ctiygps{
		height: 60rpx;line-height: 70rpx;color: #999;margin:12rpx 0 0 90rpx;font-size: 24rpx;;
	}
	.givelike{
		display: flex;margin:30rpx 0 0 90rpx;justify-content:space-between;color: #333;font-size: 28rpx;
		.icotext{
			position: relative;top: 6rpx;
		}
	}
	.Discuss{
		margin:30rpx 0 0 90rpx;background: #ececec;font-size: 24rpx;padding: 10rpx 20rpx;border-radius: 10rpx;
		image{
			width: 40rpx;height: 40rpx;border-radius: 50%;position: relative;top: 10rpx;
		}
	}
</style>
