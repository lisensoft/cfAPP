<template>
    <div >
      <van-nav-bar
        title="登录"
        left-text=""
        right-text=""
        left-arrow
        :fixed="true"
        @click-left="onClickLeft"
        />
        <van-cell-group class="page" style="margin-top:70px;" >
            <van-field v-model="tel" type="tel" placeholder="请输入手机号" />
            <van-field center v-model="validNo" placeholder="请输入验证码" icon="clear">
              <van-button slot="button" size="small" type="primary" :disabled="isAble" :text="text" class="getCode" @click="getMsg()"></van-button>
            </van-field>
        </van-cell-group>
        <van-cell-group style="margin-top:20px;padding:0px 15px;background-color:#f2f2f2;"  >
          <van-button size="large"  class="login-btn" @click="loginSumbit">登录</van-button>
        </van-cell-group>
    </div>
</template>
<script>
import { getMessage, login, getUser } from '@/api/login'
import { Field, Button } from 'vant'
import { localStorageTool } from '@/utils'
import { validatePhone } from '@/utils/validate'
export default {
  data() {
    return {
      countdown: 60,
      isAble: false,
      text: '获取验证码',
      tel: '', // 电话号码
      validNo: '', // 验证码
      timer: null
    }
  },
  mounted() {
    localStorageTool.removeLocalStorage('token', 'userInfo')
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    timerCount() {
      if (!this.timer) {
        this.countdown = 60
        this.isAble = true
        this.timer = setInterval(() => {
          if (this.countdown > 0 && this.countdown <= 60) {
            this.countdown--
            this.text = '重新发送(' + this.countdown + ')'
          } else {
            this.isAble = false
            clearInterval(this.timer)
            this.timer = null
            this.text = '获取验证码'
          }
        }, 1000)
      }
    },
    getMsg() {
      if (!(validatePhone(this.tel))) {
        this.$toast(' 请输入正确的电话号码 ')
        return false
      } else {
        getMessage({ mobile: this.tel }).then((data) => {
          // this.$toast('已发送！')
          // this.timerCount()
        })
        this.timerCount()
      }
    },
    loginSumbit() {
      login({ mobile: this.tel, validNo: this.validNo }).then((data) => {
        localStorageTool.setLocalStorage({
          'token': data.token // '9f946aa682fd6fc258c5449345917a76' // data.token
        })
        getUser().then((data) => {
          localStorageTool.setLocalStorage({
            'userInfo': JSON.stringify(data.new) // data.token
          })
          this.$store.dispatch('getDefaultCar')
          this.$router.go(-1)
        })
      })
    }
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button
  }
}
</script>
<style scoped>
.login-btn{
    background: #fa5a4b;
    color: #fff;
    border-radius: 5px;
    margin: 10px auto
}
.page{
    width: 92%;
    margin: 10px auto;
}
</style>
