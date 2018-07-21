<template>
  <div>
    <van-nav-bar
      title="订单填写"
      left-text=""
      right-text=""
      :left-arrow="true"
      :fixed="true"
      @click-left="onClickLeft"
      style="z-index:10;"
    />
    <div class="mTop">
      <div class="form_wrap">
        <div class="bill_store">
          <div class="store-detail">
              <h3>{{shopDetail.companyName}} </h3>
              <div class="store-detail">
                <van-icon name="location" />
                {{shopDetail.address}}
              </div>
              <div>
                <van-icon name="underway" />
                营业时间：{{shopDetail.companyTime}}
              </div>
              <div>
                <van-icon name="pending-orders" />
                {{itemDetail.itemName}}
              </div>
          </div>
        </div>
        <div class="store_line"></div>
      </div>
      <div class="form_wrap">
        <van-cell-group>
          <van-field
            v-model="carCode"
            label="车牌号"
            placeholder="请输入车牌号"
          />
          <van-field
            v-model="username"
            label="联系人"
            placeholder="请输入联系人姓名"
          >
          </van-field>
          <div class="sex">
              <span class="sex-picker_male" :class="{active:sex==0}" @click="sex = 0"></span>
              <span class="sex-picker_female" :class="{active:sex==1}" @click="sex = 1"></span>
          </div>
          <van-field
            v-model="phone"
            label="手机号"
            placeholder="请输入手机号"
          />
          <van-cell title="预约时间" value="" v-model="time"  @click="show = true"/>
          <van-popup v-model="show" position="bottom" :overlay="false">
            <van-datetime-picker
              v-model="datePicker"
              type="date"
              :min-date="minDate"
              @confirm="sureTime()"
              @cancel="show = false"
            />
          </van-popup>
        </van-cell-group>
      </div>
      <div class="form_wrap">
        <van-cell title="我的优惠券" icon="coupon" is-link :value="this.couponMoney +'元'" :to="{name:'可用优惠券列表', params: { couponId: couponId, couponType: couponType }}"/>
      </div>
    </div>
    <div class="page-bottom">
        <div class="xi-pay">
          ￥<span class="xi-pay-money">{{itemDetail.itemPrice}}</span>
        </div>
        <button class="xi-button" @click=" goPay()">去买单</button>
    </div>
  </div>
</template>
<script>
import { myCouponGreat } from '@/api/xiche'
import { createBill } from '@/api/user'
import { itemDetail, getShopDetail } from '@/api/shop'
import { Icon, DatetimePicker, Popup, Field, Button } from 'vant'
import { localStorageTool, parseTime } from '@/utils'
export default {
  data() {
    return {
      user: '',
      couponId: '',
      carCode: '',
      username: '',
      phone: '',
      minDate: new Date(),
      show: false,
      datePicker: '',
      greatcoupon: {},
      couponMoney: 0,
      time: '请选择预约时间',
      shopDetail: {}, // 门店详细
      itemDetail: {}, // 项目详情
      itemName: '',
      Money: '',
      sex: 0,
      couponType: ''
    }
  },
  activated() {
    if (this.$route.params.isUpdate) {
      this.couponMoney = 0
      this.couponId = ''
      if (this.$store.getters.myDefaultCar.carCode !== undefined && this.$store.getters.myDefaultCar.carCode !== '') {
        this.carCode = this.$store.getters.myDefaultCar.carCode
      }
      const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值
      if (userInfo) { // 获取用户信息、
        this.user = JSON.parse(userInfo)
        this.phone = this.user.phone
        if (this.$route.query.id) {
          getShopDetail({ id: this.$route.query.id }).then((data) => {
            this.shopDetail = data.new
          })
          itemDetail({ companyId: this.$route.query.id, itemCode: this.$route.query.itemCode }).then((data) => {
            this.itemDetail = data.new
            this.Money = this.itemDetail.itemPrice
            this.couponType = this.itemDetail.type
            this.GreatCoupon(this.Money, this.user.id, this.couponType)
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
    sureTime() {
      this.show = false
      if (this.datePicker) {
        this.time = parseTime(this.datePicker, '{y}-{m}-{d}')
      } else {
        this.time = '请选择预约时间'
      }
    },
    GreatCoupon(paymoney, ownerid, couponType) {
      this.greatcoupon = {}
      myCouponGreat({ payMoney: paymoney, ownerId: ownerid, couponType: couponType }).then((data) => {
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
      this.createbill = { ownerId: this.user.id, carCode: this.carCode, companyId: this.$route.query.id, serviceType: this.itemDetail.type, couponId: this.couponId, mgrBillDetailItemList: [{ itemId: this.itemDetail.id }], contectPersonPhone: this.phone, appointmentTime: this.time, contectPersonSex: this.sex }
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
    [Icon.name]: Icon,
    [DatetimePicker.name]: DatetimePicker,
    [Field.name]: Field,
    [Popup.name]: Popup,
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
}
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
  .sex{
    position: absolute;
    top: 50%;
    right: 1rem;
    -webkit-transform: translateY(-80%);
    transform: translateY(-80%);
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
</style>
