<template>
  <div>
    <van-nav-bar
        title="我的"
        left-text=""
        right-text="设置"
        :left-arrow="false"
        :fixed="true"
        @click-right="onClickRight"
        style="z-index:10;"
    />
    <div class="mTop">
      <div class="top-wrap">
        <div class="top-comment">
          <div class="sign-button">
            <van-button size="small" type="default" :disabled='isAble' :text='qdText' @click="jifenAdd()"></van-button>
          </div>
          <div class="top-con" v-show="user.id">
            <div class="top-img">
              <img v-lazy="{ src:picIp+user.headPic,loading:defaultTop,error:defaultTop}"  />
            </div>
            <div class="user-name">{{user.nickName?user.nickName:user.phone}}</div>
            <div class="user-car">{{carType}}</div>
          </div>
          <div class="top-con" v-show="!user.id">
            <div class="top-img">
              <img src="../../assets/img/avatar_default.png"/>
            </div>
            <span class="go-login" @click="goUrl('/home/login')">点击登录</span>
          </div>
        </div>
      </div>
      <div class="item1">
        <van-row>
          <van-col span="12" style="border-right:1px solid #f1f0f0">
            <div @click="goUrl('/user/myCoupon')"><span class="red-font">{{couponNum}}</span>张</div>
            <div @click="goUrl('/user/myCoupon')">优惠券</div>
          </van-col>
          <van-col span="12">
            <div><span class="red-font">{{integralNum}}</span>分</div>
            <div>积分</div>
          </van-col>
        </van-row>
      </div>
      <div style="margin-top:10px">
        <van-cell title="我的订单" icon="pending-orders" is-link value="全部订单" :to="{path:'/user/myOrder'}"/>
        <van-row class="myOrder">
          <van-col span="8">
            <div class="order-item" @click="goOrder(1)">
              <van-icon name="pending-payment" style="font-size:1.5rem" />
              <div>待支付</div>
              <span class="order-note" v-show ='this.toPaidNum'>{{this.toPaidNum}}</span>
            </div>
          </van-col>
          <van-col span="8">
            <div class="order-item" @click="goOrder(2)">
              <van-icon name="pending-deliver" style="font-size:1.5rem" />
              <div>服务中</div>
              <span class="order-note" v-show ='this.servingNum'>{{this.servingNum}}</span>
            </div>
          </van-col>
          <van-col span="8">
            <div class="order-item" @click="goOrder(3)">
              <van-icon name="pending-evaluate" style="font-size:1.5rem" />
              <div>待评价</div>
              <span class="order-note" v-show ='this.toCommentedNum'>{{this.toCommentedNum}}</span>
            </div>
          </van-col>
        </van-row>
      </div>
      <div style="margin-top:10px">
        <van-row gutter="1">
          <van-col span="8">
            <div class="myList" @click="goUrl('/user/myCar')">
              <svg-icon :icon-class="'car'" style="color:#96d20a"></svg-icon>
              <div>我的车库</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="myList">
              <van-icon name="exchange" style="font-size:1.5rem;color:#ffc341" />
              <div>积分任务</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="myList"  @click="goUrl('/user/integral')">
              <van-icon name="points-mall" style="font-size:1.5rem;color:#FFC341" />
              <div>积分商城</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="myList">
              <van-icon name="hot" style="font-size:1.5rem;color:#FF8200" />
              <div>热门活动</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="myList">
              <van-icon name="point-gift" style="font-size:1.5rem;color:#FF8200" />
              <div>邀请有礼</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="myList">
              <svg-icon :icon-class="'kefu'" style="color:#32c8fa"></svg-icon>
              <div>客服中心</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="myList">
              <van-icon name="records" style="font-size:1.5rem;color:#32C8FA" />
              <div>意见反馈</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="myList">
              <van-icon name="pending-evaluate" style="font-size:1.5rem;color:#fa5a4b" />
              <div>评价有礼</div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-popup v-model="show" style="background:transparent">
      <div class="point-box">
        <div class="point-close" @click="show = false">
          <van-icon name="close" />
        </div>
        <div class="point-head"></div>
        <div class="point-cont">
          <span class="point-plus">+</span>
          <span class="point-num">{{integralAdd.integralValue}}</span>
          积分
        </div>
        <div class="point-msg">
          <div class="point-sign"></div>
          <div class="point-text">
            今日签到成功！
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { CellGroup, Cell, Button, Row, Col, Popup } from 'vant'
import defaultTop from '../../assets/img/avatar_default.png'
import { localStorageTool } from '@/utils'
import { myInfo, integralInsert, getTaskCount } from '@/api/user'
export default {
  data() {
    return {
      user: {},
      picIp: process.env.BASE_API,
      value1: '',
      toPaidNum: 0,
      servingNum: 0,
      toCommentedNum: 0,
      integralNum: 0,
      couponNum: 0,
      carType: '', // 车型
      defaultTop: defaultTop,
      show: false,
      integralAdd: {},
      isAble: false,
      qdText: '签到领积分'
    }
  },
  activated() {
    const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值
    if (userInfo) { // 获取用户信息、
      this.user = JSON.parse(userInfo)
    } else {
      this.user = {}
    }
    if (this.user.id) {
      this.getTaskCount()
      myInfo({ ownerId: this.user.id }).then((data) => {
        const myInfo = data.new// 赋值数据
        this.toPaidNum = myInfo.needPayCount
        this.servingNum = myInfo.serviceCount
        this.toCommentedNum = myInfo.needEvaluateCount
        this.integralNum = myInfo.integralCount
        this.couponNum = myInfo.couponCount
      })
    } else {
      this.toPaidNum = 0
      this.servingNum = 0
      this.toCommentedNum = 0
      this.integralNum = 0
      this.couponNum = 0
      this.isAble = false
      this.qdText = '签到领积分'
    }
    if (this.$store.getters.myDefaultCar.carType !== undefined && this.$store.getters.myDefaultCar.carType !== '') {
      this.carType = this.$store.getters.myDefaultCar.carType
    }
  },
  methods: {
    onClickRight() {
      this.$router.push({ path: '/user/userSetting' })
    },
    goUrl(url) {
      this.$router.push({ path: url })
    },
    goOrder(active) {
      this.$router.push({ path: '/user/myOrder',
        query: { active: active }
      })
    },
    jifenAdd() {
      if (this.user.id) {
        integralInsert({ ownerId: this.user.id, taskName: '签到', type: 0 }).then((data) => { // 获取数据
          this.integralAdd = data.new
          this.show = true
          myInfo({ ownerId: this.user.id }).then((data) => {
            this.integralNum = data.new.integralCount
          })
          this.getTaskCount()
        })
      } else {
        this.$router.push({ path: '/home/login' })
      }
    },
    getTaskCount() {
      getTaskCount({ ownerId: this.user.id, taskName: '签到' }).then((data) => { // 获取数据
        const count = data.new
        if (count >= 1) {
          this.isAble = true
          this.qdText = '已签到'
        }
      })
    }
  },
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popup.name]: Popup
  }
}
</script>
<style  scoped>
.top-wrap{
  width: 100%;
  height: 8.08rem;
  background: url(../../assets/img/topbg.png) no-repeat;
  -webkit-background-size:100% 100%;
  background-size:100% 100%;
  overflow: hidden;
}
.top-comment{
  padding: 1.34rem 1.18rem 0;
  color: #fff;
  position: relative;
}
.sign-button{
  position: absolute;
  padding: 1.18rem 1.18rem 0 0;
  right: 0;
  top: 0;
  z-index: 1;
}
.top-con{
  position: relative;
  padding-left: 6.1rem;
  height: 5.5rem;
  overflow: hidden;
}
.top-img{
  position: absolute;
  top: 0;
  left: 0;
  width: 4.7rem;
  height: 4.7rem;
  border-radius: 50%;
  border: 2px solid #fff;
}
.top-img img{
  width: 4.7rem;
  height: 4.7rem;
  border-radius: 50%;
}
.user-name{
  font-size: 1.25rem;
  margin: 0.8rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-car{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.go-login{
  font-size:1.42rem;
  line-height: 3.9rem;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.item1{
  background: #fff;
  text-align: center;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
  padding: 0.8rem 0;
  color: #666;
  line-height: 1.55rem;
  font-size: 1rem
}
.red-font{
  color: #fa5a4b;
  font-size: 2rem;
  font-weight: 700;
  margin-right: 5px
}
.myOrder{
  padding: 15px 0;
  text-align: center;
  color: #666;
  background: #fff;
}
.myList{
 background: #fff;
 text-align: center;
 color: #666;
 line-height: 1.55rem;
 font-size: 1rem;
 padding: 1.25rem 0;
 border-bottom: 1px solid #f2f2f2;
}
.order-item{
  position: relative
}
.order-note{
  position: absolute;
  top:0;
  right:35%;
  z-index: 1;
  padding: 0.08rem 0.32rem;
  background: #ff3232;
  line-height: 1;
  color: #fff;
  border-radius: 0.8rem;
  transform: translateY(-50%)
}
.point-box{
  width:18.14rem;
  background: #fff;
  border-radius: 0.4rem;
  text-align: center
}
.point-close{
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  position: absolute;
  top: -0.5rem;
  right:0.3rem;
  color: #333;
  font-size: 2rem;
}
.point-head{
  width:12rem;
  height: 2.76rem;
  background: url(../../assets/img/point1.png) no-repeat center;
  background-size: cover;
  margin: -0.8rem auto 0;
}
.point-cont{
  color:#fa5a4b;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.4rem;
  height: 2.4rem;
  margin-top: 1.6rem;
  margin-bottom: 2rem;
  position: relative;
}
.point-cont::before, .point-cont::after{
  content: '';
  position: absolute;
  top: 50%;
  width:38px;
  height: 4px;
  background: -webkit-radial-gradient(circle, #ffd3ac 71%, transparent 0) no-repeat right center / 4px 4px, -webkit-linear-gradient(90deg, #fff 0, #ffd3ac 100%) no-repeat left center / 100% 1px;
  background: radial-gradient(circle, #ffd3ac 71%, transparent 0) no-repeat right center / 4px 4px, linear-gradient(90deg, #fff 0, #ffd3ac 100%) no-repeat left center / 100% 1px;
}
.point-cont::before{
  left:1.18rem;
}
.point-cont::after{
  right:1.18rem;
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.point-plus{
  font-size: 3.15rem;
  vertical-align: -7px;
  font-weight: 400;
}
.point-num{
  font-size: 3.15rem;
  vertical-align: -4px;
  margin-right: 0.55rem;
  margin-left: 0.16rem;
}
.point-msg{
  color:#ffa129;
  background: #fffae6;
  font-size: 1.18rem;
  padding: 1.42rem 1.6rem 0.4rem;
  font-weight: 600;
  border-top: 1px solid rgba(255, 224, 199, 0.5);
  border-radius: 0 0 0.4rem 0.4rem;
}
.point-sign{
  width: 3.55rem;
  height: 3.15rem;
  background-position: 0 3.5%;
  float: left;
  margin: -0.47rem 0 0 1.18rem;
  background: url(../../assets/img/point2.png) no-repeat;
  background-size:4rem 11rem;
}
point-text{
  float: left;
  margin-left: 0.8rem;
}
.point-msg:after{
  content: '';
  display: block;
  clear: both;
  font-size: 0;
}
</style>

