<template>
  <view class="infoWrap">
    <uni-forms :modelValue="formData">
      <uni-forms-item label="头像" label-align="right">
        <view class="avatar">
          <image @click="upload_profile" :src="avatar"></image>
        </view>
      </uni-forms-item>
      <uni-forms-item label="昵称" label-align="right">
        <uni-easyinput type="text" v-model="formData.nickName" />
      </uni-forms-item>
      <uni-forms-item label="手机号" label-align="right">
        <uni-easyinput type="number" maxlength="11" v-model="formData.number" />
      </uni-forms-item>
      <uni-forms-item label="邮箱" label-align="right">
        <uni-easyinput type="text" v-model="formData.email" />
      </uni-forms-item>
      <uni-forms-item label="性别" label-align="right">
        <uni-data-checkbox v-model="formData.sex" :localdata="sexs" />
      </uni-forms-item>
			<uni-forms-item label="证件号" label-align="right">
			  <uni-easyinput type="number" maxlength="18" v-model="formData.idCard" />
			</uni-forms-item>
      <button type="primary" @click="mdfInfo">修改信息</button>
    </uni-forms>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        number: '',
        nickName: '',
        email: '',
        sex: 0,
				idCard:''
      },
      sexs: [
        {
          text: '男',
          value: 0
        },
        {
          text: '女',
          value: 1
        }
      ],
      avatar: '../../static/me/header.png',
      profileImg: ''
    }
  },
  onLoad() {
    // this.getInfo(0)
  },
  methods: {
    // getInfo(type) {
    //   this.$request({
    //     url: this.$api.MY_INFO,
    //     method: 'GET',
    //     data: {}
    //   }).then((res) => {
    //     if (res.data.code == 200) {
    //       console.log(res.data)
    //       let user = res.data.user
    //       if (user.avatar.length > 0) {
    //         this.avatar = user.avatar
    //         this.profileImg = user.avatar
    //       }
    //       this.formData.number = user.phonenumber
    //       this.formData.nickName = user.nickName
    //       this.formData.email = user.email
    //       this.formData.sex = parseInt(user.sex)

    //       if (type == 1) {
    //         uni.setStorageSync('user', res.data.user)
    //       }
    //     }
    //   })
    // },
    upload_profile() {
      let that = this
      uni.chooseImage({
        count: 1, //最多可以选择的图片张数
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: function (res) {
          console.log(JSON.stringify(res.tempFilePaths))
          const tempFilePaths = res.tempFilePaths
          uni.uploadFile({
            url: that.$url + '/prod-api/common/upload', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              Authorization: uni.getStorageSync('token')
            },
            success: (uploadFileRes) => {
              console.log(uploadFileRes.data)
              that.avatar = that.$imgurl + JSON.parse(uploadFileRes.data).fileName
              that.profileImg = that.$imgurl + JSON.parse(uploadFileRes.data).fileName
            }
          })
        }
      })
    },
    mdfInfo() {
        uni.request({
          url: this.$url+'/prod-api/api/common/user',
          method: 'PUT',
          data: {
            nickName: this.formData.nickName,
            phonenumber: this.formData.number,
            email: this.formData.email,
            sex: this.formData.sex,
            avatar: this.profileImg,
						idCard:this.idCard
          }
        }).then((res) => {
          if (res.data.code == 200) {
            uni.showToast({
              title: '修改成功！'
            })
            // this.getInfo(1)
						setTimeout(function() {
							uni.reLaunch({
								url:'/pages/me/me'
							})
						},1000)
          } else {
            uni.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
.infoWrap {
  box-sizing: border-box;
  padding: 20rpx;
}

.avatar {
  text-align: right;
}

.avatar image {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
}
</style>
