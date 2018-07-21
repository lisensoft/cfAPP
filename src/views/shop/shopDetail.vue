<template>
  <div class="home" >
    <van-nav-bar
      :left-arrow="true"
      :fixed="true"
      title="门店详情"
      left-text=""
      right-text=""
      @click-left="onClickLeft"
    />
    <van-swipe :autoplay="3000" style="height:11rem;" class="mTop" >
      <van-swipe-item v-for="(img,index) in shopDetail.baseCompanyPicList" :key="index">
        <img  v-lazy="picUrl+img.path"  height="100%" width="100%"  />
      </van-swipe-item>
    </van-swipe>
    <van-cell-group   >
      <van-cell :title="shopDetail.companyName"  >
         <van-icon slot="right-icon" name="phone" class="van-cell__right-icon" />
      </van-cell>
      <van-cell  >
        <div class="sort">
          <span><span class="sort-large">{{ shopDetail.score ? shopDetail.score : 0}}</span>分</span>
          <div class="sort-right">
            <span class="sort-large">8km</span>
          </div>
        </div>
      </van-cell>
      <van-cell :title="shopDetail.address"  >
         <van-icon slot="right-icon" name="location" class="van-cell__right-icon" />
      </van-cell>
    </van-cell-group>
    <div class="topGroup">
      <van-steps>
        <van-step>买家下单</van-step>
        <van-step>商家接单</van-step>
        <van-step>买家提货</van-step>
        <van-step>交易完成</van-step>
      </van-steps>
    </div>
    <van-cell-group  class="topGroup" >
      <van-cell :title="'服务项目('+itemNum+')'"  icon="wap-nav" />
      <van-cell v-for="(item,index) in itemList" :key="index" >
        <div class="item-list">
          <div class="item-right">
            <span class="item-buy" @click="goCharge(item.itemCode)">购买</span>
          </div>
          <div class="item-left" @click="goItemDetail(item.itemCode)">
            <div class="item-name">{{item.itemName}}</div>
            <div class="item-descript">{{item.itemDescription}}</div>
            <div class="item-price">
              <span>￥{{item.itemPrice}}</span>
              <del>门店价￥499</del>
            </div>
          </div>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group  class="topGroup" >
      <van-cell title="车主评价"  icon="wap-nav" />
      <van-cell >
        <van-row>
          <van-col span="8" class="pingJia-left" >
            <div style="text-align:center;" >
              <div style="height:2.5rem;color:red;line-height:2.5rem;margin-top:1rem" ><span style="font-size:2rem" >{{topCounts.totalScore}}</span>分</div>
              <div>总体点评</div>
            </div>
          </van-col>
          <van-col span="16" class="pingJia-right" >
            <div style="margin-top:1.5rem">
              服务态度<span style="color:rgb(255, 210, 30)" ><van-rate v-model="topCounts.serviceAttitudeScore" :size="15" disabled style="display:inline-block;margin-left:5px;color:#FFD21E" /> {{topCounts.serviceAttitudeScore}}分</span>
            </div>
            <div>
              维修效率<span style="color:rgb(255, 210, 30)" ><van-rate v-model="topCounts.repaireEfficieneyScore" :size="15" disabled style="display:inline-block;margin-left:5px" /> {{topCounts.repaireEfficieneyScore}}分</span>
            </div>
          </van-col>
        </van-row>
        <van-row gutter="20">
          <van-col span="6"><div class="divBotton" :class="{activeBottom:bottomType==0}" @click="bottomType=0" >全部({{topCounts.totalCount}})</div>
          </van-col>
          <van-col span="6"><div class="divBotton" :class="{activeBottom:bottomType==1}" @click="bottomType=1">好评({{topCounts.greatEvaluateCount}})</div>
          </van-col>
          <van-col span="6"><div class="divBotton" :class="{activeBottom:bottomType==2}" @click="bottomType=2">晒单({{topCounts.havePicCount}})</div>
          </van-col>
          <van-col span="6"><div class="divBotton" :class="{activeBottom:bottomType==3}" @click="bottomType=3">差评({{topCounts.badEvaluateCount}})</div>
          </van-col>
        </van-row>
      </van-cell>
    </van-cell-group>
    <van-cell-group  class="topGroup" style="margin-bottom:50px;" >
      <comment :checktype="bottomType"></comment>
    </van-cell-group>
    <!-- <div class="bottomButton">
      <div class="bottomButton-item" > <svg-icon :icon-class="'clean'"></svg-icon><br/>洗车</div>
      <div class="bottomButton-item" > <svg-icon :icon-class="'weixiu'"></svg-icon><br/>维修</div>
      <div class="bottomButton-item" > <svg-icon :icon-class="'banpen'"></svg-icon><br/>钣喷</div>
      <div class="bottomButton-item" > <svg-icon :icon-class="'kefu'"></svg-icon><br/>客服</div>
    </div> -->
  </div>
