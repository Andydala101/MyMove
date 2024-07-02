<template>
	<view>
		<view class="hear_box">
			<view style="height: 80rpx;"></view>
			<uni-icons type="gear" color="#fff" size="30" style="float: right;margin-right: 35rpx;"></uni-icons>
			<view class="headerImg" @click="GoCenter">
				<image :src="!UserData.AvertImg ? $baseURL + '/header/header_01.png' : $baseURL + UserData.AvertImg" mode="scaleToFill"></image>
				<view>
					<view>{{!UserData.Name?'未登录':UserData.Name}}</view>
					<view>个性签名：{{UserData.Intro ? UserData.Intro : '她/他什么也没留下！！'}}</view>
				</view>
				<uni-icons type="right" color="#fff" size="20" style="float: right;margin-top: 38rpx;"></uni-icons>
			</view>
			<view class="box_bot">
				<view>
					<view>25</view>
					<view>粉丝</view>
				</view>
				<view>
					<view>60</view>
					<view>关注</view>
				</view>
				<view>
					<view>1</view>
					<view>话题</view>
				</view>
				<view>
					<view>53</view>
					<view>评论</view>
				</view>
			</view>
		</view>
		<view class="point">
			<view style="height: 60rpx;"></view>
			<view class="toplist">
				<view>
					<image src="../../static/icon/icon_31.png" mode="scaleToFill"></image>
					<view>消息</view>
				</view>
				<view>
					<image src="../../static/icon/icon_33.png" mode="scaleToFill"></image>
					<view>影票</view>
				</view>
				<view>
					<image src="../../static/icon/icon_35.png" mode="scaleToFill"></image>
					<view>钱包</view>
				</view>
				<view>
					<image src="../../static/icon/icon_37.png" mode="scaleToFill"></image>
					<view>优惠券</view>
				</view>
			</view>
			<view class="locDeart">
				<view>
					<text>想看的电影</text>
					<uni-icons class="ico" type="right" size="18" color="#ccc"></uni-icons>
				</view>
				<view>
					<text>看过的电影</text>
					<uni-icons class="ico" type="right" size="18" color="#ccc"></uni-icons>
				</view>
				<view>
					<text>商城订单</text>
					<uni-icons class="ico" type="right" size="18" color="#ccc"></uni-icons>
				</view>
				<view @click="toPage('DataAdd')">
					<text>电影数据添加</text>
					<uni-icons class="ico" type="right" size="18" color="#ccc"></uni-icons>
				</view>
				<view @click="toPage('MsgAdd')">
					<text>资讯数据添加</text>
					<uni-icons class="ico" type="right" size="18" color="#ccc"></uni-icons>
				</view>
				<view>
					<text>商城订单</text>
					<uni-icons class="ico" type="right" size="18" color="#ccc"></uni-icons>
				</view>
				<view>
					<text>帮助反馈</text>
					<uni-icons class="ico" type="right" size="18" color="#ccc"></uni-icons>
				</view>
				<view>
					<text>关于我们</text>
					<uni-icons class="ico" type="right" size="18" color="#ccc"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				UserData: '',
			}
		},
		onShow() {
			this.GetUserDetails()
		},
		methods: {
			GetUserDetails(){
				let user = uni.getStorageSync('user')
				this.$api.User.GetUserDetails({UserId: user.Id}).then(res=>{
					this.UserData = res.Result;
				})
			},
			toPage(keyword){
				switch(keyword){
					case 'DataAdd':
						this.$common.LoadPage('/pages/AddMoviesData/AddMoviesData')
						break;
					case 'MsgAdd':
						this.$common.LoadPage('/pages/AddMoviesData/MsgAdd')
						break;
				}
			},
			GoCenter(){
				if(!this.UserData){
					uni.navigateTo({
						url:'../Login/Login',
					})
				}else{
					uni.navigateTo({
						url:'../UserCenter/UserCenter?UserId=' + this.UserData.Id,
					})
				}
			},
		}
	}
</script>

<style scoped lang="scss">
.hear_box{
	width: 100%;height: 590rpx;background:#fc4a5b url(../../static/img/bg_img001.jpg) no-repeat 0 50rpx;background-size: 100% auto;
	.headerImg{
		margin: 140rpx auto;width: 660rpx;clear: both;
		image{
			width: 100rpx;height: 100rpx;border-radius: 50%;border: 5rpx solid #fff;float: left;
		}
		>view{
			float: left;color: #f6f6f6;font-size: 22rpx;margin-left: 20rpx;
			>view:nth-child(1){
				font-size: 32rpx;color: #fff;margin: 14rpx 0 8rpx 0;font-weight: bold;
			}
			>view:nth-child(2){
				width: 480rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				line-clamp: 1;
				-webkit-box-orient: vertical;
			}
		}
	}
	.box_bot{
		width: 100%;margin:auto;clear: both;display: flex;color: #fff;position: relative;top: 60rpx;
		>view{
			width: 25%;color: #eee;text-align: center;font-size: 24rpx;
			>view:nth-child(1){
				font-size: 40rpx;color: #fff;margin-bottom: 6rpx;
			}
		}
	}
}
.point{
	width: 100%;height: 100%;padding-bottom: 120rpx; background: #fff;border-radius: 55rpx;position: relative;top: -55rpx;
	border-bottom-left-radius: 0;border-bottom-right-radius: 0;
	.toplist{
		text-align: center;display: flex;font-size: 28rpx;
		>view{
			width: 25%;color: #333;
		}
		image{width: 56rpx;height: 45rpx;}
	}
	.locDeart{
		width: 640rpx;margin:30rpx auto;font-size: 30rpx;color: #333;
		>view{
			padding: 28rpx 0;border-bottom: 1rpx solid #f3f3f3;
			.ico{float: right;}
		}
	}
}
</style>
