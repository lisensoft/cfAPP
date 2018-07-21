<template>
  <div>
    <van-nav-bar
      title="我的优惠券"
      left-text=""
      right-text=""
      :left-arrow="true"
      :fixed="true"
      @click-left="onClickLeft"
      style="z-index:10;"
    />
    <div class="mTop" style="padding-top:1px;">
      <div class="coupon-item clearfix" v-for="(item,index) in List" :key="index" @click="getcoupon(item.reduceMoney, item.id)">
        <div class="coupon-info">
              <div class="triangle1"></div>
              <div class="triangle2"></div>
              <div class="coupon-price" :class="{coupon_type1: item.couponType === '洗车', coupon_type2: item.couponType === '保养', coupon_type3: item.couponType === '清洗', coupon_type4: item.couponType === '维修', coupon_type5: item.couponType === '钣金', coupon_type6: item.couponType === '救援',}">
                <div class="price-num">
                  ￥<span>{{item.reduceMoney}}</span>
                </div>
              </div>
              <div class="coupon-title">{{item.couponName}}</div>
              <div class="coupon-detail">满{{item.fullMoney}}减{{item.reduceMoney}} </div>
              <div class="coupon-detail">有效期至 {{item.endDate}} </div>
              <div class="coupon-use">
                <van-button type="primary" size="small">立即购买</van-button>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { myCouponList } from '@/api/xiche'
import { localStorageTool } from '@/utils'
import { Button } from 'vant'
export default {
  data() {
    return {
      user: {},
      picIp: process.env.BASE_API,
      List: [],
      couponId: this.$route.params.couponId,
      reduceMoney: 0 // 优惠金额
    }
  },
  mounted() {
    const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值
    if (userInfo) { // 获取用户信息、
      this.user = JSON.parse(userInfo)
      this.getList()
    }
  },
  created() {
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    getList() {
      myCouponList({ pageNo: 1, pageSize: 999, ownerId: this.user.id, flagUse: 0 }).then((data) => {
        this.List = data.page.records
      })
    },
    getcoupon(reduceMoney, id) {
      this.reduceMoney = reduceMoney
      this.couponId = id
      this.$router.go(-1)
    }
  },
  beforeRouteLeave(to, from, next) {
    to.params.reduceMoney = this.reduceMoney
    to.params.id = this.couponId
    next()
  },
  components: {
    [Button.name]: Button
  }
}
</script>
<style scoped>
.coupon-item{
  background: #fff;
  width: 92%;
  margin: 1.18rem auto;
  border-bottom: 0.8rem;
  position: relative;
}
.coupon-info{
  padding: 0.63rem 3.15rem 0.63rem 10rem;
  position: relative;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.triangle1{
  width: 1.18rem;
  height: 0.6rem;
  position: absolute;
  z-index: 2;
  background: #f4f4f8;
  left: 8.08rem;
  top: 0;
  border-radius: 0 0 1.18rem 1.18rem;
}
.triangle2{
  width: 1.18rem;
  height: 0.6rem;
  position: absolute;
  z-index: 2;
  background: #f4f4f8;
  left: 8.08rem;
  bottom: -0.08rem;
  border-radius:1.18rem 1.18rem 0 0;
}
.coupon-price{
  border-right: 2px dashed #f4f4f8;
  font-size: 2.37rem;
  color: #fff;
  width: 8.67rem;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 0.8rem 0 0 0.8rem;
  text-align: center;
  position: absolute;
}
/*洗车 1, 保养 2 ,清洗 3 ,维修 4 ,钣金 5 ,救援 6*/
.coupon_type1{
  background: #14a0ff;
}
.coupon_type2{
  background: #ffb900;
}
.coupon_type3{
  background: #96d20a;
}
.coupon_type4{
  background: #fa5a4b;
}
.coupon_type5{
  background: #05cdcd;
}
.coupon_type6{
  background: #ff6e37;
}
.price-num{
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100%;
  font-size: 1rem;
}
.price-num span{
  font-size: 2.37rem
}
.coupon-title{
  font-size: 1.25rem;
  line-height: 2.37rem;
  font-weight: 700;
}
.coupon-detail{
  color: #999;
  line-height: 1.4;
  font-size: 1rem;
}
.coupon-use{
  position: absolute;
  right: 0.8rem;
  top: 50%;
  -webkit-transform: translateY(-55%);
  transform: translateY(-55%);
  height: 1.5em;
  vertical-align: -1.18rem;
  font-size: 1.6rem;
  color: #e6e6e6;
  overflow: hidden;
  margin: 0 0.32rem;
}
.clearfix:after{
  content: '';
  display: block;
  clear: both;
  font-size: 0
  }
.no_use .coupon-price{
  background: #c3c3c3;
}
</style>
