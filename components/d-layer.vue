<template>
	<view>
		<u-popup :show="show" mode="bottom"  @close="show = false">
			<view class="Item">
				<view class="text-999 font-28 pb-2">正在评论<text class="text px-1" style="color: #fc4a5b;">@{{ItemData.UserName}}</text>发布的动态</view>
				<view class="textarea">
					<textarea placeholder="请输入" maxlength="500" autoHeight v-model="Content" style="padding-bottom: 80rpx;"/>
					<view>{{Content.length}}/500字</view>
				</view>
				<view class="btn" @click="Submit">发送</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"d-layer",
		data() {
			return {
				show: false,
				Content: '',
				ItemData: ''
			};
		},
		methods: {
			showModel(Item){
				this.show = true
				this.ItemData = Item
				console.log(this.ItemData)
			},
			Submit(){
				let user = uni.getStorageSync('user')
				let IsNull = true
				let obj = {
					DynamicId: this.ItemData.Id,    //关联的动态 id
					UserId: user.Id,   /*用户ID*/
					Content: this.Content, /*评论内容*/
					Pid: null,             /*评论父级Id*/
					Location: ''           /*发布的位置*/
				}
				this.ItemData.DiscussList.forEach(item=>{
					if(user.Id == item.UserId){
						item.Content = this.Content
						obj = item
					}
				})
				
				this.$api.index.CreateDiscuss(obj).then(res=>{
					if(res.Success){
						this.$emit('Submitafter')
						this.show = false
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.Item{
		padding: 30rpx;
		.textarea{
			color: #666;border: 1rpx solid #d9d9d9;background: #f3f3f3;border-radius: 10rpx;
			position: relative;margin-bottom: 30rpx;
			textarea{
				padding: 3%;font-size: 26rpx;width: 94%;
			}
			view{
				position: absolute;right: 20rpx; bottom: 20rpx;font-size: 24rpx;color: #999;
			}
		}
		.btn{
			width: 180rpx;text-align: center;float: right;
			padding: 8rpx 0;border-radius: 10rpx;font-size: 24rpx;background: #fc4a5b;color: #fff;
		}
	}

</style>