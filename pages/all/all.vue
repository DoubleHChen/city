<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.getAll()
		},
		methods: {
			getAll() {
				uni.request({
					url:this.$url+'/prod-api/api/service/list',
					method:"GET"
				}).then(res=> {
					console.log(res);
				})
			}
		}
	}
</script>

<style>

</style>
