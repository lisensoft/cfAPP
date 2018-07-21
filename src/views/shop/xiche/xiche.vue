<template>
  <div>
    <van-nav-bar
      title="洗车"
      left-text=""
      right-text=""
      :left-arrow="true"
      :fixed="true"
       @click-left="onClickLeft"
      style="z-index:10;"
    />
    <div class="page-top">
      <div class="flex-wrap">
        <div class="flex top-item">距离最近</div>
        <div class="vertical-line"></div>
        <div class="flex top-item">销量最高</div>
      </div>
    </div>
    <scroll  ref="scroll" :data="list"  :style="cssH"  :pullDownRefresh="true" :pullUpLoad="!noMore"    @pullingDown="onPullingDown" @pullingUp="onPullingUp"  v-show="!isEmpty" style="margin-top:87px"  >
      <van-cell v-for="(item,index) in list" :key="index" :to="{path:'/shop/washCar/detail', query: { id: item.id }}">
        <div class="news-item">
          <div class="news-img">
            <img   v-lazy="picIp+item.companyLogo" >
          </div>
          <div class="news-content">
            <div class="news-title">{{item.companyName}}</div>
            <div style="color:#999">已售0</div>
            <div class="address">{{item.address}}</div>
          </div>
        </div>
      </van-cell>
    </scroll>
    <is-empty v-model="isEmpty" >抱歉,没有最新消息</is-empty>
  </div>
</template>
<script>
import { shopList } from '@/api/shop'
import IsEmpty from '@/components/is-empty/'
import Scroll from '@/components/scroll/scroll.vue'
import betterScroll from '@/mixins/betterScroll'
export default {
  mixins: [betterScroll],
  data() {
    return {
      list: [],
      kindList: [],
      picIp: process.env.BASE_API,
      cssH: {
        'height': (window.innerHeight - 88) + 'px'
      }
    }
  },
  mounted() {
    this.resetInit()
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    async initData() {
      const total = await shopList({ pageNo: this.pages.currPage, pageSize: this.pages.perPage, selectType: 0 }, true).then((ret) => {
        if (ret.page.records) {
          if (this.pages.currPage === 1) {
            this.list = ret.page.records
          } else {
            this.list.push(...ret.page.records)
          }
        }
        return ret.page.total
      })
      return total
    }
  },
  components: {
    IsEmpty,
    Scroll
  }
}
</script>
<style scoped>
.page-top{
   position: fixed;
   top: 46px;
   left: 0;
   z-index: 1;
   width: 100%;
  }
  .flex-wrap{
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #ededee;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .flex{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .top-item.active{
    color: red;
  }
  .vertical-line{
    position: relative;
  }
  .vertical-line::after{
    top: 5px;
    bottom: 5px;
    background: #ccc;
    content: '';
    width: 1px;
    position: absolute;
    -webkit-transform: scale(0.5,1);
    transform: scale(0.5,1)
  }
 .news-item{
   position: relative;
   height: 7rem;
 }
 .news-img{
   width: 8rem;
   height: 6rem;
   padding-top: 0.5rem;
   border-radius: 0.32rem;
  }
  .news-img img{
    width:100%;
    height: 100%;
    border-radius: 0.35rem;
  }
  .news-content{
    position: absolute;
    left: 9rem;
    right:0rem;
    top: 0rem;
    height:auto;
  }
  .news-title{
    color: #333;
    font-size: 1.1rem;
    margin-top: 0.08rem;
    display: -webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .address{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666;
    font-size: 1rem;
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
</style>
