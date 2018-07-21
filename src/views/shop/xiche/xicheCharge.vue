<template>
  <div>
    <van-nav-bar
      title="洗车买单"
      left-text=""
      right-text=""
      :left-arrow="true"
      :fixed="true"
      @click-left="onClickLeft"
      style="z-index:10;"
    />
    <div class="show-price mTop">
      <div class="price-detail">
        ￥<span>{{this.thisPrice}}</span>
      </div>
      <div class="font-s">标准洗车1次</div>
      <div class="s-line"></div>
    </div>
    <div>
      <ul class="price-item">
        <li v-for="(item,index) in xichePrice" :key="index" @click="selectItem(item,index)">
          <div :class="{active:currIndex===index}" class="iconfont">
            <van-icon name="checked" />
          </div>
          <span class="item-name">{{item.itemName}} </span>
          <span class="item-money">￥<span>{{item.itemPrice}}</span></span>
        </li>
      </ul>
    </div>
    <div>
      <van-cell title="我的优惠券" icon="coupon" is-link :value="- this.couponMoney" :to="{name:'我的优惠券', params: { couponId: couponId }}"/>
    </div>
    <div class="page-bottom">
        <div class="xi-pay">
          ￥<span class="xi-pay-money">24</span>起
        </div>
        <!--<div class="xi-count">全城248家商户通用 </div>-->
        <button class="xi-button" @click="goPay">去买单</button>
    </div>
  </div>
</template>
<script>
import { itemList, myCouponGreat } from '@/api/xiche'
import { createBill } from '@/api/user'
import { RadioGroup, Radio, Icon } from 'vant'
import { localStorageTool } from '@/utils'
export default {
  data() {
    return {
      radio: '',
      picIp: process.env.BASE_API,
      xichePrice: [],
      thisPrice: '',
      currIndex: 0,
      greatcoupon: {},
      couponMoney: '无可用优惠券',
      user: '',
      couponId: '',
      listBill: {},
      createbill: {},
      itemId: ''
    }
  },
  activated() {
    if (this.$route.params.isUpdate) {
      const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值
      if (userInfo) { // 获取用户信息、
        this.user = JSON.parse(userInfo)
        if (this.$route.query.id) {
          this.xichePrice = []
          this.thisPrice = 0
          this.itemId = 0
          itemList({ companyId: this.$route.query.id, type: 0, pageNo: 1, pageSize: 999 }).then((data) => {
            if (data.page.records.length > 0) {
              this.xichePrice = data.page.records
              this.thisPrice = this.xichePrice[0].itemPrice
              this.itemId = this.xichePrice[0].id
              this.GreatCoupon(this.thisPrice, this.user.id)
            } else {
              this.couponMoney = 0
              this.couponId = 0
            }
          })
        }
      }
    } else { // 选择优惠券过来
      if (this.$route.params.reduceMoney) {
        this.couponMoney = this.$route.params.reduceMoney
        this.couponId = this.$route.params.id
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    to.params.isUpdate = 1 // 1刷新数据
    if (from.path === '/shop/washCar/charge/coupon') {
      to.params.isUpdate = 0 // 选择购物券返回 不加载门店数据
    }
    next()
  },
  mounted() {
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    selectItem(item, index) {
      this.currIndex = index
      this.thisPrice = item.itemPrice
      this.itemId = item.id
    },
    GreatCoupon(paymoney, ownerid) {
      this.greatcoupon = {}
      myCouponGreat({ payMoney: paymoney, ownerId: ownerid, couponType: 0 }).then((data) => {
        if (data.new != null) {
          this.greatcoupon = data.new
          if (this.greatcoupon.reduceMoney) {
            this.couponMoney = this.greatcoupon.reduceMoney
            this.couponId = this.greatcoupon.id
          }
        }
      })
    },
    goPay() {
      let defaultCar = ''
      if (this.$store.getters.myDefaultCar.carCode !== undefined && this.$store.getters.myDefaultCar.carCode !== '') {
        defaultCar = this.$store.getters.myDefaultCar.carCode
      }
      this.createbill = { ownerId: this.user.id, carCode: defaultCar, companyId: this.$route.query.id, serviceType: 0, couponId: this.couponId, mgrBillDetailItemList: [{ itemId: this.itemId }] }
      createBill({ formData: JSON.stringify(this.createbill) }).then((data) => {
        this.listBill = data.new
        //  this.$toast('订单生成成功')
        this.$router.replace({ name: '订单支付',
          params: { id: this.listBill.id, payKind: this.listBill.payKind, payMoney: this.listBill.receiveMoney }
        })
      })
    }
  },
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Icon.name]: Icon
  }
}
</script>
<style scoped>
  ul,li{
    list-style: none;
  }
  .page-bottom{
    position: fixed;
    left: 0;
    right:0;
    bottom:0;
    z-index: 5;
    height: 50px;
    background: #2d3c4b;
  }
  .xi-pay{
    padding: 0 0.8rem 0 1.18rem;
    font-size: 1.18rem;
    color: #fa5a4b;
    min-width: 23rem;
    height: 50px;
    line-height: 50px;
    float: left;
  }
  .xi-pay-money{
    font-size: 2.3rem;
  }
  .xi-count{
    color: #fff;
    position: absolute;
    right: 11.45rem;
    bottom: 0.63rem;
    font-size: 1rem;
  }
  .xi-button{
    width: 10rem;
    height: 50px;
    line-height: 50px;
    font-weight: 600;
    background: #fa5a4b;
    color: #fff;
    position: absolute;
    right: 0;
    bottom: 0;
    border: 0;
    font-size: 1.5rem;
  }
  .show-price{
    padding: 2.37rem 0 2rem;
    text-align: center;
    background: #fff;
    margin-bottom: 0.8rem;
    position: relative;
  }
  .price-detail{
    font-size: 1.25rem;
    color: #fa5a4b;
    margin-bottom: 0.8rem;
  }
  .price-detail span{
    font-size: 2rem;
    margin-left: 0.4rem;
    font-weight: 600;
  }
  .font-s{
    color: #999;
    font-size: 1rem;
  }
  .s-line{
    width: 100%;
    height: 0.25rem;
    background: url(../../../assets/img/line.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
  }
  .price-item{
    background: #fff;
    margin: 0 0 0.8rem;
  }
  .price-item li{
    font-size: 1.18rem;
    padding:1.1rem 1.18rem;
    box-shadow: 1.18rem 1px 0 rgba(0,0,0,0.04)
  }
  .iconfont{
    color: #e6e6e6;
    float: right;
    font-size: 1.5rem;
  }
  .iconfont.active{
    color: #fa5a4b;
  }
  .item-name{
    width: 70%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-money{
    color: #fa5a4b;
    font-size: 1rem;
  }
  .item-money span{
    font-size: 1.5rem;
  }
</style>
