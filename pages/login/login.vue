<template>
	<view class="login">
		<uni-forms ref="form" :model="formData">
			<uni-forms-item label="账号" label-align="right">
				<uni-easyinput type="text" v-model="formData.username" placeholder="请输入账号" />
			</uni-forms-item>
			<uni-forms-item label="密码" label-align="right">
				<uni-easyinput type="text" v-model="formData.password" placeholder="请输入密码" />
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="submit">登录</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
			submit() {
				if (this.formData.username.length == 0) {
					uni.showToast({
						title: '请先输入账号!',
						icon: 'error'
					})
				} else if (this.formData.password.length == 0) {
					uni.showToast({
						title: '请先输入密码！',
						icon: 'error'
					})
				} else {
					this.$request({
						url: '/prod-api/api/login',
						method: "POST",
						data:this.formData
					}).then(res => {
						if(res.data.code == 200) {
							this.$toast('登录成功')
							uni.setStorageSync('token',res.data.token)
							this.getInfo()
							setTimeout(function() {
								uni.navigateBack(1)
							},1000)
						}
						
					})
				}
			},
			getInfo() {
				uni.request({
					url:this.$url+'/prod-api/api/common/user/getInfo',
					method:"GET",
					header:{
						'Authorization':uni.getStorageSync('token')
					},
					success: (res) => {
						if(res.data.code == 200) {
							uni.setStorageSync('user',res.data.user)
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.login {
		margin: 30rpx;
		padding: 20rpx;
		border: 1rpx solid #ccc;
	}
</style>
