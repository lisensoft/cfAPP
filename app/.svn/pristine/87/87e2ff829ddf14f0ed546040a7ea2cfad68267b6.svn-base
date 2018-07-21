<template class="main">
  <div>
    <van-nav-bar
      title="评论详情"
      left-text=""
      right-text=""
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
    <div class="mTop" style="background:#fff;">
      <div class="show_top clear">
        <div class="user_img">
          <img v-lazy="{src:picIp+order.ownerHeadPic,loading:defaultTop,error:defaultTop}"  />
        </div>
        <div class="name_date">
          <h3>{{order.nickName?order.nickName:order.ownerPhone}}</h3>
          <div>{{order.evaluateDate}}</div>
        </div>
        <div class="show-tips">省￥{{order.discountMoney}}</div>
      </div>
      <div class="table-wrap">
        <table>
          <tr>
            <td class="item-title">服务评星</td>
            <td class="item-cont">
              <van-rate
                v-model="rate"
                :count="5"
              />
            </td>
          </tr>
          <tr>
            <td class="item-title">车型</td>
            <td class="item-cont">
              {{order.carType}}
            </td>
          </tr>
          <tr>
            <td class="item-title">里程</td>
            <td class="item-cont">
              {{order.carMile}}
            </td>
          </tr>
          <tr>
            <td class="item-title">时间</td>
            <td class="item-cont">
              {{order.createDate}}
            </td>
          </tr>
          <tr>
            <td class="item-title">项目</td>
            <td class="item-cont">
              <p v-for="(item,index) in order.mgrBillDetailItemList" :key="index">{{item.itemName}}</p>
            </td>
          </tr>
          <tr>
            <td class="item-title">金额</td>
            <td class="item-cont">
              <span class="price1">￥{{order.payMoney}}</span>
              <del>￥{{order.originalMoney}}</del>
            </td>
          </tr>
        </table>
      </div>
      <div class="show-cont" v-html="order.evaluateContent"></div>
      <div class="show-cont" v-for="(item,index) in order.mgrBillEvaluatePicList" :key="index">
        <div><img v-lazy="picIp+item.path" /></div>
      </div>
    </div>
    <div style="margin-bottom:60px;">
      <van-cell-group class="topGroup" v-if="comments.length>0">
          <van-cell title="全部评论"  icon="wap-nav" />
          <van-cell v-for="(item,index) in comments" :key="index">
              <div class="content">
                <div class="bg-cut">
                  <img v-lazy="{ src:picIp+item.ownerHeadPic,loading:defaultTop,error:defaultTop}"  />
                </div>
                <div class="content-name">{{item.ownerName}}</div>
                <div class="content-time">{{item.createDate}}</div>
                <div class="content-content">{{item.comment}}</div>
              </div>
          </van-cell>
        </van-cell-group>
    </div>
    <div class="footer">
      <van-icon name="chat" class="footer-icon" @click="sendComment"/>
      <div class="footer-div">
        <input type="text" v-model="comment" />
      </div>
    </div>
  </div>
