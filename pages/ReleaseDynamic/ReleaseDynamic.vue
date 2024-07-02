<template>
	<view>
		<view style="height: 80rpx;"></view>
		<view class="header">
			<uni-icons type="back" size="28" @click="goBack()"></uni-icons>
			<view @click="onUpload">
				发布
			</view>
		</view>
		<view class="box_input">
			<view class="textarea">
				<textarea placeholder="这一刻的想法..." maxlength="150" v-model="textarea"/>
				<view>{{textarea.length}}/150</view>
			</view>
			<view class="d-flex mx-3 mb-3 flex-wrap">
				<view v-for="(item,index) in imageValue" :key="index" class="mr-3 mb-2 ItemImg">
					<image :src="`${$baseURL + item}`" mode="aspectFill"></image>
					<u-icon class="ico" name="close-circle-fill" color="#999" size="18" @click="DelImg(index)"></u-icon>
				</view>
				<view @click="chooseImages()" class="addbtn">
					<u-icon name="plus" color="#ccc" size="18"></u-icon>
				</view>
			</view>		
			<view class="movieList mx-3" v-if="show">
				<image src="../../static/icon/movie.png" mode=""></image>
				<input type="text" maxlength="18" v-model="KeyWords" @input="SearchMovies" placeholder="请输入电影名称"/>
				<!-- :style="movieN.length == 0 ? 'height: 50rpx':'height: 400rpx'" -->
				<view class="results" v-show="movieN.length != 0" :style="movieN.length > 6 ? 'height: 400rpx':'height: auto'"> 
