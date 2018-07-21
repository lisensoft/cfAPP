<template>
  <div>
    <van-nav-bar
      title="支付完成"
      left-text=""
      right-text=""
      :left-arrow="true"
      :fixed="true"
      style="z-index:10;"
      @click-left="onClickLeft"
    />
    <div class="mTop" style="text-align:center">
      <van-icon name="passed" class="ok" />
      <div>支付完成</div>
    </div>
    <div class="page-bottom" >
        <van-button type="primary" bottom-action @click="goOrder">返回订单列表</van-button>
    </div>
  </div>
</template>
<script>
// import {  } from '@/api/shop'
import { Icon, Button } from 'vant'
export default {
  data() {
    return {
      picIp: process.env.BASE_API
    }
  },
  mounted() {
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    goOrder() {
      this.$router.replace({ path: '/user/myOrder' })
    }
  },
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button
  }
}
</script>
<style scoped>
.ok{
  margin-top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 50px;
  color: #09BB07;
}
 .page-bottom{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom:0;
    right: 0;
    width: 100%;
    z-index: 5;
  }
  .page-bottom button{background: #fa5a4b}
</style>
