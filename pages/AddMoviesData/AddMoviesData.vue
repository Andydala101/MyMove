<template>
	<view>
		<view class="mx-3">
			<view class="Item border-bottom">
				<view class="txt">电影名称：</view>
				<input type="text" class="font-28" placeholder-class="font-28 text-999" placeholder="请输入" v-model="DataIfo.Name"/>
			</view>
			<view class="Item border-bottom">
				<view class="txt">电影评分：</view>
				<input type="text" class="font-28" placeholder-class="font-28 text-999" maxlength="4" placeholder="请输入" v-model="DataIfo.Score"/>
			</view>
			<view class="Item border-bottom">
				<view class="txt">是否上映：</view>
				<u-radio-group v-model="DataIfo.IsBeon" placement="column" >
					<view class="d-flex">
						<u-radio labelSize="12px" label="正在上映" :name="1" style="margin-right: 100rpx;"> </u-radio>
						<u-radio labelSize="12px" label="即将上映" :name="0" > </u-radio>
					</view>
				</u-radio-group>
			</view>
			<view class="Item border-bottom">
				<view class="txt">电影票房：</view>
				<input type="text" class="font-28" placeholder-class="font-28 text-999" placeholder="请输入" maxlength="12" v-model="DataIfo.BoxOffice"/>
				<text>元</text>
			</view>
			<view class="Item border-bottom">
				<view class="txt">电影时长：</view>
				<input type="text" class="font-28" placeholder-class="font-28 text-999" placeholder="请输入" maxlength="12" v-model="DataIfo.Mins"/>
				<text>分钟</text>
			</view>
			<view class="Item border-bottom">
				<view class="txt">上映地区：</view>
				<input type="text" class="font-28" placeholder-class="font-28 text-999" placeholder="请输入" maxlength="12" v-model="DataIfo.ReleaseSite"/>
			</view>
			<view class="Item border-bottom">
				<view class="txt">电影类型：</view>
				<view class="d-flex flex-wrap w-75">
					<view v-for="(item,index) in LabelList" @click="CheckMovieClassify(item)" :class="`itemType ${item.isCheck ? 'cur':''}`":key="index">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="Item border-bottom">
				<view class="txt">上映日期：</view>
				<u-calendar :show="showDate" mode="single" @confirm="confirmDate" @close="showDate = false"></u-calendar>
				<view class="d-flex j-sb w-75" @click="showDate = true">
					<text :class="`${DataIfo.ReleaseDate ? 'text-666':'text-999'}`">{{DataIfo.ReleaseDate ? DataIfo.ReleaseDate : '请选择日期'}}</text>
					<u-icon name="arrow-right" color="#ccc" size="18"></u-icon>
				</view>
			</view>
			<view class="Item border-bottom">
				<view class="txt">观看人数：</view>
				<input type="text" class="font-28" placeholder-class="font-28 text-999" placeholder="请输入" maxlength="12" v-model="DataIfo.WatchCount"/>
			</view>
			<view class="Item border-bottom">
				<view class="txt">想看人数：</view>
				<input type="text" class="font-28" placeholder-class="font-28 text-999" placeholder="请输入" maxlength="12" v-model="DataIfo.Misslook"/>
			</view>
			<view class="Item border-bottom">
				<view class="txt"> 
					画<view style="display: inline-block;width: 56rpx;"></view>质：
				</view>
				<view class="d-flex flex-wrap w-75">
					<view v-for="(item,index) in ScreenList" @click="CheckScreen(item)" :class="`itemType ${item.isCheck ? 'cur':''}`":key="index">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="Item border-bottom" style="display: flex;align-items:flex-start;">
				<view class="txt mt-2">
					演<view style="display: inline-block;width: 56rpx;"></view>员：
				</view>
				<view class="d-flex flex-wrap w-75">
					<view v-for="(item,index) in Actor" :key="index" class="Actor">
						<image :src="item.avatar" mode="aspectFill"></image>
						<input type="text" class="font-24" placeholder-class="font-24 text-999" placeholder="请输入" maxlength="12" v-model="item.name"/>
					</view>
					<view class="addUser" @click="chooseImages('head')">
						<u-icon name="plus" color="#ccc" size="18"></u-icon>
					</view>
				</view>
			</view>
			<view class="Item border-bottom" style="display: flex;align-items:flex-start;">
				<view class="txt mt-2">
					剧<view style="display: inline-block;width: 56rpx;"></view>照：
				</view>
				<view class="d-flex flex-wrap w-75">
					<view v-for="(item,index) in MovieStills" :key="index" class="Actor">
						<image :src="item" mode="aspectFill"></image>
					</view>
					<view class="addUser" @click="chooseImages('MovieStills')">
						<u-icon name="plus" color="#ccc" size="18"></u-icon>
					</view>
				</view>
			</view>
			<view class="Item border-bottom" style="display: flex;align-items:flex-start;">
				<view class="txt">
					电影海报：
				</view>
				<view class="d-flex flex-wrap w-75">
					<view class="Poster" v-if="DataIfo.Poster">
						<image :src="DataIfo.Poster" mode="aspectFill"></image>
					</view>
					<view class="addUser" @click="chooseImages('Poster')" v-if="!DataIfo.Poster">
						<u-icon name="plus" color="#ccc" size="18"></u-icon>
					</view>
				</view>
			</view>
			<view class="Item">
				<view class="txt">电影介绍：</view>
				<view class="textarea w-75">
					<textarea placeholder="请输入" maxlength="500" v-model="DataIfo.DesContent"/>
					<view>{{DataIfo.DesContent.length}}/500字</view>
				</view>
			</view>
		</view>
		<d-divider :height="140"></d-divider>
		<view class="SubmitData">
			<view @click="SubmitData()">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				LabelList: [
					{key: 0,isCheck: false,name:'动作'},{key: 1,isCheck: false,name:'科幻'},{key: 2,isCheck: false,name:'犯罪'},
					{key: 3,isCheck: false,name:'奇幻'},{key: 4,isCheck: false,name:'剧情'},{key: 5,isCheck: false,name:'战争'},
					{key: 6,isCheck: false,name:'神话'},{key: 7,isCheck: false,name:'古装'},{key: 8,isCheck: false,name:'喜剧'},
				],
				ScreenList: [
					{key: 0,isCheck: false,name:'3D'},{key: 1,isCheck: false,name:'3D巨幕'},{key: 2,isCheck: false,name:'3DIMAX'},
					{key: 2,isCheck: false,name:'2DIMAX'},{key: 2,isCheck: false,name:'2D'},
				],
				checkScreen: [],
				showDate: false,
				checkArry: [],
				DataIfo: {
					Name: '', //电影名称
					Score: '',	//电影评分
					IsBeon: 0, //是否上映
					BoxOffice: '', //票房
					Mins: '', //时长
					ReleaseSite: '', //上映地区
					MovieClassify: '', //电影类型标签
					ReleaseDate: '', //上映日期
					WatchCount: '', //观看人数
					Misslook: '', //想看人数
					MovieQuality: [], //银幕
					Actor: [], //演员
					MovieStills: [], //剧照
					Poster: '',
					DesContent: '', //电影简介
				},
				MovieStills: [],
				Actor: []
			}
		},
		methods: {
			//数据提交
			SubmitData(){
				this.DataIfo.MovieStills = JSON.stringify(this.DataIfo.MovieStills)
				this.DataIfo.MovieQuality = JSON.stringify(this.DataIfo.MovieQuality)
				this.DataIfo.Actor = this.Actor
				this.DataIfo.Actor = JSON.stringify(this.DataIfo.Actor)
				this.$api.index.CreateMovie(this.DataIfo).then(res=>{
					if(res.Success){
						uni.showToast({
							title: '编辑成功！',icon: 'none'
						})
						uni.navigateBack()
					}
				})
			},
			//上传剧照以及电影海报
			chooseImages(keywords){
				uni.chooseImage({
					count: keywords == 'MovieStills' ? 20 : 1,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: cres => {
						uni.showLoading({
							title: '处理中',
							mask: true
						})
						let Arry = cres.tempFilePaths;
						this.uploadImg(Arry,keywords);
					},
					fail: (err) => {
				
					}
				})
			},
			// 上传图片 APP|H5
			uploadImg(dataURL,keywords) {
				dataURL.forEach(el => {
					uni.uploadFile({
						url: this.$baseURL + '/api/UpLoadFile/UpLoadActorHead',
						method: "POST",
						filePath: el,
						name: 'file',
						success: (res) => {
							let Data = JSON.parse(res.data)
							switch(keywords){
								case 'head':
									this.Actor.push({
										avatar: this.$baseURL + Data.Result,
										name: '',
									})
									this.DataIfo.Actor.push({
										avatar: this.$baseURL + Data.Result,
										name: '',
									})
									break;
								case 'MovieStills':
									this.MovieStills.push(this.$baseURL + Data.Result)
									this.DataIfo.MovieStills.push(this.$baseURL + Data.Result)
									break;
								case 'Poster':
									this.DataIfo.Poster = this.$baseURL + Data.Result
									break;
							}
							
							uni.hideLoading()
						},
						fail: (err => {
							uni.hideLoading()
						})
					})
				})
			},
			//选择画质
			CheckScreen(item){
				item.isCheck = !item.isCheck
				let IsNull = false
				let Index = 0
				this.DataIfo.MovieQuality.forEach((row,int)=>{
					if(item.name == row){
						IsNull = true
						Index = int
					}
				})
				if(IsNull){
					this.DataIfo.MovieQuality.splice(Index,1)
				}else{
					this.DataIfo.MovieQuality.push(item.name)
				}
				// this.DataIfo.MovieQuality = this.checkScreen.join('/')
			},
			//选择上映日期
			confirmDate(e){
				this.DataIfo.ReleaseDate = e[0]
				this.showDate = false
			},
			//选择电影类型
			CheckMovieClassify(item){
				item.isCheck = !item.isCheck
				let IsNull = false
				let Index = 0
				this.checkArry.forEach((row,int)=>{
					if(item.name == row){
						IsNull = true
						Index = int
					}
				})
				if(IsNull){
					this.checkArry.splice(Index,1)
				}else{
					this.checkArry.push(item.name)
				}
				this.DataIfo.MovieClassify = this.checkArry.join('/')
			}
		}
	}
