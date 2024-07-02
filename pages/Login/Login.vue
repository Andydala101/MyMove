<template>
	<view>
		<view style="height: 100rpx;"></view>
		<image src="../../static/icon/icon_79.png" style="width: 40rpx;height: 40rpx;float: right;margin-right: 50rpx;" mode="scaleToFill" @click="goBack"></image>
		<view class="logo">
			<image src="../../static/img/logo.png" mode="scaleToFill"></image>
			<view>你好，<br/>欢迎来到首影</view>
		</view>
		<view class="input">
			<input type="text" maxlength="11" v-model="user" @input="btnshow" placeholder="请输入您的账号"/>
			<input type="password" maxlength="30"  v-model="pwd" @input="btnshow" placeholder="请输入您的密码"/>
			<view>忘记密码？</view>
			<button :disabled="!loc" :class="loc ? 'cur':''" @click="login">登录</button>
			<view><navigator url="../registered/registered">还没有账号？<text>立即注册</text></navigator></view>
		</view>
		<view class="ico_bottom">
			<image src="../../static/icon/ico_03.png" mode=""></image>
			<image src="../../static/icon/ico_05.png" style="width: 46rpx;" mode=""></image>
			<image src="../../static/icon/ico_07.png" mode=""></image>
			<!-- <uni-icons type="qq" size="26" color="#666"></uni-icons>
			<uni-icons type="weixin" size="28" color="#666"></uni-icons>
			<uni-icons type="weibo" size="28" color="#666"></uni-icons> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loc:false,
				user:'',
				pwd:''
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
				    delta: 1
				});
			},
			btnshow(){
				this.loc = this.user && this.pwd
				
			},
			login(){
				let obj = {
					Phone: this.user,
					Cipher: this.pwd
				}
				this.$api.User.Login(obj).then(res=>{
					if(res.Success){
						let obj = res.Result
						uni.setStorageSync('user',obj)
						uni.showToast({
							title: '登录成功！',icon:'none'
						});
						setTimeout(()=>{
							uni.switchTab({
								url: '/pages/Home/Home'
							})
						},1000)
					}else{
						uni.showToast({
							title: '用户名密码错误！',icon: 'none'
						})
					};
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.logo{
	width: 660rpx;margin: 60rpx auto;font-size:48rpx;line-height: 70rpx;
	>image{
		width: 130rpx;height: 140rpx;margin-bottom: 20rpx;
	}
	
}
.input{
		width: 660rpx;margin:100rpx auto;font-size: 28rpx;
		>input{
			width: 640;height: 80rpx;padding-left: 50rpx;border-radius: 40rpx;
			border: 1rpx solid #ccc;font-size: 28rpx;margin-top:60rpx;color: #333;
		}
		>view:nth-child(3){
			float: right;margin: 20rpx 0;color: #999;
		}
		>button{
			width: 640;height: 90rpx;clear: both;position: relative;top: 60rpx;color: #333;
			border-radius: 45rpx;background: #e6e8ea;text-align: center;border: 1px solid #dedede;
			line-height: 90rpx;box-shadow: 0 0 30rpx rgba(0,0,0,0.1);font-size: 28rpx;
		}
		
		.cur{
			background: #fc4d5d!important;color: #fff!important;
		}
		>view:nth-child(5){
			position: relative;top: 80rpx;color: #999;
			text{
				color: #fc4d5d;
			}
		}
		/deep/ uni-button:after{border: none;}
		
	}
	.ico_bottom{
		width: 560rpx;display: flex;justify-content: space-between;
		margin: 150rpx auto;
		>image{
			width: 42rpx;height: 42rpx;
		}
	}
	
</style>
