<template>
	<view>
		<view class="header"  >
			<image :src="avatar" mode="widthFix" class="header-img" @click="login"></image>
			<view class="header-user" v-if="user">{{user.nickName}}</view>
			<view class="header-text" v-else>请点击头像登录</view>
		</view>
		<view class="list">
			<uni-list>
				<uni-list-item  title="个人信息" showArrow @click.native="goto('../info/info')"></uni-list-item>
				<uni-list-item  title="我的钱包" showArrow @click.native="goto('../bag/bag')"></uni-list-item>
				<uni-list-item  title="我的积分" showArrow @click.native="goto('../integral/integral')"></uni-list-item>
				<uni-list-item  title="我的订单" showArrow @click.native="goto('../indent/indent')"></uni-list-item>
				<uni-list-item  title="修改密码" showArrow @click.native="goto('../changPassword/changPassword')"></uni-list-item>
				<uni-list-item  title="意见反馈" showArrow @click.native="goto('../feedback/feedback')"></uni-list-item>
				<uni-list-item  title="网络设置" showArrow @click.native="goto('../setip/setip')"></uni-list-item>
			</uni-list>
		</view>
		<u-button type="primary" @click="login">登录</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:'',
				userName:'',
				avatar:'../../static/me/header.png'
			}
		},
		onLoad() {
			if(uni.getStorageSync('user').avatar) {
				this.avatar = uni.getStorageSync('user').avatar;
			}
			this.user = uni.getStorageSync('user')
			console.log(uni.getStorageSync('user'));
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url:url
				})
			},
			login() {
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			
		}
	}
</script>

<style scoped>
	.header {
		text-align: center;
		margin: 50rpx 0;
	}
.header image{
	width: 200rpx;
}
.hui {
	width: 100%;
	height: 10rpx;
}
</style>