</template>
<script>
import { bill, commentList, commentInsert } from '@/api/user'
import { Rate } from 'vant'
import defaultTop from '../../../assets/img/avatar_default.png'
import { localStorageTool } from '@/utils'
export default {
  data() {
    return {
      order: {},
      picIp: process.env.BASE_API,
      rate: '',
      defaultTop: defaultTop,
      comment: '',
      comments: {},
      user: {}
    }
  },
  mounted() {
    const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值
    if (userInfo) { // 获取用户信息、
      this.user = JSON.parse(userInfo)
    }
  },
  created() {
    bill({ id: this.$route.query.id }).then((data) => {
      this.order = data.new// 赋值数据
      this.rate = this.order.totalScore
    })
    this.getComments()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    getComments() {
      commentList({ pageNo: 1, pageSize: 999, billId: this.$route.query.id }).then((data) => {
        this.comments = data.page.records// 赋值数据
      })
    },
    sendComment() {
      commentInsert({ billId: this.$route.query.id, ownerId: this.user.id, comment: this.comment }).then((data) => {
        this.getComments()
        this.$toast('评论成功！')
        this.comment = ''
      })
    }
  },
  components: {
    [Rate.name]: Rate
  }
}
</script>
<style scoped>
img{
  max-width: 100%;
  height: auto;
}
.clear::after{
  content: '';
  display: block;
  clear: both;
  font-size: 0;
}
.show_top{
  position: relative;
  padding: 1.18rem 1.18rem 0.8rem;
}
.user_img{
  float: left;
  width: 3.55rem;
  height: 3.55rem;
  border-radius: 50%;
  margin-right: 0.8rem;
}
.user_img img{
  width: 3.55rem;
  height: 3.55rem;
  border-radius: 50%;
}
.name_date{
  float: left;
}
.name_date h3{
  font-size: 1.18rem;
  font-weight: 500;
  margin: 0.24rem 0;
}
.name_date div{
  color: #999;
  font-size: 1rem;
}
.show-tips{
  position: absolute;
  top: 50%;
  right:0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  height: 2rem;
  line-height:  2rem;
  color: #fff;
  padding-right: 1.18rem;
  padding-left: 2.76rem;
  background: -webkit-linear-gradient(135deg, transparent 1.4rem, #fa5a4b 0, #fa5a4b 1.47rem, transparent 0, transparent 1.71rem, #fa5a4b 0);
  background: linear-gradient(135deg, transparent 1.4rem, #fa5a4b 0, #fa5a4b 1.47rem, transparent 0, transparent 1.71rem, #fa5a4b 0);
}
.table-wrap{
  padding: 0 1.18rem 0.4rem;
}
.table-wrap table{
  border: 1px solid grey;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}
.table-wrap table td{
  border: 1px #e3e3e3 solid;
}
.item-title{
 width:23%;
 text-align: center;
 background: #fcfcfd;
 color: #999;
}
.item-cont{
  width:76%;
  padding: 0.55rem 1.18rem;
  -webkit-box-sizing:border-box;
  box-sizing:border-box;
}
.price1{
  color:#fa5a4b;
  font-size:1.18rem;
  margin-right:0.4rem
}
.show-cont{
  font-size: 1rem;
  padding: 0.47rem 1.18rem 0.4rem;
  word-break: break-all;
  line-height: 1.5;
}
.show-cont img{
  max-width: 100%;
}
.topGroup{
    margin-top: 0.7rem;
}
.content{
  margin-bottom: 0.7rem;
  padding: 0.8rem 1.18rem 0.8rem 3.75rem;
  position: relative;
}
.bg-cut{
  width: 2.76rem;
  height: 2.76rem;
  border-radius: 50%;
  position: absolute;
  left: 0;
}
.bg-cut img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.comment-views{
  color:#999;
  float:right;
  line-height: 1.5rem;
}
.content-name{
  display: inline-block;
  color: #666;
}
.content-time{
  color: #999;
  font-size: 0.9rem;
}
.content-content{
  word-break: break-all;
  font-size: 1.18rem;
}
.footer{
  position: fixed;
  height: 50px;
  width: 100%;
  left: 0;
  bottom: 0;
  background: #e7e7e7;
}
.footer-div{
  height: 30px;
  margin-top: 9px;
  border: 1px solid #ccc;
  margin-right: 55px;
  margin-left: 10px;
  padding: 0 10px;
  background: #fff;
  border-radius: 5px;
}
.footer-div input{
  border: 0;
  background: #fff;
  width: 99%;
  margin: 0 auto;
  height: 28px;
  border-radius: 5px;
}
.footer-icon{
  font-size: 24px;
  float: right;
  padding: 0 1.18rem;
  margin-top: 10px;
  color: #666
}
</style>

