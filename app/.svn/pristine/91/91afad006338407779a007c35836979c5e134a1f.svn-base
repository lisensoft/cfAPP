<template>
  <div>
    <van-nav-bar
        title="积分商城"
        left-text=""
        right-text=""
        left-arrow
        :fixed="true"
        @click-left="onClickLeft"
    />
    <van-cell-group  style="position:fixed;top:45px;width:100%;" >
      <van-cell >
        <van-row>
          <van-col span="12" style="text-align:center;"><van-icon name="exchange"  style="margin-top:5px;"/>&nbsp;积分&nbsp;<span style="color:red;">{{user.totalIntegral?user.totalIntegral:0}}</span> </van-col>
          <van-col span="12" style="text-align:center;border-left:1px solid #e5e5e5;"><van-icon name="records"  style="margin-top:5px;"/>&nbsp;兑换记录</van-col>
        </van-row>
      </van-cell>
    </van-cell-group>
    <scroll  ref="scroll" :data="list"  :style="cssH"  :pullDownRefresh="true" :pullUpLoad="!noMore"   @pullingDown="onPullingDown" @pullingUp="onPullingUp" v-show="!isEmpty" style="margin-top:92px"  >
      <van-cell v-for="(item,index) in list" :key="index" :to="{path:'/user/integral/detail', query: { id: item.id }}">
        <div class="news-item">
          <div class="news-img">
            <img   v-lazy="item.baseIntegralGoodsPicList.length>0?picIp+item.baseIntegralGoodsPicList[0].path:''" >
          </div>
          <div class="news-content">
            <div class="news-title">{{item.name}}</div>
            <div class="sort">
              <span><span class="sort-large">{{ item.integralValue ? item.integralValue : 0}}</span>积分</span>
            </div>
          </div>
        </div>
      </van-cell>
    </scroll>
    <is-empty v-model="isEmpty" >抱歉,没有最新消息</is-empty>
  </div>
</template>
<script>
import { Row, Col } from 'vant'
import { getIntegralList } from '@/api/integral'
import Scroll from '@/components/scroll/scroll.vue'
import betterScroll from '@/mixins/betterScroll'
import { localStorageTool } from '@/utils'
export default {
  mixins: [betterScroll],
  data() {
    return {
      list: {},
      user: {}
    }
  },
  mounted() {
    this.resetInit()
    const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值
    if (userInfo) { // 获取用户信息、
      this.user = JSON.parse(userInfo)
    } else {
      this.user = {}
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    async initData() {
      const total = await getIntegralList({ pageNo: this.pages.currPage, pageSize: this.pages.perPage, isShow: 1 }, true).then((ret) => {
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
    [Row.name]: Row,
    [Col.name]: Col,
    Scroll
  }
}
</script>
<style scoped>
.news-item{
   position: relative;
   /* padding: 0.6rem 0.5rem; */
   /* font-size: 1.18rem; */
   height: 6rem;
   /* margin-top: 10px; */
 }
 .news-img{
   width: 8rem;
   height: 6rem;
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
    height: 4rem;
    line-height: 4rem;
  }
  .sort-large{ font-size: 1.18rem}
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
.flex-img{margin: 5px;padding: 0 10px; background: no-repeat center;height: 9rem; background-size: cover;}
</style>

