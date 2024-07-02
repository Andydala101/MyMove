<template>
	<view>
		<view style="height: 100rpx;"></view>
		<image src="../../static/icon/icon_79.png" style="width: 40rpx;height: 40rpx;float: right;margin-right: 50rpx;" mode="scaleToFill" @click="goBack"></image>
		<view class="logo">
			<image src="../../static/img/logo.png" mode="scaleToFill"></image>
			<view class="title">用户注册</view>
			<uni-data-checkbox multiple :localdata="range" @change="change"></uni-data-checkbox>
			<view class="xieyi">阅读并同意<text>《用户协议》</text>与<text>《隐私政策》</text></view>
		</view>
		<view class="input">
			<input type="text" maxlength="11" v-model="phone" @blur="blurPhone" placeholder="请输入您的手机号"/>
			<view>
				<text v-if="ZtaiPhone != null" :style="`color:${ZtaiPhone?'#2979ff':'#fc4d5d'}`">{{ZtaiPhone ? '该手机号可用' : '该手机号已注册'}}</text>
			</view>
			<input type="password" maxlength="30"  v-model="pwd" @blur="blurPwd" placeholder="请输入您的密码"/>
			<input type="password" maxlength="30"  v-model="cobpwd" @blur="blurPwd" placeholder="再次确认密码"/>
			<view>
				<text v-if="ZtaiPwd != null" :style="`color:${ZtaiPwd?'#2979ff':'#fc4d5d'};padding-right:10rpx`">{{ZtaiPwd ? '密码一致' : '输入的密码不一致'}}</text> 
				<text v-if="pwdLength != null" :style="`color:${pwdLength?'#2979ff':'#fc4d5d'}`">{{pwdLength?'':'密码长度不能小于6位'}}</text>
			</view>
			<input type="text" maxlength="30"  v-model="email" @blur="blurEmail" placeholder="请输入您的邮箱"/>
			<view v-if="ZtaiEmail != null" :style="`color:${ZtaiEmail?'#2979ff':'#fc4d5d'}`">{{ZtaiEmail ? '该邮箱可用' : '该邮箱已注册'}} </view>
			<button :disabled="!loc" :class="loc ? 'cur':''" @click="registered">注册</button>
			<navigator class="logs" url="../Login/Login">已有账号！前往登录</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loc:false,
				phone:'',
				pwd:'',
				cobpwd:'',
				email:'',
				range: [{"value": 0}],
				ZtaiPhone:null,
				ZtaiEmail:null,
				ZtaiPwd:null,
				pwdLength:null
			}
		},
		methods: {
			blurPhone(){
				let Ph = /^1[3-9]\d{9}$/;//验证手机号是否合法
				if(Ph.test(this.phone)){
					uni.request({
						url:  this.$baseURL + '/validationPhone',
						header: {'Content-Type': 'application/x-www-form-urlencoded'}, 
						method:'POST',
						data:{
							Phone: this.phone
						},
						success: (res) => {
							this.ZtaiPhone = res.data.Result ? false : true
						}
					})
				}else{
					this.ZtaiPhone = null
					uni.showModal({
						content: '输入手机号格式不正确！',
						showCancel: false
					});
				}
			},
			blurEmail(){
				let Errt = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //邮箱规范验证
				if(Errt.test(this.email)){
					uni.request({
						url:  this.$baseURL + '/validationPhone',
						header: {'Content-Type': 'application/x-www-form-urlencoded'}, 
						method:'POST',
						data:{
							Email:this.email
						},
						success: (res) => {
							this.ZtaiEmail = res.data.Result ? false : true
						}
					})
				}else{
					this.ZtaiEmail = null
					uni.showModal({
						content: '输入邮箱格式不正确！',
						showCancel: false
					});
				}
			},
			blurPwd(){
				this.ZtaiPwd = this.pwd == this.cobpwd ? true : false
				if(this.pwd.length >= 6 && this.cobpwd.length >= 6){
					this.pwdLength = true
				}else{
					this.pwdLength = false
				}
				
				
			},
			goBack(){
				uni.navigateBack({
				    delta: 1
				});
			},
			registered(){
				let obj = {
					Phone: this.phone,
					Cipher: this.pwd,
					Email: this.email
				}
				if(!this.ZtaiPhone){
					uni.showToast({
						title: '手机号不可用！',icon: 'none'
					})
					return
				}
				if(!this.ZtaiPwd){
					uni.showToast({
						title: '密码不一致！',icon: 'none'
					})
					return
				}
				if(!this.ZtaiEmail){
					uni.showToast({
						title: '邮箱不可用！',icon: 'none'
					})
					return
				}
				this.$api.User.CreateUser(obj).then(res=>{
					if(res.Success){
						uni.showToast({
							title: '注册成功！',icon: 'none'
						})
						setTimeout(()=>{
							this.$common.LoadPage('/pages/Login/Login')
						},1000)
					}
				})
			},
			change(e){
				this.loc = e.detail.data.length == 1
			}
		}
	}
</script>

<style scoped lang="scss">
.logo{
	width: 660rpx;margin: 60rpx auto;line-height: 70rpx;
	>image{
		width: 130rpx;height: 140rpx;margin-bottom: 20rpx;
	}
	.title{font-size: 48rpx;margin-bottom: 20rpx;}
	.xieyi{
		font-size: 24rpx;color: #999;position: relative;top: -60rpx;left: 45rpx;
		text{color: #2979ff;}
	}
}
.input{
		width: 660rpx;margin:20rpx auto;position: relative;top: -60rpx;;
		>view{
			float: right;font-size: 24rpx;margin-right: 30rpx;color: #007AFF;
		}
		>input{
			width: 640;height: 70rpx;padding-left: 50rpx;border-radius: 35rpx;
			border: 1rpx solid #ccc;font-size: 28rpx;margin-top:60rpx;color: #333;
		}
		>.logs{
			color: #999;margin: 20rpx 0;font-size: 28rpx;position: relative;top: 60rpx;padding-bottom: 60rpx;
		}
		>button{
			width: 640;height: 90rpx;clear: both;color: #333;position: relative;top: 60rpx;
			border-radius: 45rpx;background: #e6e8ea;text-align: center;border: 1px solid #dedede;
			line-height: 90rpx;font-size: 28rpx;box-shadow: 0 0 30rpx rgba(0,0,0,0.1);
		}
		
		.cur{
			background: #fc4d5d!important;color: #fff!important;border: 1px solid #fc4d5d!important;
		}
	
		/deep/ uni-button:after{border: none;}
		
	}
	
</style>
