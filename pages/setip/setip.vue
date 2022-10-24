<template>
	<view class="setip">
		<uni-forms ref="form">
			<uni-forms-item label="IP端口">
				<uni-easyinput v-model="ip" placeholder="IP地址和端口 如124.93.196.45:10001" />
			</uni-forms-item>
			<button type="default" @click="setip">保存</button>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ip: ''
			}
		},
		methods: {
			setip() {
				this.$url = "http://" + this.ip
				// localStorage.url = "http://"+this.ip
				this.$setip({
					url: "http://" + this.ip
				})
				this.$toast('设置成功')

				setTimeout(function() {
					uni.navigateBack(1)
				}, 1000)
			}
		}
	}
</script>

<style scoped>
	.setip {
		margin: 20rpx;
	}
</style>
