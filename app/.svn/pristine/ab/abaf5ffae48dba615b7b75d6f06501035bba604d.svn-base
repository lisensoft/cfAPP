<template>
  <div :style="cssH">
    <van-nav-bar    :left-arrow="false" :fixed="true" :style="rgbaS"  :class="{'border0':showBorder}"  :z-index="10"  >
      <div  slot="left" :class="{'leftColr':colorL}" @click="urlArea()" >{{$store.getters.currentCity.city}}</div>
      <div  slot="title" :style="opacityS" >驷惠车服</div>
    </van-nav-bar>
    <scroll  ref="scroll"   :pullDownRefresh="true" :pullUpLoad="false" @pullingDown="onPullingDown"   :listenScroll="true" @scroll="handleScroll" >
      <van-swipe :autoplay="3000" style="height:12rem;" ref="swipe" :touchable="false" >
        <van-swipe-item v-for="(img,index) in imgList" :key="index" @click.native="clickMenuItem(img.url)">
          <img  v-lazy="picUrl+img.imgPath"  height="100%" width="100%"  />
        </van-swipe-item>
      </van-swipe>
      <div class="flexbox"  >
        <div class="flexTop1" v-for="(item,index) in topMenu" :key="index" @click="clickMenuItem(item.url)">
          <div class="iconimg">
            <img  v-lazy="picUrl+item.imgPath" alt="">
          </div>
          <div class="itemname">
            {{item.title}}
          </div>
        </div>
      </div>
      <van-cell-group>
        <van-cell>
          <van-row  gutter="10">
            <!--<van-col span="4"  class="colClass newsImg"></van-col>-->
            <van-col span="4"><span class="jian">推荐</span></van-col>
            <van-col span="20" class="colClass">
              <van-swipe :autoplay="3000"  class="overflow colClass"  vertical :show-indicators="false" :touchable="false">
                <van-swipe-item v-for="(text,index) in textList" :key="index" @click.native="$router.push({path:'/news/detail', query: { id: text.id }})"  >
                  {{text.title}}
                </van-swipe-item>
              </van-swipe>
            </van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
      <van-cell-group  class="topGroup" >
        <van-row>
          <van-col span="12" class="guanggao" style="border-right:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1;" v-lazy:background-image="adImg1" >
          </van-col>
          <van-col span="12" class="guanggao" style="border-bottom:1px solid #f1f1f1;" v-lazy:background-image="adImg2" @click.native="clickMenuItem('/shop/maintain/handbook')">
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12" class="guanggao" style="border-right:1px solid #f1f1f1;" v-lazy:background-image="adImg3" >
          </van-col>
          <van-col span="12" class="guanggao"  v-lazy:background-image="adImg4" >
          </van-col>
        </van-row>
      </van-cell-group>
      <van-row v-if="$store.getters.myDefaultCar.carType" class="topGroup mycar">
          <van-col span="3">
            <svg-icon :icon-class="'car'" style="color:#96d20a"></svg-icon>
          </van-col>
          <van-col span="19" @click="goCar">{{$store.getters.myDefaultCar.carType}}</van-col>
          <van-col span="2" style="text-align:right">
            <van-icon name="arrow" @click="goCar"/>
          </van-col>
        </van-row>
      <van-cell-group  class="topGroup" >
        <!--<van-cell icon="" :title="$store.getters.myDefaultCar.carType"  v-if="$store.getters.myDefaultCar.carType" is-link >
        </van-cell>-->
        <van-cell title="热门套餐"  icon="wap-nav"  >
          <div style="color:#ffa028;" v-if="!$store.getters.myDefaultCar.carType"   @click="$router.push({path:'/user/myCar'})" ><van-icon name="add" /> 添加爱车</div>
        </van-cell>
        <van-cell>
          <van-row  gutter="10">
            <van-col span="6"  >
              <img src="../../assets/img/meal1.png" alt="" height="100%" width="100%" >
            </van-col>
            <van-col span="6" >
              <img src="../../assets/img/meal2.png" alt="" height="100%" width="100%">
            </van-col>
            <van-col span="6" >
              <img src="../../assets/img/meal3.png" alt="" height="100%" width="100%" >
            </van-col>
            <van-col span="6" >
              <img src="../../assets/img/meal4.png" alt="" height="100%" width="100%" >
            </van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
      <van-cell-group  class="topGroup" >
        <van-cell title="车主评价"  icon="wap-nav" />
        <comment></comment>
      </van-cell-group>
    </scroll>
  </div>
