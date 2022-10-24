<template>
	<view class="content">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="item in imgList" :key="item.id" class="swiper">
				<image :src="$url+item.advImg" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<uni-search-bar @confirm="search" @input="input"></uni-search-bar>
		<view class="main">
			<view class="main-title">推荐服务</view>
			<u-grid :border="false" col="5">
				<u-grid-item v-for="(listItem,listIndex) in allList" :key="listIndex" @click="goto(listItem.serviceName)">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="$url+listItem.imgUrl" :size="36"></u-icon>
					<text class="grid-text" style="font-size: 18rpx;">{{listItem.serviceName}}</text>
				</u-grid-item>
				<u-grid-item @click="goto('全部服务')">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="avatar" :size="36"></u-icon>
					<text class="grid-text" style="font-size: 18rpx;">全部服务</text>
				</u-grid-item>
			</u-grid>
		</view>
		<button type="default" @click="test()">test</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [],
				allList: [],
				avatar:"../../static/me/all.png"
			}
		},
		onLoad() {
			this.getImg()
			this.getAll()
		},
		methods: {
			getImg() {
				const that = this
				this.$request({
					url: '/prod-api/api/rotation/list',
					method: "GET"
				}).then(res => {
					// console.log(res);
					if (res.data.code == 200) {
						this.imgList = res.data.rows
					}
				})
			},
			getAll() {
				uni.request({
					url: this.$url + '/prod-api/api/service/list',
					method: 'GET'
				}).then(res => {
					// console.log(res);
					let list = res[1]
					if (list.data.code == 200) {
						// this.allList = res[1].data.rows.sort(function(a, b) {
						// 	return b.sort - a.sort
						// })
						this.allList = res[1].data.rows
						this.allList = this.allList.slice(0, 9)
					}
					// if(res[1].data.code == 200) {
					// 	// this.allList = res.data.rows
					// 	for(let i in res[1].data.rows) {
					// 		this.allList = res[1].data.rows[i].sort(function(a,b){
					// 			return b.sort - a.sort
					// 		})
					// 	}				
					console.log(this.allList);
					// }
				})
			},
			goto(url) {
				switch(url) {
					case '看电影' : uni.navigateTo({
						url:'/pages/movie/movie'
					})
					break
					case '全部服务' : uni.switchTab({
						url:'/pages/all/all'
					})
					break
				}
			},
			test() {
				console.log(this.$url);

			}
		}
	}
</script>

<style scoped>
	.content {
		margin: 20rpx;
	}

	.swiper {
		width: 100%;
		height: auto;
	}

	.swiper image {
		width: 100%;
		height: auto;
	}
</style>