</template>
<script>
import { Swipe, SwipeItem, Row, Col, Rate, Step, Steps } from 'vant'
import comment from '@/components/comment'
import { getShopDetail, getTopCounts } from '@/api/shop'
import { itemList } from '@/api/xiche'
export default {
  data() {
    return {
      picUrl: process.env.BASE_API,
      imgList: [], // 轮播图
      shopDetail: {}, // 门店详细
      // fwValue: 5,
      bottomType: 0, // 0全部1好评2晒单3差评
      topCounts: {},
      itemList: [],
      itemNum: 0
    }
  },
  mounted() {
    if (this.$route.query.id) {
      getShopDetail({ id: this.$route.query.id }).then((data) => {
        this.shopDetail = data.new
      })
      getTopCounts({ companyId: this.$route.query.id }).then((data) => {
        this.topCounts = data.new
      })
      itemList({ companyId: this.$route.query.id, pageNo: 1, pageSize: 999 }).then((data) => {
        this.itemList = data.page.records
        this.itemNum = this.itemList.length
      })
    }
  },
  activated() {
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    goItemDetail(itemCode) {
      this.$router.push({ path: '/shop/itemDetail',
        query: { id: this.$route.query.id, itemCode: itemCode }
      })
    },
    goCharge(itemCode) {
      this.$router.push({ path: '/user/myOrder/charge',
        query: { id: this.$route.query.id, itemCode: itemCode }
      })
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Rate.name]: Rate,
    comment,
    [Step.name]: Step,
    [Steps.name]: Steps
  }
}
</script>
<style scoped>
 .sort{
    color: #fa5a4b;
    font-size: 0.85rem;
    font-weight: 600;
  }
  .sort-large{ font-size: 1.18rem}
  .sort-right{
    float: right;
  }
  .topGroup{
    margin-top: 0.7rem;
  }
  .pingJia-left{
    height: 6.2rem;
  }
  .divBotton{
    width: 100%;
    text-align: center;
    border-radius: 5px;
    background-color: #f4f4f8;
    color: #999999;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .activeBottom{
    background-color: #ffa028;
    color: #fff;
  }
  .bottomButton{
    position: fixed;
    bottom: 0;
    width: 100%;
    overflow-x: auto;
    height: 50px;
    line-height: 20px;
    background-color: #fff;
    border-top: solid 1px #e5e5e5;
  }
  .bottomButton-item{
    height: 45px;
    display: inline-block;
    width: 50px;
    padding-top: 5px;
    text-align: center;
  }
  .item-title{
    padding: 0.3rem 1.18rem;
    color: #333;
  }
  .item{
    background: #fff;
  }
  .item li{
    padding: 0.8rem 1.18rem;
    color: #333;
    -webkit-box-shadow: 1.18rem 1px 0 rgba(0, 0, 0, 0.04);
    box-shadow: 1.18rem 1px 0 rgba(0, 0, 0, 0.04);
  }
  .item-detail{
    float: right;
    color: #fa5a4b;
  }
  .item-buy{
    border: 1px solid #fa5a4b;
    float: right;
    color: #fa5a4b;
    padding: 0 5px;
    border-radius: 8px;
    line-height: 1.5;
    font-size: 1rem;
  }
  .item-price span{
    color: #fa5a4b;
  }
  .item-price del{
    color: #999;
  }
  .item-list{
    padding: 0rem 0.5rem;
    position: relative;
  }
  .item-left{
    width: 80%;
  }
  .item-right{
    position: absolute;
    top:50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    right:1.18rem;
    color: #666;
    font-size: 1.25rem;
  }
  .item-name{
    color: #000;
    font-weight: 600;
  }
  .item-descript{
    color: #999
  }
</style>