</template>
<script>
import { Swipe, SwipeItem, Row, Col, List } from 'vant'
import comment from '@/components/comment'
import { getCarousel, getcategory } from '@/api/home'
import { newsList } from '@/api/news'
import Scroll from '@/components/scroll/scroll.vue'
export default {
  data() {
    return {
      picUrl: process.env.BASE_API,
      imgList: [], // 轮播图
      topMenu: [], // 顶部菜单
      opacityS: {// 标题的样式
        'opacity': 0
      },
      colorL: 1, // 左侧地区颜色变化
      showBorder: 1, // 是否让border 为0
      rgbaS: {// 背景颜色的透明样式
        'background-color': 'rgba(0,0,0,0)'
      },
      cssH: {
        'height': (window.innerHeight - 50) + 'px'
      },
      textList: [], // 新闻的信息
      adImg1: 'https://ocpvgmewj.qnssl.com/mkt_banner_ad/banner_ad_iphone_img/20180518/60531ccd-8f20-4b45-88f6-598ec86cbfc8.png',
      adImg2: 'https://ocpvgmewj.qnssl.com/mkt_banner_ad/banner_ad_iphone_img/20180525/cc5300c6-15f2-451d-8b52-d63004b4739e.png',
      adImg3: 'https://ocpvgmewj.qnssl.com/mkt_banner_ad/banner_ad_iphone_img/20171221/c1a6303b-584f-4da1-86a1-52159930ba76.png',
      adImg4: 'https://ocpvgmewj.qnssl.com/mkt_banner_ad/banner_ad_iphone_img/20171221/f3568902-3e73-42b4-ac8f-01b8f5fdf6b1.png',
      carImg: 'https://ocpvd5a60.qnssl.com/car/brand_logo/20171204/d6302cf1-ceec-450f-a915-c4d88fbe5ab8.png'
    }
  },
  watch: {
    '$store.getters.currentCity'(newVal) { // 监视地区变化
      this.$nextTick(() => {
        this.getCarousel()
        this.category()
        this.getNewsHot()
      })
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.getCarousel()
      this.category()
      this.getNewsHot()
    })
  },
  activated() {
    this.$store.dispatch('scrollTo', this.$route)
    this.$refs.scroll.refresh()
  },
  methods: {
    goCar() {
      this.$router.push({ path: '/user/myCar' })
    },
    onPullingDown() {
      this.category()
      this.getNewsHot()
      this.getCarousel()
      setTimeout(() => {
        this.$refs.scroll.forceUpdate()
      }, 1000)
    },
    getNewsHot() { // 获取人们新闻
      this.textList = []
      newsList({ pageNo: 1, pageSize: 8, isShow: 1, areaId: this.$store.getters.currentCity.id, flagHot: 1 }, true).then((ret) => {
        if (ret.page.records) {
          this.textList = ret.page.records
        }
      })
    },
    clickMenuItem(url) {
      if (url) {
        if (url.indexOf('http') >= 0) {
          window.location.href = url
        } else {
          this.$router.push({ path: url })
        }
      }
    },
    getCarousel() {
      this.imgList = []
      getCarousel({ areaId: this.$store.getters.currentCity.id }).then((data) => { // 获取轮播图
        this.imgList = data.carouselList
      })
    },
    category() {
      this.topMenu = []
      getcategory({ areaId: this.$store.getters.currentCity.id }).then((data) => { // 获取首页类别
        this.topMenu = data.carouselList
      })
    },
    handleScroll(scroll) {
      const picHeight = this.$refs['swipe'].height - 46
      let o = 0
      this.showBorder = 1
      this.colorL = 0
      // scroll.y = Math.abs(scroll.y)
      if (scroll.y > 0) {
        this.colorL = 1
        o = 0 // 头部动态处理
      } else { // <=0
        scroll.y = Math.abs(scroll.y)
        if (scroll.y >= 0 && scroll.y <= 40) {
          this.colorL = 1
          o = 0 // 头部动态处理
        } else if (scroll.y > 40 && scroll.y < picHeight) {
          o = scroll.y / picHeight
        } else {
          o = 1 // 头部动态处理
          this.showBorder = 0
        }
      }
      this.opacityS = { 'opacity': o }
      this.rgbaS = {// 背景颜色的透明样式
        'background-color': 'rgba(255,255,255,' + o + ')'
      }
    },
    urlArea() {
      this.$router.push({ path: '/home/area' })
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [List.name]: List,
    comment,
    Scroll
  }
}
</script>
<style scoped>
  .leftColr{
    color:#fff;
  }
  .van-nav-bar__left{
    color: #fff;
  }
  .border0 .van-nav-bar__left{
    color: #fff;
  }
  .border0::after{
    border-bottom-width:0px;
  }
  .iconimg img {
    width: 3.5rem;
    height: 3.5rem;
  }
  .flexbox {
    background-color: #fff;
    padding: 0.5rem 0;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    text-align: center;
  }
  .flexTop1{
     flex: 0 0 20%;
     margin-top:  0.7rem;
    position: relative;
  }
  .itemname {
    color: #666;
  }
  .carItem {
    color: red;
    text-align: center;
  }
  .colClass{
    height:2.2rem;line-height:2.2rem;
  }
  .newsImg{
    background:url(../../assets/img/news.png) no-repeat 0px -0.5rem;
    background-size:70%;
  }
  .guanggao{
    height: 5rem;
    background-size:100% 100%;
  }
  .iconCar{
    width: 60%;
    margin: 0 auto;
    height: 4rem;
    background-size:100% 100%;
  }
  .jian{
    color: #ffa028;
    border: 1px solid #ffa028;
    border-radius: 3px;
    padding: 3px;
    font-size: 0.875rem;
  }
  .mycar{
    background: #fff;
    padding:10px 15px;
    height: 1rem;
    line-height: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

