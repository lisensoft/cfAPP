<template>
  <van-list v-model="loading" :finished="noMore" @load="loadMore"  class="backColor"  >
    <van-cell v-for="(item,index) in list" :key="index" style="margin-bottom:0.7rem;" :to="{path:'/user/myOrder/reviewDetail', query: { id: item.id }}" >
      <div class="show-top">
        <div class="show-user-photo"   v-lazy:background-image="{ src:picIp+item.ownerHeadPic,loading:defaultTop,error:defaultTop}"  ></div>
        <div class="show-name-date">
          <div class="show-name">{{item.nickName?item.nickName:item.ownerPhone}}</div>
          <div style="color:rgb(177, 173, 173)">{{item.evaluateDate}}</div>
        </div>
      </div>
      <van-row  class="showCarType">
        <van-col span="10">
          车型：{{item.pBrand+item.pType}}
        </van-col>
        <van-col span="14">
          花费：￥{{item.payMoney}}<span style="color:red;" >（省￥{{item.discountMoney}}）</span>
        </van-col>
      </van-row>
      <div class="show-cont" v-html="item.evaluateContent?item.evaluateContent:'这个人很懒，什么都没留下！'"><span style="color:#64739c">更多</span> </div>
      <div class="flexbox" v-show ="item.mgrBillEvaluatePicList.length" >
        <div class="flexTop1" v-for="(item1,index) in item.mgrBillEvaluatePicList" :key="index">
          <div class="flex-img" v-lazy:background-image="picIp+item1.path"></div>
        </div>
      </div>
      <div class="show-cont" style="color:#64739c" v-show ="!companyId">
        <van-icon name="shop" style="float:left;margin:5px 8px auto auto"/> {{item.companyName}}
      </div>
    </van-cell>
  </van-list>
</template>
<script>
import { Cell, List, Row, Col } from 'vant'
import { billList } from '@/api/user'
import loadMore from '@/mixins/load-more'
import defaultTop from '../../assets/img/avatar_default.png'
export default {
  mixins: [loadMore],
  name: 'comment',
  props: {
    checktype: 0 // 查询类型0 全部1好评2晒单3差评
  },
  data() {
    return {
      list: [], // 数据列表
      picIp: process.env.BASE_API,
      finished: false, // 是否没有数据
      loading: false,
      companyId: '',
      defaultTop: defaultTop
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.companyId = this.$route.query.id
    }
    this.resetInit()
  },
  watch: {
    checktype(newValue) {
      this.resetInit()
      this.list = []
    }
  },
  methods: {
    async initData() {
      const flagHot = this.companyId === '' ? 1 : 0
      const data = { pageNo: this.pages.currPage, pageSize: this.pages.perPage, companyId: this.companyId, flagHot: flagHot }
      if (this.checktype === 1) { // 好评
        data.isGreatEvaluate = 1
      } else if (this.checktype === 2) { // 晒单
        data.havePic = 1
      } else if (this.checktype === 3) { // 差评
        data.isGreatEvaluate = 0
      }
      const total = await billList(data, true).then((ret) => {
        if (ret.page.records) {
          this.list.push(...ret.page.records)
        }
        return ret.page.total
      })
      return total
    }
  },
  components: {
    [Cell.name]: Cell,
    [List.name]: List,
    [Row.name]: Row,
    [Col.name]: Col
  }
}
</script>
<style scoped>
.show-top{
   height: 3.5rem;
}
.show-user-photo{
  float:left;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-size: 100% 100%;
  margin-right: 1rem;
}
.show-name-date{
  float: left;
}
.show-name{
  font-size: 1.1rem;
  font-weight: 500;
}
.showCarType{
  clear:both;
  margin-top:0.8rem;
  color:rgb(177, 173, 173);
  font-size: 0.875rem;
}
.show-cont{
  margin-top: 0.8rem;
}
.flex-img{margin: 5px;padding: 0 10px; background: no-repeat center;height: 9rem; background-size: cover;}
</style>

