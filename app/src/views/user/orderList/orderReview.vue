<template>
  <div>
    <van-nav-bar
      title="订单评论"
      left-text=""
      right-text=""
      left-arrow
      :fixed="true"
      style="z-index:10;"
      @click-left="onClickLeft"
    />
    <div class="mTop">
      <van-cell-group>
        <van-field
          v-model="message"
          placeholder="请输入评论"
          type="textarea"
          row="2"
          autosize
        />
      </van-cell-group>
      <van-uploader :after-read="onRead" class="img_up">
        <van-icon name="photograph" />
      </van-uploader>
      <div class="form_wrap">
        <div class="item_wrap">服务评价 </div>
        <div class="item_list">
          <ul>
            <li>
              <span class="order-label">服务态度</span>
              <van-rate
                v-model="rateService"
                :count="5"
              />
            </li>
            <li>
              <span class="order-label">维修效率</span>
              <van-rate
                v-model="rateRepaire"
                :count="5"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="page-bottom" >
        <van-button type="primary" bottom-action @click="billEvaluation">发表</van-button>
    </div>
  </div>
</template>
<script>
import { Field, Button, Rate, Uploader } from 'vant'
import { evaluationBill } from '@/api/user'
import { localStorageTool } from '@/utils'
export default {
  data() {
    return {
      picIp: process.env.BASE_API,
      user: '',
      message: '',
      rateService: 0,
      rateRepaire: 0,
      evaluation: {}
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
    onRead(file) {
      console.log(file)
    },
    billEvaluation() {
      if (this.user) {
        if (this.$route.query.id) {
          this.evaluation = { id: this.$route.query.id, serviceAttitudeScore: this.rateService, repaireEfficieneyScore: this.rateRepaire, evaluateContent: this.message, mgrBillEvaluatePicList: [] }
          evaluationBill({ formData: JSON.stringify(this.evaluation) }).then((data) => {
            this.$toast('评价成功')
            this.$router.push({ path: '/user/myOrder' })
          })
        }
      }
    }
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Rate.name]: Rate,
    [Uploader.name]: Uploader
  }
}
</script>
<style scoped>
 .form_wrap{
  background: #fff;
  /*margin-top: 0.8rem;*/
  position: relative;
  box-shadow: 0 1px 0 rgba(0,0,0,0.04)
}
.img_up{
  padding: 0.4rem 1.18rem;
  font-size: 1.5rem;
}
.item_wrap{
  box-shadow: 0 1px 0 rgba(0,0,0,0.04);
  color: #333;
  padding: 0.4rem 1.18rem 0.25rem;
  font-size: 1rem;
}
.item_list{
  font-size: 1.1rem;
  padding: 0.55rem 1.18rem 0;
}
.item_list li{
  font-size: 1rem;
  padding: 0.25rem 0 0.4rem;
}
.order-label{
  float: left;
  text-align: left;
  color: #666;
  width: 5.5rem;
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
