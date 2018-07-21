<template>
  <div>
    <van-nav-bar
      title="个人设置"
      left-text=""
      right-text=""
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
    <van-cell-group style="margin-top:54px;" >
      <van-cell title="个人资料" value="" is-link :to="{path:'/user/userSetting/info'}"  v-if="user.id" />
      <van-cell title="关于我们" value="" is-link :to="{path:'/user/userSetting/about'}"/>
      <van-cell title="隐私声明" value="" is-link />
    </van-cell-group>
    <van-cell-group style="margin-top:30px;padding:0px 15px;background-color:#f2f2f2;" v-if="user.id" >
       <van-button size="large"  @click.native="signOut"  type="danger" >退出登录</van-button>
    </van-cell-group>
  </div>
</template>
<script>
import { Button } from 'vant'
import { localStorageTool } from '@/utils'
export default {
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值
    if (userInfo) { // 获取用户信息、
      this.user = JSON.parse(userInfo)
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    signOut() {
      localStorageTool.removeLocalStorage('token', 'userInfo')
      this.$store.dispatch('getDefaultCar')
      window.location.replace('#/user')
    }
  },
  components: {
    [Button.name]: Button
  }
}
</script>