</script>
<style>
	page{
		background: #fff;
	}
</style>
<style lang="scss" scoped>
.SubmitData{
	position: fixed;bottom: 0;left: 0;
	width: 100%;height: 140rpx;background: #fff;box-shadow: 0 0 18rpx rgba(0, 0, 0, 0.1);
	view{
		margin: 30rpx;height: 80rpx;background: #fc4a5b;color: #fff;border-radius: 10rpx;text-align: center;
		line-height: 80rpx;font-size: 28rpx;
	}
}
.Item{
	display: flex;align-items: flex-start;padding: 30rpx 0;font-size: 28rpx;
	.txt{
		color: #333;width: 25%;
	}
	.itemType{
		font-size: 24rpx;color: #666;padding: 2rpx 20rpx;border-radius: 4rpx;background: #f6f6f6;
		margin-right: 20rpx;margin-bottom: 20rpx;
		&.cur{
			background: #fc4a5b;color: #fff;
		}
	}
	.addUser{
		width: 90rpx;height: 90rpx;border: 2rpx solid #e3e3e3;border-radius: 50%;display: flex;
		align-items: center;justify-content: center;box-sizing: border-box;margin:0 15rpx;
	}
	.Actor{
		width: 120rpx;text-align: center;margin-bottom: 30rpx;
		image{
			width: 90rpx;height: 90rpx;border-radius: 50%;
		}
		input{
			width: 110rpx;margin: auto;color: #666;
		}
	}
	.Poster{
		image{
			width: 360rpx;height: 240rpx;border-radius: 10rpx;
		}
	}
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
}
</style>
