<template>
  <div>
    <van-nav-bar
      title="头条"
      left-text=""
      right-text=""
      :left-arrow="false"
      :fixed="true"
    />
    <scroll  ref="scroll" :data="list"  :style="cssH"  :pullDownRefresh="true" :pullUpLoad="!noMore"   @pullingDown="onPullingDown" @pullingUp="onPullingUp"  v-show="!isEmpty" style="margin-top:47px"  >
      <van-cell v-for="(item,index) in list" :key="index" :to="{name:'头条详情', query: { id: item.id }}" @click="item.hits++">
          <div class="news-items">
            <div class="news-img">
              <img  v-lazy="picIp+item.imgPath" >
            </div>
            <div class="news-content">
              <div class="news-title">{{ item.title }}</div>
            <div class="news-bottom">
              <span class="news-author">{{ item.author }}</span>
              <div class="news-visited">
                <van-icon name="password-view"/>
                <span>{{ item.hits }}</span>
                <span v-show = !item.hits>0</span>
              </div>
            </div>
            </div>
          </div>
      </van-cell>
    </scroll>
    <is-empty v-model="isEmpty" >抱歉,没有最新消息</is-empty>
  </div>
</template>
<script>
import { newsList } from '@/api/news'
import imageURL from '@/assets/logo.png'
import IsEmpty from '@/components/is-empty/'
import betterScroll from '@/mixins/betterScroll'
import Scroll from '@/components/scroll/scroll.vue'
export default {
  mixins: [betterScroll],
  data() {
    return {
      imageURL: imageURL,
      list: [],
      picIp: process.env.BASE_API,
      cssH: {
        'height': (window.innerHeight - 100) + 'px'
      }
    }
  },
  watch: {
    '$store.getters.currentCity'(newVal) { // 监视地区变化
      this.resetInit()// 更新页数
    }
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  mounted() {
    this.resetInit()
  },
  methods: {
    async initData() {
      const total = await newsList({ pageNo: this.pages.currPage, pageSize: this.pages.perPage, isShow: 1, areaId: this.$store.getters.currentCity.id }, true).then((ret) => {
        if (this.pages.currPage === 1) {
          this.list = ret.page.records
        } else {
          this.list.push(...ret.page.records)
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
 .news-item{
   position: relative;
   padding: 0.79rem 1.18rem;
   font-size: 1.18rem;
 }
 .news-img{
   width: 8.67rem;
   height: 5.91rem;
   border-radius: 0.32rem;
  }
  .news-img img{
    width:100%;
    height: 100%;
    border-radius: 0.35rem;
  }
  .news-content{
    position: absolute;
    left: 10.5rem;
    right:0.8rem;
    top: 0.5rem;
    height:5.91rem;
  }
  .news-title{
    color: #333;
    font-size: 1.18rem;
    margin-top: 0.08rem;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .news-bottom{
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    color: #999;
    font-size: 0.95rem;
  }
  .news-visited{
    float: right;
  }
</style>
