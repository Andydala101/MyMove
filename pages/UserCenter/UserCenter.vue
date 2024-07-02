<template>
	<view style="background: #fff;">
		<view class="box_bg_img" v-if="UserData">
			<image :src="!UserData.AvertImg ? $baseURL + '/header/header_01.png' : $baseURL + UserData.AvertImg" mode="aspectFill"></image>
			<view class="bg_img"></view>
			<view class="btn_back" @click="goBack"><uni-icons type="arrow-left" color="#fff" size="25" style="position: absolute;top: 14rpx;left: 13rpx;"></uni-icons></view>
			<view class="deatils_title">
				<image :src="!UserData.AvertImg ? $baseURL + '/header/header_01.png' : $baseURL + UserData.AvertImg" mode="aspectFill" @click="AmendUser"></image>
				<view>{{UserData.Name ? UserData.Name : '未命名'}}</view>
				<view class="Intro">{{UserData.Intro ? UserData.Intro : '她/他什么也没留下！！'}}</view>
				<view class="Gender">
					<view class="d-flex a-center mark"> 
						<u-icon :name="`${UserData.Gender == 0 ? 'man':'woman'}`" size="18" :color="`${UserData.Gender == 0 ? '#3c9cff;':'#fc4a5b'}`" @click="IsEidt = true"></u-icon>
						<text style="padding-right: 4rpx;">{{UserData.Gender == 0 ? '男':'女'}}</text>
					</view>
					<view class="mark">{{UserData.Location ? UserData.Location:'暂无'}}</view>
				</view>
				<view>
					<view>
						<text style="font-size: 24rpx;margin-right:6rpx;color: #ccc;">粉丝</text><text>{{UserData.FansInt}}</text>
					</view>
					<view style="height: 24rpx;width: 2rpx;background: #fff;margin-top: 12rpx;"></view>
					<view>
						<text style="font-size: 24rpx;margin-right:6rpx;color: #ccc;">关注</text><text>{{UserData.FocusInt}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="brief">
			<uni-segmented-control style="position: relative;top: 50rpx;" @clickItem="onClickItem"
			 :current="current" :values="items" styleType="text" activeColor="#fc4a5b"></uni-segmented-control>
			 <view style="width: 680rpx;height: 1rpx;background: #eee;margin: auto;position: relative;top: 50rpx;"></view>
			<view class="p-3 mt-3">
				<view v-if="current === 0">
					<dynamicView v-for="(item,index) in dongtaiDate" :key="index" :item="item" @Submitafter="Submitafter" style="margin-bottom: 20rpx;"></dynamicView>
				</view>
				<view v-show="current === 1" class="HotMove">
					<view class="moviess">
						<image src="" mode="scaleToFill"></image>
						<view>
							<view>场景化</view>
							<view>氨基酸开了房间埃里克森放假啊看风景</view>
							<view>
								<text>佛山市地方</text>
							</view>
							<view>电影评分：
								<text>9.2</text>
								<view>购票</view>
							</view>
						</view>
					</view>
				</view>
				<view v-show="current === 2">
					<view class="font-28 text-333 my-2 d-flex a-center j-sb">
						<text>个人信息</text>
						<u-icon name="edit-pen" size="22" color="#fc4a5b" @click="IsEidt = !IsEidt" v-if="!IsEidt"></u-icon>
						<view class="Create" @click="CreateEidt()" v-else>修改</view>
					</view>
					<view class="font-24 text-999">
						<view class="d-flex a-center">
							<text>姓名：</text>
							<u--input placeholder="请输入内容" fontSize="12" v-model="UserData.Name" v-if="IsEidt"></u--input>
							<text v-else>{{UserData.Name}}</text>
						</view>
						<view class="d-flex a-center my-15">
							<text>性别：</text>
							<u-radio-group v-model="UserData.Gender" placement="column" v-if="IsEidt">
								<view class="d-flex a-center">
									<u-radio label="男" :name="0" size="16" labelSize="14" class="mr-5"></u-radio>
									<u-radio label="女" :name="1" size="16" labelSize="14"></u-radio>
								</view>
							</u-radio-group>
							<text v-else>{{UserData.Gender == 0 ? '男':'女'}}</text>
						</view>
						<view class="d-flex a-center">
							<text>年龄：</text>
							<u--input placeholder="请输入内容" fontSize="12" v-model="UserData.Age" v-if="IsEidt"></u--input>
							<text v-else>{{UserData.Age}}</text>
						</view>
						<view class="d-flex a-center mt-2">
							<text>地区：</text>
							<u--input placeholder="请输入内容" fontSize="12" v-model="UserData.Location" v-if="IsEidt"></u--input>
							<text v-else>{{UserData.Location}}</text>
						</view>
						<view class="d-flex a-center mt-2">
							<text>邮箱：</text>
							<u--input placeholder="请输入内容" fontSize="12" v-model="UserData.Email" v-if="IsEidt"></u--input>
							<text v-else>{{UserData.Email}}</text>
						</view>
					</view>
					<view class="font-28 text-333 mt-2">个人简介</view>
					<view class="textarea mt-1" v-if="IsEidt">
						<textarea placeholder="这一刻的想法..." maxlength="150" v-model="UserData.Intro"/>
						<view>{{UserData.Intro.length}}/150</view>
					</view>
					<text class="text-666 font-24" v-else>{{UserData.Intro}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				UserId:null,
				UserData: '',
				current:0,
				items:['动态','看过','资料'],
				dongtaiDate:[],
				IsEidt: false,
			}
		},
		onLoad(options) {
			this.UserId = options.UserId;
			this.GetUserDetails()
		},
		methods: {
			CreateEidt(){
				this.$api.User.CreateUser(this.UserData).then(res=>{
					if(res.Success){
						this.IsEidt = false
					}
				})
			},
			Submitafter(){
				this.GetUserDynamic()
			},
			AmendUser(){
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: cres => {
						uni.showLoading({
							title: '处理中',
							mask: true
						})
						let Arr= []
						Arr = cres.tempFilePaths
						this.uploadImg(Arr);
					},
				})
			},
			// 上传图片 APP|H5
			uploadImg(dataURL) {
				dataURL.forEach(el => {
					uni.uploadFile({
						url: this.$baseURL + '/api/UpLoadFile/UpLoadHeader',
						method: "POST",
						filePath: el,
						name: 'file',
						success: (res) => {
							uni.hideLoading()
							this.UserData.AvertImg = JSON.parse(res.data).Result
							let user = uni.getStorageSync('user')
							user.AvertImg = JSON.parse(res.data).Result
							uni.setStorageSync('user',user)
							this.$api.User.CreateUser(user).then(Row=>{
								this.GetUserDetails()
							})
						},
					})
				})
			},
			onClickItem(e){
				this.current = e.currentIndex;
			},
			goBack(){
				uni.navigateBack({
				    delta: 1
				});
			},
			//查询用户信息
			GetUserDetails(){
				this.$api.User.GetUserDetails({UserId: this.UserId}).then(res=>{
					this.UserData = res.Result;
					this.GetUserDynamic()
				})
			},
			GetUserDynamic(){
				this.$api.index.GetUserDynamic({UserId: this.UserId}).then(res=>{
					res.Result.forEach(item=>{
						item.JosnImg =  JSON.parse(item.JosnImg);
						if(item.MovieData){
							item.MovieData.Actor = JSON.parse(item.MovieData.Actor)
						}
					})
					this.dongtaiDate = res.Result
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	/deep/ .u-input{
		height: 28rpx;
	}
	.textarea{
		color: #666;border: 1rpx solid #d9d9d9;background: #f3f3f3;border-radius: 10rpx;
		position: relative;margin-bottom: 30rpx;
		textarea{
			padding: 2%;font-size: 26rpx;width: 96%;
		}
		view{
			position: absolute;right: 20rpx; bottom: 20rpx;font-size: 24rpx;color: #999;
		}
	}
	.Create{
		padding: 3rpx 20rpx;background-color: #fc4a5b;color: #fff;border-radius: 6rpx;font-size: 24rpx;
	}
.box_bg_img{
	width: 100%;height: 650rpx;position: relative;overflow: hidden;
	>image{
		width: 780rpx;height: 740rpx;-webkit-filter: blur(18rpx);filter: blur(18rpx);position: relative;top: -15rpx;left: -15rpx;
	}
	.bg_img{
		position: absolute;top: 0;z-index: 1;
		width: 780rpx;height: 740rpx;background: linear-gradient(to top, rgba(0, 0, 0,0.8), transparent);
	}
	.btn_back{
		width: 70rpx;height: 70rpx;background: rgba(0,0,0,0.6);position: absolute;top: 40rpx;left: 40rpx;border-radius: 50%;z-index: 2;
	}
	.deatils_title{
		width: 600rpx;position: absolute;left: 50%;margin-left: -300rpx;
		top: 200rpx;text-align: center;color: #fff;z-index: 3;
		image{
			width: 120rpx;height: 120rpx;border-radius: 50%;border: 4rpx solid #fff;
		}
		.Intro{
			font-size: 24rpx;color: #ddd;margin: 15rpx 30rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			line-clamp: 1;
			-webkit-box-orient: vertical;
		}
		.Gender{
			display: flex;justify-content: center;
			.mark{
				padding: 0rpx 16rpx;background: rgba(150,150,150,0.2);border: 1rpx solid #ddd ; 
				border-radius: 30rpx;color: #fff;font-size: 20rpx;margin: 0 15rpx;height: 34rpx;line-height: 34rpx;
			}
		}
		>view:nth-child(5){
			display: flex;width: 400rpx;margin:30rpx auto;font-size: 32rpx;
			>view{
				width: 50%;text-align: center;line-height: 40rpx;
			}
		}
	}
}
.brief{
	width: 100%;background: #fff;border-radius: 40rpx;position: relative;top: -40rpx;z-index: 999;padding-bottom: 80rpx;
	>.content{
		position: relative;top: 80rpx;width: 680rpx;margin: auto;
	}
	/deep/ .segmented-control__text{font-size: 30rpx!important;}
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
