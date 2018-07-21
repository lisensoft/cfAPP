<template>
  <div class="handbook" >
    <van-nav-bar title="保养手册" left-text="" right-text="" :left-arrow="true"  @click-left="onClickLeft" :fixed="true" style="z-index:10;"/>
    <van-cell-group class="mTop">
      <van-cell :title="car.carType" style="line-height:40px;overflow:hidden" >
        <img  v-lazy="car.img"  width="40" height="40" slot="icon" />
      </van-cell>
    </van-cell-group>
    <div  class="handbookShow" >
      <div class="handbookLeft">
        <div class="bookLeftRow" >保养项目</div>
        <div class="bookLeftRow"  v-for="item in itemNameList"  :key="item" >{{item}}</div>
      </div>
      <div class="handbookRight">
        <div class="bookRightCell"  v-for="(item, index) in mainPlanOneList" :key="index" >
          <div class="bookRightRow" style="line-height:15px;" >{{item.mileage}}<br/>KM</div>
          <div class="bookRightRow" v-for="(plan, pindex) in item.plan21" :key="pindex" >
            <div class="cmm-replace"  :class="{'OkBao':plan.itemadvice!='不建议保养','NOBao':plan.itemadvice=='不建议保养'}" >
              {{plan.itemadvice=='不建议保养'?'优':'建' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMaintainPlan } from '@/api/maintain'
export default {
  data() {
    return {
      picUrl: process.env.BASE_API,
      car: [], // 车辆
      mainPlanOneList: [],
      itemNameList: []
    }
  },
  mounted() {
    if (this.$store.getters.myDefaultCar.carType !== undefined && this.$store.getters.myDefaultCar.carType !== '') {
      this.car = this.$store.getters.myDefaultCar
    }
    getMaintainPlan({ code: this.car.pLevelId }).then((data) => {
      if (data.newList.length > 0) {
        this.mainPlanOneList = data.newList[0].mainPlanOneList
        if (this.mainPlanOneList.length > 0) {
          this.itemNameList = this.mainPlanOneList[0].plan21.map((item) => {
            return item.itemnameabbreve
          })
        }
      }
    })
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  },
  components: {
  }
}
</script>
<style  lang="scss" scoped>
.handbook{
  .cmm-replace{
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    border-radius:50%;
    margin:0 auto;
  }
  .OkBao{
    background-color:#f00;
    color: #fff;
  }
  .NOBao{
    border:1px solid #96d20a;
    color: #96d20a;
  }
  color: #666;
  .handbookShow{
    clear:both;margin-top:0.7rem;background-color:#fff;
  }
  .handbookLeft{
    float: left;
    background-color: #f4f4f8;//fcfcfc
    width:110px;
    margin-bottom:0.7rem;
  }
  .handbookRight{
    float: left;
    width: calc(100% - 110px);
    background-color: #fff;//fcfcfc
    overflow-x:auto;
    overflow-y: hidden;
    white-space:nowrap;
  }
  .bookLeftRow{
    height: 3rem;
    line-height: 3rem;
    overflow: hidden;
    padding-left: 15px;
    border-bottom:#e5e5e5 solid 1px;
    border-right:#e5e5e5 solid 1px;
    // border-bottom: 1px solid #f4f4f8;
  }
  .bookRightRow{
    // display: inline-block;
    height: 2rem;
    line-height: 2rem;
    border-bottom:#e5e5e5 solid 1px;
    text-align:center;
    padding:0.5rem 5px;
  }
  .bookRightCell{
    width: 4.5rem;
    display:inline-block;
  }
}
</style>

