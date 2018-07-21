<template>
  <div>
    <van-nav-bar
      title="门店"
      left-text=""
      right-text=""
      :left-arrow="false"
      :fixed="true"
      style="z-index:10;"
    />
    <MultiQuery  @change="changeType"></MultiQuery>
    <scroll  ref="scroll" :data="list"  :style="cssH"  :pullDownRefresh="true" :pullUpLoad="!noMore"   @pullingDown="onPullingDown" @pullingUp="onPullingUp"  v-show="!isEmpty" style="margin-top:87px"  >
      <van-cell v-for="(item,index) in list" :key="index" :to="{path:'/shop/detail', query: { id: item.id }}">
        <div class="news-item">
          <div class="news-img">
            <img   v-lazy="picIp+item.companyLogo" >
          </div>
          <div class="news-content">
            <div class="news-title">{{item.companyName}}</div>
            <div class="sort">
              <span><span class="sort-large">{{ item.score ? item.score : 0}}</span>分</span>
              <div class="sort-right">
                <span class="sort-large">8km</span>
              </div>
            </div>
            <div style="height:24px; overflow:hidden">
              <span class="tips-item" v-for="(item2,index) in item.baseCompanyKindList" :key="index">{{item2.typeName}}</span>
            </div>
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
import imageURL from '@/assets/logo.png'
import IsEmpty from '@/components/is-empty/'
import MultiQuery from '@/components/multiQuery'
import Scroll from '@/components/scroll/scroll.vue'
import betterScroll from '@/mixins/betterScroll'
export default {
  mixins: [betterScroll],
  data() {
    return {
      imageURL: imageURL,
      list: [],
      kindList: [],
      picIp: process.env.BASE_API,
      cssH: {
        'height': (window.innerHeight - 137) + 'px'
      },
      selectTypeValue: '' // 选择类型的结果
    }
  },
  watch: {
    '$store.getters.currentCity'(newVal) { // 监视地区变化
      this.$nextTick(() => {
        this.resetInit()// 更新页数
      })
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
      const total = await shopList({ pageNo: this.pages.currPage, pageSize: this.pages.perPage, selectType: this.selectTypeValue, city: this.$store.getters.currentCity.city }, true).then((ret) => {
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
    },
    changeType(item) {
      this.selectTypeValue = item.value
      this.resetInit()// 更新页数
    }
  },
  components: {
    IsEmpty,
    MultiQuery,
    Scroll
  }
}
</script>
<style scoped>
 .news-item{
   position: relative;
   /* padding: 0.6rem 0.5rem; */
   /* font-size: 1.18rem; */
   height: 7rem;
   /* margin-top: 10px; */
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
  .sort{
    color: #fa5a4b;
    font-size: 0.85rem;
    font-weight: 600;
  }
  .sort-large{ font-size: 1.18rem}
  .sort-right{
    float: right;
  }
  .tips-item{
    min-width: 2rem;
    height: 1.18rem;
    color: #ffaa3f;
    margin-right: 0.4rem;
    display: inline-block;
    padding: 0 0.4rem;
    border: 1px solid #ffaa3f;
    line-height: 1.18rem;
    border-radius: 3px;
    font-size: 0.875rem;
    text-align: center;
  }
  .address{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #999;
    font-size: 0.875rem;
  }
</style>
