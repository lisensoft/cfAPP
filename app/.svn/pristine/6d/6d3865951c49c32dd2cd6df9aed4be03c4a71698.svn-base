<template>
  <div  class="orderlist" >
    <van-nav-bar
      title="我的订单"
      left-text=""
      right-text=""
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
      style="z-index:10;"
    />
    <van-tabs v-model="active" class="mTop" >
      <van-tab title="全部">
        <div class="order-item" v-for="(item,index) in myBillList" :key="index">
          <div class="item-wrap">
            <div class="item-title">
              <span class="pay_status">{{item.stateName}}</span>
              <span>{{item.serviceTypeName}}</span>
            </div>
            <div class="item-detail" @click="goDetail(item.id)">
              <div v-show ="item.serviceType == 0">
                <div class="item-price">￥<span>{{item.billMoney}}</span></div>
                <div class="item-company" v-if="item.isItem===1">{{item.mgrBillDetailItemList[0].itemName}}</div>
                <div class="item-company" v-if="item.isItem===0">{{item.mgrBillDetailSetmealList[0].setmealName}}</div>
              </div>
              <div v-show ="item.serviceType != 0">
                <div class="item-price">￥<span>{{item.billMoney}}</span></div>
                <div class="item-company">
                  <p>{{item.companyName}}</p>
                  <p>{{item.carCode}}</p>
                </div>
              </div>
              <div class="item-time">
                <span v-show ="item.serviceType != 0">预约时间：</span>
                {{item.billDate}}
              </div>
            </div>
            <div class="btn-box"  v-if="item.state == 0 || item.state == 2 " >
              <van-button size="small" type="danger" v-show ="item.state == 0" @click="goPay(item.id, item.payKind, item.payMoney)">立即支付</van-button>
              <van-button size="small" type="danger" v-show ="item.state == 2" @click="goReview(item.id)">立即评价</van-button>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待支付">
        <div class="order-item" v-for="(item,index) in toPaid" :key="index">
          <div class="item-wrap">
            <div class="item-title">
              <span class="pay_status">{{item.stateName}}</span>
              <span>{{item.serviceTypeName}}</span>
            </div>
            <div class="item-detail" @click="goDetail(item.id)">
              <div v-show = "item.serviceType == 0">
                <div class="item-price">￥<span>{{item.billMoney}}</span></div>
                <div class="item-company" v-if="item.isItem===1">{{item.mgrBillDetailItemList[0].itemName}}</div>
                <div class="item-company" v-if="item.isItem===0">{{item.mgrBillDetailSetmealList[0].setmealName}}</div>
              </div>
              <div v-show = "item.serviceType != 0">
                <div class="item-price">￥<span>{{item.billMoney}}</span></div>
                <div class="item-company">
                  <p>{{item.companyName}}</p>
                  <p>{{item.carCode}}</p>
                </div>
              </div>
              <div class="item-time">
                <span v-show = "item.serviceType != 0">预约时间：</span>
                {{item.billDate}}
              </div>
            </div>
            <div class="btn-box">
              <van-button size="small" type="danger" v-show = "item.state == 0" @click="goPay(item.id, item.payKind, item.payMoney)">立即支付</van-button>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="服务中">
        <div class="order-item" v-for="(item,index) in serving" :key="index">
          <div class="item-wrap">
            <div class="item-title">
              <span class="pay_status">{{item.stateName}}</span>
              <span>{{item.serviceTypeName}}</span>
            </div>
            <div class="item-detail" @click="goDetail(item.id)">
              <div v-show = "item.serviceType == 0">
                <div class="item-price">￥<span>{{item.billMoney}}</span></div>
                <div class="item-company" v-if="item.isItem===1">{{item.mgrBillDetailItemList[0].itemName}}</div>
                <div class="item-company" v-if="item.isItem===0">{{item.mgrBillDetailSetmealList[0].setmealName}}</div>
              </div>
              <div v-show = "item.serviceType != 0">
                <div class="item-price">￥<span>{{item.billMoney}}</span></div>
                <div class="item-company">
                  <p>{{item.companyName}}</p>
                  <p>{{item.carCode}}</p>
                </div>
              </div>
              <div class="item-time">
                <span v-show = "item.serviceType != 0">预约时间：</span>
                {{item.billDate}}
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待评价">
        <div class="order-item" v-for="(item,index) in toCommented" :key="index">
          <div class="item-wrap">
            <div class="item-title">
              <span class="pay_status">{{item.stateName}}</span>
              <span>{{item.serviceTypeName}}订单</span>
            </div>
            <div class="item-detail"  @click="goDetail(item.id)">
              <div v-show = "item.serviceType == 0">
                <div class="item-price">￥<span>{{item.billMoney}}</span></div>
                <div class="item-company" v-if="item.isItem===1">{{item.mgrBillDetailItemList[0].itemName}}</div>
                <div class="item-company" v-if="item.isItem===0">{{item.mgrBillDetailSetmealList[0].setmealName}}</div>
              </div>
              <div v-show = "item.serviceType != 0">
                <div class="item-price">￥<span>{{item.billMoney}}</span></div>
                <div class="item-company">
                  <p>{{item.companyName}}</p>
                  <p>{{item.carCode}}</p>
                </div>
              </div>
              <div class="item-time">
                <span v-show = "item.serviceType != 0">预约时间：</span>
                {{item.billDate}}
              </div>
            </div>
            <div class="btn-box">
              <van-button size="small" type="danger" v-show = "item.state == 2" @click="goReview(item.id)">立即评价</van-button>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Tab, Tabs, Button } from 'vant'
