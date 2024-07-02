<template>
	<view>
		<!-- 用户信息 -->
		<view class="usertitle">
			<view class="d-flex">
				<image :src="$baseURL + item.UserImg" mode="scaleToFill"></image>
				<view class="pl-2">
					<view>{{item.UserName}}</view>
					<view class="font-24 text-999">{{item.CreateTime}}</view>
				</view>
			</view>
			<u-icon name="trash" size="22" color="#999" @click="DelDynamic(item)"></u-icon>
		</view>
		<!-- 发布的图片 -->
		<view class="centimg" v-if="item.JosnImg">
			<image :src="$baseURL + item"  mode="aspectFill" v-for="(item,index) in item.JosnImg" :key="index"></image>
		</view>
		<!-- 发布的内容 -->
		<view :class="onshow ? 'content': 'texts'">{{item.PublishContent}}</view>
		<view class="btnshow" @click="onshow = onshow ? false : true">
			{{onshow ? '展开全文': '收起'}}
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
			<image :src="item.MovieData.Poster" mode="scaleToFill"></image>
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
				<uni-icons class="icotext" type="chat" color="#333" size="22"></uni-icons>
				<text>评论</text>
			</view>
			<view>
				<uni-icons class="icotext" type="redo" color="#333" size="22"></uni-icons>
				<text>分享</text>
			</view>
		</view>
		<view class="Discuss">
			<view v-for="(row,int) in item.DiscussList" :key="int" :class="`line-h-md ${int > 0 ? 'pt-15':''}`">
				<image :src="$baseURL + row.UserImg"></image>
				<text class="text-666 pl-1">{{row.UserName}}：</text>
				<text class="text-999">{{row.Content}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object
		},
		data() {
			return {
				onshow:true,
				count:0,
			}
		},
		methods: {
			goMoveDeatils(fid){
				uni.navigateTo({
				    url: '/pages/MoveDeatils/MoveDeatils?fid=' + fid
				});
			},
			DelDynamic(item){
				uni.showModal({
					title: '确定要删除该条动态吗',
					success(res) {
						if(res.confirm){
							this.$api.index.DelDynamic({Id: item.Id}).then(res=>{
								this.$emit('Submitafter')
							})
						}
					}
				})
			},
			clickImg(fn,img) {
				wx.previewImage({
					urls: fn, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: img, // 当前显示图片的http链接，默认是第一个
				})
			},
		}
	}
</script>

<style scoped lang="scss">
		.usertitle{
			color: #333;margin: 20rpx 0;font-size: 28rpx;display: flex;justify-content: space-between; align-items: center;
			image{
				width: 70rpx;height: 70rpx;border-radius: 50%;border: 2rpx solid #ccc;position: relative; top:6rpx
			}
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
		width: 590rpx;height: 80rpx; display: flex;margin:30rpx 0 0 90rpx;justify-content:space-between;color: #333;font-size: 28rpx;
		.icotext{
			position: relative;top: 6rpx;
		}
	}
	.Discuss{
		margin-left:90rpx;background: #f6f6f6;font-size: 24rpx;padding: 10rpx 20rpx;border-radius: 10rpx;
		image{
			width: 40rpx;height: 40rpx;border-radius: 50%;position: relative;top: 10rpx;
		}
	}
</style>
