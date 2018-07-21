<template>
  <div class="home" >
    <van-nav-bar
      :left-arrow="true"
      :fixed="true"
      title="套餐详情"
      left-text=""
      right-text=""
      @click-left="onClickLeft"
    />
    <van-swipe :autoplay="3000" style="height:11rem;" class="mTop" >
      <van-swipe-item v-for="(img,index) in shopDetail.baseCompanyPicList" :key="index">
        <img  v-lazy="picUrl+img.path"  height="100%" width="100%"  />
      </van-swipe-item>
    </van-swipe>
    <div class="item-top">
      <span class="item-price">￥{{mealDetail.price}}</span>
      <span class="item-title">{{mealDetail.name}}</span>
    </div>
    <div class="note">
      <span><van-icon name="success" /> 服务保障</span>
      <span><van-icon name="cash-back-record" /> 过期退</span>
      <span><van-icon name="clock" /> 随时退</span>
    </div>
    <div class="form_wrap">
      <div class="shop-detail">
         <div class="company">
           <div class="company-name">{{shopDetail.companyName}}</div>
           <div class="company-grey">{{shopDetail.address}}</div>
           <div class="company-grey">营业时间:{{shopDetail.companyTime}}</div>
         </div>
         <div class="compay-tel"><van-icon name="phone" /></div>
      </div>
    </div>
    <div class="form_wrap" style="margin-bottom:60px">
        <div class="item_wrap">套餐内容 </div>
        <div class="item_list">
          <ul>
            <li>
              <span class="order-label">服务内容</span>
              {{mealDetail.descripition}}
            </li>
          </ul>
        </div>
        <div class="item_wrap">购买须知 </div>
        <div class="item_list">
          <ul>
            <li>
              <span class="order-label">使用期限</span>
              长期有效
            </li>
            <li>
              <span class="order-label">预约提示</span>
              无需预约，到店即可消费(时间较长业务建议提前跟店家沟通合理安排时间)
            </li>
            <li>
              <span class="order-label">退款提示</span>
              凡购买服务没有消费都可随时退款
            </li>
          </ul>
        </div>
      </div>
      <div class="page-bottom" >
        <van-button type="primary" bottom-action @click="goCharge()">立即购买</van-button>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem, Icon, Button } from 'vant'
import { mealDetail, getShopDetail } from '@/api/shop'
export default {
  data() {
    return {
      picUrl: process.env.BASE_API,
      imgList: [], // 轮播图
      mealDetail: {}, // 套餐详情
      shopDetail: {} // 门店详细
    }
  },
  mounted() {
    if (this.$route.query.setmealId) {
      mealDetail({ id: this.$route.query.setmealId }).then((data) => {
        this.mealDetail = data.new // 查看某个套餐
        console.log(this.mealDetail)
      })
    }
    if (this.$route.query.id) {
      getShopDetail({ id: this.$route.query.id }).then((data) => {
        this.shopDetail = data.new
      })
    }
  },
  activated() {
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    goCharge() {
      this.$router.push({ path: '/user/myOrder/charge',
        query: { id: this.$route.query.id, setmealId: this.$route.query.setmealId }
      })
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    [Button.name]: Button
  }
}
</script>
<style scoped>
  .item-top{
    padding:1.5rem 1.18rem;
    background: #fff;
    font-size:1.18rem;
  }
  .item-title{
    color: #333;
    font-weight: 600;
  }
  .item-price{
    color: red;
    float: right;
  }
  .note{
    padding: 0.8rem 1.18rem 0;
    color: #FF674F;
  }
  .note span{
    margin-right: 1rem;
  }
  .form_wrap{
  background: #fff;
  margin-top: 0.8rem;
  position: relative;
  box-shadow: 0 1px 0 rgba(0,0,0,0.04)
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
.order-label{
  float: left;
  text-align: left;
  color: #FF674F;
  width: 5.5rem;
}
.shop-detail{
  padding: 0.5rem 1.18rem;
  position: relative;
}
.company{
  width: 80%;
}
.company-name{
  font-size: 1.1rem;
  color: #333;
}
.company-grey{
  color: #999;
}
.compay-tel{
  position: absolute;
  top:50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  right:1.18rem;
  color: #666;
  font-size: 1.25rem;
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

