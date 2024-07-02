<template>
	<view>
		<view class="box">
			<view style="border-bottom: 1rpx solid #ccc; color: #3397fc;" @click="goReleaseDynamic('',0)">不显示位置</view>
			<view @click="goReleaseDynamic('重庆市',1)">重庆市</view>
			<view v-for="(item,index) in arry" :key="index" @click="goReleaseDynamic(item.ctiy,1)">
				<view style="font-size: 1.1em;">{{item.ctiy}}</view>
				<view style="color: #999;font-size: 0.8em;">{{item.text}}</view>
			</view>
		</view>
		<view class="page-section page-section-gap">
						<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
						</map>
					</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arry:[
					{ctiy:'装酷网-重庆装网科技有限公司',text:'重庆市渝北区龙溪街道龙溪红锦大道嘉州协信中心a栋'},
					{ctiy:'嘉州，协信中心',text:'重庆市渝北区红锦大道63号东南方向140米'},
					{ctiy:'重庆顶呱呱信息技术有限公司',text:'重庆市渝北区红锦大道25号嘉州协信中心A栋20楼'},
					{ctiy:'中国平安人寿保险股份有限公司(重庆分公司)',text:'重庆市渝北区红锦大道57号嘉州协信中心a座'},
					{ctiy:'丽源整形美容医院',text:'重庆市渝北区红锦大道59号嘉州协信中心A栋4-5楼'},
					{ctiy:'工银安盛人寿保险有限公司重庆分公司两江营销.',text:'工银安盛人寿保险有限公司重庆分公司两江营销.'},
					{ctiy:'工银安盛人寿保险有限公司重庆分公司两江营销.',text:'工银安盛人寿保险有限公司重庆分公司两江营销.'},
				],
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../../static/location.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../../static/location.png'
				}]
			}
		},
		onLoad() {
			this.getCurrentLocation()
		},
		methods: {
			getCurrentLocation() {
				let that = this //在uniapp中药定义一下this才能使用
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: res => {
						uni.chooseLocation({
							success: (res2) => {
								if (res2.errMsg == 'chooseLocation:ok') {
									console.log(res2);
								}
							},
							fail: (error) => {}
						})
					}
				})
			},
			goReleaseDynamic(Name,Type){
				let obj = {
					Name: Name,
					Type: Type
				}
				uni.$emit('GetLocation', obj)
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped lang="scss">
.box{
	width: 680rpx;margin:30rpx auto;
	>view{
		padding: 25rpx 0;border-bottom: 1rpx solid #e9e9e9;color: #333;
	}
}
</style>