<!-- 					<view style="padding: 0rpx;height: 50rpx;line-height: 50rpx;" v-show="movieN.length == 0">{{movieN.length == 0 ? "无该电影" : " "}}</view>
 -->				<view v-for="(item,index) in movieN" :key="index" @click="CheckMovie(item)">{{item.Name}}</view>
				</view>
			</view>
			
			<view class="moves" v-else>
				<view >
					<view class="text-333 font-28">
						{{movieDear.Name}}
						<text style="float: right;color:#fc9835 ;font-weight: bold;">{{movieDear.Score}}</text>
					</view>
					<view class="yanyuan">主演：
						<text v-for="(tex,ind) in movieDear.Actor" :key="ind" style="margin:0 8rpx;">
							{{tex.name}}
						</text>
					</view>
				</view>
				<view class="btn_delete" @click="show = true">
					<uni-icons type="closeempty" color="#fff" size="16"></uni-icons>
				</view>
				<image :src="movieDear.Poster" mode="aspectFill"></image>
			</view>
			<navigator url="../ThePosition/ThePosition">
				<view class="weizGps">			
					<uni-icons type="location" :color="rooter.Type != 0 ? '#3397fc':'#999'" size="24" style="float: left; margin-right: 10rpx;"></uni-icons>
					<view :style="rooter.Type == 1 ? 'color:#3397fc':'color:#999'">{{rooter.Type ==0 ? '所在位置' : rooter.Name}}</view>
					<uni-icons type="right" color="#999" size="22" style="float: right;"></uni-icons>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,	 //显示隐藏选择的电影状态
				rooter: '',   //位置回传参数
				KeyWords:'',	//存储输入框输入文字
				textarea:'',	//存储发布的文字
				imageValue: [],	//存储上传图片的信息
				movieN: [],		//存储后台请求的数据
				movieDear: '',//存储选择的电影信息
			}
		},
		onShow() {
			let $this = this
			uni.$once('GetLocation',function(res){ 
				$this.rooter = res
			})
		},
		methods: {
			chooseImages(){
				uni.chooseImage({
					count: 9,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: Res => {
						uni.showLoading({
							title: '处理中',
							mask: true
						})
						this.uploadImg(Res.tempFilePaths);
					},
				})
			},
			// 上传图片 APP|H5
			uploadImg(dataURL) {
				dataURL.forEach(el => {
					uni.uploadFile({
						url: this.$baseURL + '/api/UpLoadFile/profile',
						method: "POST",
						// header: {
						// 	'Authorization': 'bearer ' + uni.getStorageSync('token')
						// },
						// formData: {
						// 	info: JSON.stringify(this.watermarkdata)
						// },
						filePath: el,
						name: 'file', 
						success: (res) => {
							let Data = JSON.parse(res.data)
							this.imageValue.push(Data.Result.Url)
							uni.hideLoading()
						},
						fail: (err => {
							uni.hideLoading()
						})
					})
				})
			},
			DelImg(index){
				this.imageValue.splice(index,1)
			},
			CheckMovie(Item){
				this.show = false
				this.movieDear = Item
			},
			SearchMovies(){
				var reg = new RegExp(/\s+/g);
				this.KeyWords = this.KeyWords.replace(reg, "");
				this.$api.index.SearchMovies({keyWords: this.KeyWords}).then(res=>{
					res.Result.forEach(item=>{
						item.Actor = JSON.parse(item.Actor)
					})
					this.movieN = res.Result
				})
			},
			goBack(){
				uni.navigateBack({
				    delta: 1
				});
			},
			onUpload(){
				var myDate = new Date().toLocaleString();
				let User = uni.getStorageSync('user')
				if(!this.textarea){
					uni.showToast({
						title: '发布的内容不能为空！',icon: 'none'
					})
					return
				}
				let obj = {
					UserName: User.Name,
					UserImg: User.AvertImg,
					UserId: User.Id,
					MovieId: this.movieDear ? this.movieDear.Id : null,
					Location: this.rooter.Name, 
					JosnImg: JSON.stringify(this.imageValue),
					PublishContent: this.textarea,
				}
				this.$api.index.CreateDynamic(obj).then(res=>{
					if(res.Success){
						uni.showToast({
							title: '添加成功！',icon: 'none'
						})
						uni.navigateBack()
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
.addbtn{
	width: 150rpx;height: 150rpx;border: 2rpx solid #d9d9d9;box-sizing: border-box;border-radius: 10rpx;
	color: #d9d9d9;font-size: 36rpx;display: flex;justify-content: center;align-items: center;
}
.ItemImg{
	position: relative;
	image{
		width: 150rpx;height: 150rpx;border-radius: 10rpx;
	}
	.ico{
		position: absolute;right: -10rpx;top: -10rpx;
	}
}
.header{
	width: 680rpx;height: 100rpx;margin: auto;display: flex;justify-content: space-between;font-size: 1.15em;color: #fc4a5b;
}
.box_input{
	.textarea{
		color: #666;border: 1rpx solid #d9d9d9;background: #f3f3f3;border-radius: 10rpx;
		position: relative;margin: 0 30rpx;margin-bottom: 30rpx;
		textarea{
			padding: 2%;font-size: 26rpx;width: 96%;
		}
		view{
			position: absolute;right: 20rpx; bottom: 20rpx;font-size: 24rpx;color: #999;
		}
	}
	.movieList{
		text-align: center;padding: 36rpx 0; background-color: #e9e9e9;color: #666;position: relative;
		>image{
			width:45rpx;height: 45rpx;margin-right: 10rpx;
		}
		>input{
			width: 500rpx;padding: 12rpx 0; font-size: 1em;margin:  auto;border: 1rpx solid #ccc;border-radius: 6rpx;background: #f9f9f9;
		}
		.results{
			width: 500rpx;position: absolute;left: 88rpx;height: 400rpx;overflow-x: scroll;
			background: #f9f9f9;border: 1rpx solid #e9e9e9;border-top: none;box-shadow: 0 10rpx 30rpx rgba($color: #000000, $alpha: 0.1);
			>view{
				padding: 15rpx 0;border-bottom: 1rpx solid #e9e9e9;color: #333;
			}
		}
	}
}

/deep/ .file-picker__box{
	width: 204rpx!important;height: 160rpx;margin-right: 30rpx;padding-top:190rpx!important
}
/deep/ .file-picker__box-content{
	border-color:#ddd!important;border-style:dashed!important; width: 204rpx;height: 160rpx;
}
/deep/ .icon-add{
 	 background-color: #e6e6e6;
}
.weizGps{
	padding: 20rpx 0;border-bottom: 1rpx solid #e9e9e9;margin: 0 30rpx; font-size: 28rpx;height: 45rpx;margin-top: 30rpx;
	view{
		color: #999;width: 500rpx;text-overflow: -o-ellipsis-lastline;
				overflow: hidden;float: left;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				line-clamp: 1;
				-webkit-box-orient: vertical;
	}
}
.moves{
		width: 680rpx;height: 200rpx;background: #e9e9e9;margin: 20rpx 0;display: flex;position: relative;
		.btn_delete{
			width: 40rpx;height: 40rpx;border-radius: 20rpx; background: rgba(0,0,0,0.5);text-align: center;position: absolute;right: -15rpx;top: -15rpx;z-index: 99;
		}
		
		>view:nth-child(1){
			width: 440rpx;padding: 20rpx;
			>view:nth-child(1){
				font-size: 1.2em;
			}
		}
		>image{
			width: 160rpx;height: 160rpx;margin: 20rpx;border-radius: 6rpx;
		}
		.yanyuan{
			color: #666;margin-top: 20rpx;font-size: 24rpx;
			overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;
		}
	}
	
</style>