import { selectListNeedToken } from '@/api/user'
import { localStorageTool } from '@/utils'
export default {
  data() {
    return {
      active: 0,
      user: '',
      myBillList: [],
      toPaid: [],
      serving: [],
      toCommented: []
    }
  },
  mounted() {
    const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值
    if (userInfo) { // 获取用户信息、
      this.user = JSON.parse(userInfo)
    }
    if (this.$route.query.active) {
      this.active = this.$route.query.active
    }
    selectListNeedToken({ pageNo: 1, pageSize: 9999, ownerId: this.user.id }).then((data) => {
      this.myBillList = data.page.records// 赋值数据
      this.toPaid = this.myBillList.filter((item) => {
        return item.stateName === '待支付'
      })
      this.serving = this.myBillList.filter((item) => {
        return item.stateName === '服务中'
      })
      this.toCommented = this.myBillList.filter((item) => {
        return item.stateName === '待评价'
      })
    })
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    goDetail(id) {
      this.$router.push({ path: '/user/myOrder/detail',
        query: { id: id }
      })
    },
    goPay(id, payKind, payMoney) {
      this.$router.push({ name: '订单支付',
        params: { id: id, payKind: payKind, payMoney: payMoney }
      })
    },
    goReview(id) {
      this.$router.push({ path: '/user/myOrder/review',
        query: { id: id }
      })
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button
  }
}
</script>
<style scoped>
.order-item{
  position: relative;
  background: #fff;
  margin-bottom: 0.7rem;
  font-size: 1rem;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04)
}
.item-wrap{
  overflow: hidden;
}
.item-title{
  box-shadow: 1.18rem 1px 0 rgba(0, 0, 0, 0.04);
  position: relative;
  padding: 0.55rem 1.18rem;
  font-size: 1rem;
  color: #666;
}
.pay_status{
  color: #fa5a4b;
  float: right;
}
.item-detail{
  position: relative;
  padding: 0.32rem 1.18rem 0.8rem;
  color: #333;
  box-shadow: 1.18rem 1px 0 rgba(0, 0, 0, 0.04)
}
.item-price{
  width:30%;
  text-align: right;
  font-size: 1rem;
  float: right;
  margin-top: 0.5rem;
}
.item-price span{
  font-size: 1.35rem
}
.item-company{
  width: 70%;
  font-size: 1rem;
  margin: 0.4rem 0 0;
}
.item-time{
  font-size: 1rem;
}
.btn-box{
  padding: 0.8rem 1.18rem;
  text-align: right;
  position: relative;
}
</style>

