<template>
	<view>
		<view class="movesList">
			<view>
				<text>{{item.MovieClassify}}</text>
				<image :src="item.Poster" style="width:220rpx;height: 300rpx;" mode=""></image>
				<view style=" font-size: 0.8em;text-align: left;">
					<text style="padding-left: 10rpx;">
						{{(item.WatchCount * 1) >= 10000 ? (item.WatchCount / 10000).toFixed(1)+'万' : item.WatchCount}}人想看
					</text>
					<uni-icons :type="`${star ? 'star' : 'star-filled'}`" color="#fc9835" @click="star =! star" style="position: absolute;right: 10rpx;"></uni-icons>
				</view>
			</view>
			<view>{{item.Name}}</view>
			<view>{{item.ReleaseDate}}上映</view>
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
				star:null
			}
		},
		mounted(){
			this.star = this.item.showY == 1 ? true : false
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.movesList{
	>view:nth-child(1){
		height: 290rpx;width: 100%; overflow: hidden;border-radius: 10rpx;position: relative;
		>view{
			width: 100%;padding: 10rpx 0; position: absolute;bottom: 0;text-align: center;color: #fc9835;background-color: rgba(0,0,0,0.6);
		}
		>text{
			padding: 2rpx 12rpx;position: absolute;top: 0;left:0;background-color: rgba(0,0,0,0.5);color: #fff;z-index: 99;font-size: 24rpx;
		}
	}
	>view:nth-child(2){
		font-size: 28rpx;
		padding-top: 14rpx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	>view:nth-child(3){
		font-size: 24rpx;color: #999;
	}
}

</style>
