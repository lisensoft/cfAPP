<template>
  <div>
    <van-nav-bar
      title="订单详情"
      left-text=""
      right-text=""
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
      style="z-index:10;"
    />
    <div class="mTop">
      <div class="form_wrap">
        <div class="bill_store">
          <div class="store-detail">
              <h3>{{myBill.companyName}} </h3>
              <div class="store-detail">
                <van-icon name="location" />
                {{myBill.companyAddress}}
              </div>
              <div>
                <van-icon name="underway" />
                订单时间：{{myBill.billDate}}
              </div>
          </div>
        </div>
        <div class="store_line"></div>
      </div>
      <div class="form_wrap">
        <div class="item_wrap">{{myBill.serviceTypeName}}</div>
        <div class="item_list">
          <ul>
            <li v-for="(item,index) in myBill.mgrBillDetailItemList" :key="index">
              <span class="item-price">￥{{item.itemMoney}}</span>
              <span class="item-title">{{item.itemName}}</span>
            </li>
            <li>
              <span class="item-price">￥{{myBill.discountMoney}}</span>
              <span class="item-title">乐享优惠</span>
            </li>
            <li>
              <span class="item-price">￥{{myBill.couponMoney}}</span>
              <span class="item-title">优惠券</span>
            </li>
          </ul>
        </div>
        <div class="total_price">
          <div class="total_price_d">
            订单金额：￥{{myBill.billMoney}}
          </div>
        </div>
      </div>
      <div class="form_wrap">
        <div class="item_wrap">订单信息 </div>
        <div class="item_list">
          <ul>
            <li>
              <span class="order-label">订单号</span>
              {{myBill.billNo}}
            </li>
            <li>
              <span class="order-label">订单状态</span>
              {{myBill.stateName}}
            </li>
            <li>
              <span class="order-label">联系人</span>
              {{myBill.contectPerson}}
            </li>
            <li>
              <span class="order-label">联系人电话</span>
              {{myBill.contectPersonPhone}}
            </li>
            <li>
              <span class="order-label">车型</span>
              {{myBill.carType}}
            </li>
            <li>
              <span class="order-label">车牌号码</span>
              {{myBill.carCode}}
            </li>
            <li v-show ='myBill.appointmentTime'>
              <span class="order-label">预约时间</span>
              {{myBill.appointmentTime}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from 'vant'
import { bill } from '@/api/user'
import { localStorageTool, parseTime } from '@/utils'
export default {
  data() {
    return {
      user: '',
      myBill: {}
    }
  },
  mounted() {
    const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值
    if (userInfo) { // 获取用户信息、
      this.user = JSON.parse(userInfo)
    }
    bill({ id: this.$route.query.id }).then((data) => {
      this.myBill = data.new// 赋值数据
      if (this.myBill.appointmentTime) {
        this.myBill.appointmentTime = parseTime(this.myBill.appointmentTime, '{y}-{m}-{d}')
      }
    })
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  },
  components: {
    [Icon.name]: Icon
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
.bill_store{
  padding: 1rem 1.18rem;
  font-size: 1.18rem;
  position: relative;
}
.store-detail{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #666;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: left
}
.store-detail h3{
  font-size: 1.18rem;
  line-height: 2.5rem;
  font-weight: 500;
  margin: 0 auto;
}
.store_line{
  width: 100%;
  height: 0;
  border-bottom: 5px dashed #999;
  /*border-image: -webkit-linear-gradient( to top right, red , blue) 30 30;
  border-image: -moz-linear-gradient( to top right, red, blue) 30 30;
  border-image: linear-gradient( to top right, red , blue) 30 30;*/
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
.item_list li::after{
  content:'';
    clear: both;
    display: block;
    height: 0;
}
.item-price{
  float: right;
  margin-right: 1.18rem;
  color: #333;
  font-size: 1.18rem;
}
.item-title{
  color: #666;
}
.total_price{
  padding: 0 1.18rem;
  margin-top: 0.4rem;
  color:#fa5a4b;
}
.total_price_d{
  padding: 0.63rem 0;
  border-top: 1px dotted #c3c3c3;
  text-align: right
}
.order-label{
  float: left;
  text-align: left;
  color: #666;
  width: 5.5rem;
}
</style>

