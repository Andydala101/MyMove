<template>
	<view>
		<view class="movesList">
			<view class="MovieImg">
				<image :src="item.Poster" mode="aspectFill"></image>
				<view class="Misslook">
					<text class="pl-2">
						{{(item.Misslook * 1) >= 10000 ? (item.Misslook / 10000).toFixed(1)+'万' : item.Misslook}}人想看
					</text>
					<uni-icons :type="`${star ? 'star':'star-filled'} `" color="#fc9835" @click="btn_star" style="position: absolute;right: 10rpx;"></uni-icons>
				</view>
			</view>
			<view class="font-28 pt-1">{{item.ReleaseDate}}</view>
			<view class="font-24 text-999">{{item.ReleaseSite}}上映</view>
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
			//console.log(this.item.MissshowY);
			this.star = this.item.MissshowY == 1 ? true : false
		},
		methods: {
			btn_star(){
				let nums = this.item.Misslook
				if(this.star){
					nums= nums * 1 + 1
				}else{
					nums= nums * 1 - 1
				}
				this.item.Misslook = nums
				this.star = this.star == false
				uni.request({
					url: this.$baseURL + "/lockUpdate",
					header: {'Content-Type': 'application/x-www-form-urlencoded'}, 
					method:'POST',
					data:{
						fid: this.item.fid,
						Misslook: this.item.Misslook,
						MissshowY: this.star == true ? 1 : 0,
					},
					success: (res) => {
						console.log(res);
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
.movesList{
	.MovieImg{
		width: 220rpx;height: 300rpx; border-radius: 10rpx;position: relative;overflow: hidden;
		image{
			width: 100%;height: 100%;
		}
		.Misslook{
			width: 100%;padding: 10rpx 0; position: absolute;bottom: 0;font-size: 24rpx;
			color: #fc9835;background-color: rgba(0,0,0,0.6);
		}
	}
	// >view:nth-child(2){
	// 	font-size: 1.1em;
	// 	padding-top: 14rpx;
	// 	text-overflow: -o-ellipsis-lastline;
	// 	overflow: hidden;
	// 	text-overflow: ellipsis;
	// 	display: -webkit-box;
	// 	-webkit-line-clamp: 1;
	// 	line-clamp: 1;
	// 	-webkit-box-orient: vertical;
	// }
	// >view:nth-child(3){
	// 	font-size: 0.8em;color: #999;
	// }
}

</style>
