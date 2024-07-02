<template>
    <!-- <view style="height: 20rpx;background-color: #F6F6F6;"></view> -->
		<view :style="{'height': height+'rpx','background': background}"></view>
</template>

<script>
	export default {
		props: {
			height: {
				type: Number,
				default: 16
			},
			background: {
				type: String,
				default: '#F9F8F8'
			},
		}
	}
</script>

<style></style>
