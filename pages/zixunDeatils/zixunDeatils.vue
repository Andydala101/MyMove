<template>
	<view>
		<view style="height: 80rpx;"></view>
		<view class="box_deatils" v-if="data">
			<view class="titles">{{data.title}}</view>
			<view class="icons">
				<text>{{data.htimes}}发布</text>
				<text>
					<uni-icons type="eye" color="#999"></uni-icons>
					{{(data.looks * 1) >= 1000 ? (data.looks / 1000).toFixed(1)+'k' : data.looks}}
				</text>
			</view>
			<view class="userInfo">
				<image :src="data.userimg" mode="aspectFill" ></image>
				<text>{{data.username}}</text>
			</view>
			<view class="couents" v-html="data.countexts"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hid:null,
				data:null
			}
		},
		onLoad(options){
			this.hid = options.hid
			this.getData()
		},
		methods: {
			getData(){
				uni.request({
					url:  this.$baseURL + "/zixDeatils",
					header: {'Content-Type': 'application/x-www-form-urlencoded'}, 
					method:'POST',
					data:{
						hid: this.hid,
					},
					success: (res) => {
						this.data = res.data[0] ;
						console.log(this.data);
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.box_deatils{
	width: 700rpx;margin: auto;
	.titles{
		font-size: 1.3em;font-weight: bold;color: #333;
	}
	.icons{
		color: #999;margin: 20rpx 0;font-size: 0.9em;
		>text{
			margin-right: 70rpx;
		}
	}
	.userInfo{
		margin-bottom: 30rpx;
		>image{
			width: 60rpx;height: 60rpx;border: 1rpx solid #ccc;border-radius: 50%;position: relative;top: 10rpx;
		}
		>text{
			font-size: 1em;color: #666;position: relative;top: -11rpx;left: 15rpx;
		}
	}
	.couents{
		color: #333;
		>view{
			margin: 10rpox 0;
		}
	}
}
</style>
