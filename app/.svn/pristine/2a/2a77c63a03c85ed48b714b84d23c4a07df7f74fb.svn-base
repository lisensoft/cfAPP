<template>
  <div>
    <van-nav-bar
      title="个人资料"
      left-text=""
      right-text=""
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
    <div class="form_wrap" style="margin-top:52px;">
        <van-cell-group>
          <div class="sex-div">
            <label>头像</label>
            <div class="headimg">
              <img v-lazy="{ src:picIp+user.headPic,loading:defaultTop,error:defaultTop}"  />
            </div>
          </div>
          <van-field
            v-model="user.phone"
            label="手机"
            disabled
          />
          <van-field
            v-model="user.name"
            label="姓名"
            placeholder="请输入联系人姓名"
          />
          <van-field
            v-model="user.nickName"
            label="昵称"
            placeholder="请输入联系人昵称"
          />
          <div class="sex-div">
            <label>性别</label>
            <div class="sex">
              <span class="sex-picker_male" :class="{active:sex==0}" @click="sex = 0"></span>
              <span class="sex-picker_female" :class="{active:sex==1}" @click="sex = 1"></span>
            </div>
          </div>
        </van-cell-group>
      </div>
      <van-cell-group style="margin-top:30px;padding:0px 15px;background-color:#f2f2f2;"  >
        <van-button size="large"  @click.native="upUser"  type="primary" >确定</van-button>
      </van-cell-group>
  </div>
</template>
<script>
import { localStorageTool } from '@/utils'
import { upUser } from '@/api/user'
import { getUser } from '@/api/login'
import { Button, Field } from 'vant'
import defaultTop from '../../../assets/img/avatar_default.png'
export default {
  data() {
    return {
      user: {},
      picIp: process.env.BASE_API,
      sex: '',
      defaultTop: defaultTop
    }
  },
  mounted() {
    const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值
    if (userInfo) { // 获取用户信息、
      this.user = JSON.parse(userInfo)
      this.sex = this.user.sex
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    upUser() {
      this.user.sex = this.sex
      upUser(this.user).then((data) => {
        getUser().then((datad) => {
          localStorageTool.setLocalStorage({
            'userInfo': JSON.stringify(datad.new) // data.token
          })
          this.$toast('修改成功')
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
  .form_wrap{
  background: #fff;
  margin-top: 0.8rem;
  position: relative;
  box-shadow: 0 1px 0 rgba(0,0,0,0.04)
  }
  .sex-div{
    background: #fff;
    padding: 10px 15px;
    position: relative;
  }
  .sex-div::after{
    content:'';
    position: absolute;
    top: 0;
    height: 200%;
    clear: both;
    left: 15px;
    right: 0;
    width: auto;
    transform-origin: 0 0;
    pointer-events: none;
    transform: scale(1,0.5);
    box-sizing:border-box;
    border-bottom:1px solid #e5e5e5
  }
  .sex-div label{
    max-width: 90px;
    vertical-align: middle;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    line-height: 3.5rem;
  }
  .sex{
    float:right;
    font-size: 1rem;
    color: #666;
  }
  .sex-picker_male, .sex-picker_female{
    width: 3.5rem;
    height: 3.5rem;
    background: url(../../../assets/img/sex.png) no-repeat center;
    -webkit-background-size: 3.5rem 15rem;
    background-size: 3.5rem 15rem;
    display: inline-block;
    margin-left: 0.4rem;
  }
  .sex-picker_male{
    background-position: 0 2.39%;
  }
  .sex-picker_male.active{
    background-position: 0 34.93%;
  }
  .sex-picker_female{
    background-position: 0 67.46%;
  }
  .sex-picker_female.active{
    background-position: 0 100%;
  }
  .headimg{
    float:right;
    font-size: 1rem;
    color: #666;
  }
  .headimg img{
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
  }
</style>
