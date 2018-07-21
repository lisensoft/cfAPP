<template>
  <div class="home" >
    <van-nav-bar    :left-arrow="true"  :fixed="true"  title="店铺详情" left-text="" right-text="" @click-left="onClickLeft" >
    </van-nav-bar>
    <div class="page-top">
      <div class="xi-wrap">
        <div class="xi-img">
          <img v-lazy="picIp+shopDetail.companyLogo"/>
        </div>
        <div class="xi-item">
          <div class="shop-name">{{shopDetail.companyName}}</div>
          <div class="xi-time">{{shopDetail.companyTime}}</div>
          <div class="xi-time">
            <a href="tel:shopDetail.phone" style="float:right">
              <van-icon slot="right-icon" name="phone" class="van-cell__right-icon" style="font-size:1.25rem; color:#999" />
            </a>
            <span>已售0</span>
          </div>
        </div>
      </div>
      <div class="address">
        <svg-icon :icon-class="'location'"></svg-icon>
        {{shopDetail.address}}
      </div>
    </div>
    <div class="page-content" id="XSDFXPage">
    </div>
    <div class="page-bottom">
        <div class="xi-pay">
          ￥<span class="xi-pay-money">24</span>起
        </div>
        <!--<div class="xi-count">全城248家商户通用 </div>-->
        <button class="xi-button" @click="goCheck">去买单</button>
    </div>
  </div>
</template>
<script>
import { Row, Col } from 'vant'
import { getShopDetail } from '@/api/shop'
import { MP } from '@/map.js'
export default {
  data() {
    return {
      picIp: process.env.BASE_API,
      shopDetail: {} // 门店详细
    }
  },
  mounted() {
    if (this.$route.query.id) {
      getShopDetail({ id: this.$route.query.id }).then((data) => {
        this.shopDetail = data.new
        this.initMap()
      })
    }
  },
  activated() {
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    initMap() {
      // 新增打开和编辑打开的时候
      MP().then(BMap => {
        // const this_ = this
        var map = new BMap.Map('XSDFXPage', { enableMapClick: true })
        // 如果lng有值 表示是编辑，那么通过经纬度确定标点位置
        console.log(this.shopDetail.lng)
        if (this.shopDetail.lng) {
          console.log('sssssssss')
          var point = new BMap.Point(this.shopDetail.lng, this.shopDetail.lat)
          map.centerAndZoom(new BMap.Point(this.shopDetail.lng, this.shopDetail.lat), 16)
          var marker = new BMap.Marker(point)
          map.addOverlay(marker)
        } else {
          map.centerAndZoom('上海市', 16)
        }
      })
    },
    goCheck() {
      this.$router.push({ path: '/shop/washCar/charge',
        query: { id: this.shopDetail.id }
      })
    }
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    MP
  }
}
</script>
<style scoped>
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
  .xi-wrap{
    position: relative;
    padding: 0.87rem 0;
    background: #fff;
    box-shadow: 1.18rem 1px 0 rgba(0,0,0,0.04)
  }
  .xi-img{
    width: 5.5rem;
    height: 4.7rem;
    left: 1.18rem;
    overflow: hidden;
    position: absolute;
    z-index: 2;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .xi-img img{
    width: 100%;
    height: 100%;
  }
  .xi-item{
    position: relative;
    padding: 0 1.18rem 0 8.28rem;
  }
  .shop-name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.18rem;
  }
  .xi-time{
    color: #999;
    margin: 0.24rem 0;
    font-size: 1rem;
  }
  .address{
    background: #fff;
    padding: 1.1rem 1.18rem;
    color: #666;
    box-shadow: 1.18rem 1px 0 rgba(0,0,0,0.04);
    font-size: 1rem;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .address svg{
    float:right;
    font-size: 1.25rem;
  }
  .page-top{
    position: absolute;
    left: 0;
    top:46px;
    z-index: 5;
    width: 100%;
    /* border-top:5px solid #f2f2f2; */
  }
  .page-content{
    position: relative;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>

