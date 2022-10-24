<template>
	<view class="guide">
		<swiper :indicator-dots="true"  :interval="3000" :duration="1000" circular style="height: 100vh;">
			<swiper-item v-for="(item,index) in imgList" :key="index" class="swiper">
				<image :src="item" mode="" ></image>
				<view class="wbp" v-if="index==imgList.length-1">
					<button @click="open" type="center">网络设置</button>
					<uni-popup ref="popup">
						<view class="wbg">
							<uni-forms ref="form">
								<uni-forms-item label="IP端口">
									<uni-easyinput v-model="ip" placeholder="IP地址和端口 如124.93.196.45:10001" />
								</uni-forms-item>
								<button type="default" @click="setip">保存</button>
							</uni-forms>
						</view>
					</uni-popup>
					<button @click="goIndex">进入主页</button>
				</view>
			</swiper-item>
		</swiper>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				ip: '',
				imgList: ['../../static/splash/splash1.jpg', '../../static/splash/splash2.jpg',
					'../../static/splash/splash3.jpg', '../../static/splash/splash4.jpg',
					'../../static/splash/splash5.jpg'
				],
			

			}
		},
		onLoad() {
			if (uni.getStorageSync('guideToken')) {
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
			// this.ip = this.$url
		},
		methods: {
			open() {
				// console.log(this.$refs.popup)
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup[0].open()
			},
			setip() {
				let that = this
				this.$url = "http://"+this.ip
				// localStorage.url = "http://"+this.ip
				this.$setip({
					url:"http://"+this.ip
				})
				this.$toast('设置成功')
				this.$refs.popup[0].close()
				// setTimeout(function() {
				// 	console.log(that.$url);
				// 	uni.reLaunch({
				// 		url:'/pages/index/index'
				// 	})
				// },1000)
			},
			goIndex() {
				uni.setStorageSync('guideToken','first')
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style scoped>
	.wbg {
		/* width: 80%; */
		/* height: 300rpx; */
		background-color: #fff;
		padding: 20rpx;
	}
.wbp {
	position: fixed;
	top: 45%;
	left: calc(50% - 100rpx);
}
	.guide {
		margin-top: -44px;
	}

	.swiper image {
		width: 100%;
		height: 700px;
	}
</style>
