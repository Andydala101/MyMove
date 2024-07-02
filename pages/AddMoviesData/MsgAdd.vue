<template>
	<view>
		<lsj-edit 
		ref="lsjEdit" 
		placeholder="输入正文"
		:maxCount="200"
		@onReady="editReady">
		    <template v-slot:btns="data">
		        <edit-btns 
		        :edit="data.edit" 
		        @click="onTabClick" 
		        @submit="save"></edit-btns>
		    </template>
		</lsj-edit>
		<view @click="btnadd">按钮</view>
	</view>
</template>

<script>
	import editBtns from '@/uni_modules/lsj-edit/components/lsj-edit/edit-btns/edit-btns.vue';
	export default {
		components: {
			editBtns
		},
		data() {
			return {
				edit: null,
				KeyWords: ''
			}
		},
		methods: {
			btnadd(){
				console.log(this.KeyWords);
			},
			// 编辑器初始化完毕，返回edit对象
			editReady(edit) {
					// 将富文本对象存放到当前页面，便于后续直接操作
					this.edit = edit;
			},
			// 演示----按钮组件点击事件
			onTabClick({name,index}) {
					switch (index){
							// 插入#话题#
							case 0:
									this.addLink();
									break;
							// @某人
							case 1:
									this.addLink2();
									break;
							default:
									break;
					}
			},
			// 演示发布
			async save() {
					// 获取插入的图片列表
					let imgs = await this.edit.getImages()
					// 判断是否允许提交
					if (!this.edit.textCount && !imgs.length) {
							uni.showToast({
									title: '请录入内容'
							});
					}

					// 将所有未上传的本地图片上传到服务器并替换到编辑器
					this.edit.replaceImage(async(img)=>{
							// 已上传的无需再上传
							// 这里没有放到edit内部去过滤，因为我觉得需不需要上传得你自己决定
							// 比如插入的base64图片是否需要上传
							// img.indexOf('http') = 0说明这个图片已经是网络地址，无需替换就直接跳过
							if(img.indexOf('http') === 0) {return img;}

							// 上传并替换图片
							/* 
									let {data} = await uni.uploadFile({
											url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
											filePath: img, //本地图片
											name: 'file',
											formData: {
													'user': 'test'
											}
									});
									return data;
							 */

							// 因为演示的时候没有服务器，所以直接换个网络图方便后续演示，
							// 实际项目应使用上方注释内容
							return 'https://t7.baidu.com/it/u=3406125714,2513313326&fm=193&f=GIF'

					}).then(res=>{
							console.log('替换完成,最终内容为',JSON.stringify(res));

							// 示例项目可查看解析富文本演示
							uni.navigateTo({
									url: '/pages/article/article?data='+escape(res.html)
							});
					}); 

			},
			// 插入话题示例
			addLink() {
					this.edit.addLink({
							prefix: '#',
							suffix: '#',
							name: '有问题欢迎加入LSJ插件交流群',
							data: {
									name: 'QQ交流群',
									qqGroupChatID: '667530868',
							}
					})
			},
			// @某人示例
			addLink2() {
					this.edit.addLink({
							prefix: '@',
							name: '马冬梅',
							data: {
									userId: 10,
							}
					})
			}
		}
	}
</script>

<style>

</style>
