<template>
  <div>
    <van-nav-bar
        title="我的车"
        left-text=""
        right-text=""
        left-arrow
        :fixed="true"
        @click-left="onClickLeft"
    />
    <div class="mTop" style="margin-bottom:60px">
      <van-cell-group  class="backColor">
        <van-cell v-for="(item,index) in myCarList" :key="index"  style="margin-bottom:0.7rem;">
          <div class="car-wrap">
            <div class="car-item">
              <div class="car-info">
                <img src="../../assets/logo.png"/>
              </div>
              <div class="car-text">
                <p class="car-name">{{item.carType}}</p>
                <p class="car-num">{{item.carCode}}</p>
                <p class="car-num">行驶里程 {{item.carMile}} km </p>
              </div>
            </div>
            <div class="car-operate">
              <div class="car-right">
                <router-link tag='span' :to="{name:'编辑我的车', params: { item: item }}">
                  <van-icon name="records" />
                  编辑
                </router-link>
                <span @click="deleteCar(item.id)" style="margin-left:10px;">
                  <van-icon name="delete" />
                  删除
                </span>
              </div>
              <!--<div class="car-left">
                <label for="defaultCar" v-if="item.defaultCar" style="color:#fa5a4b"  @click="setDefault(item.id)"><input type="radio" name="defaultCar" :value="item.id" :checked="item.defaultCar" />默认车辆</label>
                <label for="defaultCar"  @click="setDefault(item.id)" v-else><input type="radio" name="defaultCar" :value="item.id"  :checked="item.defaultCar" />设为默认车辆</label>
              </div>-->
              <div class="car-left">
                <label for="defaultCar" v-if="item.defaultCar" style="color:#06bf04"  @click="setDefault(item.id)">
                  <span class="van-radio__input">
                    <input class="van-radio__control" type="radio" name="defaultCar" :value="item.id" :checked="item.defaultCar">
                    <i class="van-icon van-icon-checked" style="font:normal normal normal 16px/1.2 vant-icon"></i>
                  </span>
                  默认车辆
                </label>
                <label for="defaultCar"  @click="setDefault(item.id)" v-else>
                  <span class="van-radio__input">
                    <input class="van-radio__control" type="radio" name="defaultCar" :value="item.id" :checked="item.defaultCar">
                    <i class="van-icon van-icon-check" style="font:normal normal normal 16px/1.2 vant-icon"></i>
                  </span>
                  设为默认车辆
                </label>
              </div>
              <div style="clear:both"></div>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <router-link tag='div' class="page-bottom" :to="{path:'/user/myCar/selectBrand'}">
      <van-button type="primary" bottom-action>添加爱车</van-button>
    </router-link>
  </div>
</template>
<script>
import { CellGroup, Cell, RadioGroup, Radio, Button } from 'vant'
import { localStorageTool } from '@/utils'
import { carList, carDefault, carDelete } from '@/api/user'
export default {
  data() {
    return {
      user: {},
      myCarList: []
    }
  },
  mounted() {
    const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值
    if (userInfo) { // 获取用户信息、
      this.user = JSON.parse(userInfo)
    }
  },
  created() {
  //  carList({ pageNo: 1, pageSize: 9999, ownerId: this.user.id }).then((data) => {
  //    this.myCarList = data.page.records// 赋值数据
  //  })
    this.carsList()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    setDefault(carId) {
      carDefault({ id: carId }).then((data) => {
        this.$toast('设置成功！')
        this.$store.dispatch('getDefaultCar')
        for (const item of this.myCarList) {
          item.defaultCar = 0
          if (item.id === carId) {
            item.defaultCar = 1
          }
        }
      })
    },
    deleteCar(carId) {
      carDelete({ id: carId }).then((data) => {
        this.$toast('删除成功！')
        this.carsList()
      })
    },
    carsList() {
      carList({ pageNo: 1, pageSize: 9999, ownerId: this.user.id }).then((data) => {
        this.myCarList = data.page.records// 赋值数据
      })
    }
  },
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Button.name]: Button
  }
}
</script>
<style scoped>
/*.car-wrap{
   margin-bottom: 0.8rem;
}*/
.car-item{
  background: #fff;
  position: relative;
  padding: 0rem 0rem 0rem 5rem;
  box-shadow: 0 1px 0 rgba(0,0,0,0.04);
}
.car-info{
  width: 4rem;
  line-height: 1;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.car-info img{
  width: 100%;
  height: 100%;
  border: 0;
}
.car-text{
  color:#999;
}
.car-text p{
  margin: 0.5rem 0
}
.car-name{
  /* font-size: 1.18rem; */
  color: #333;
}
.car-num{
  color: #333;
  font-size: 1rem;
}
.car-operate{
  /* padding: 1rem; */
  background: #fff;
  box-shadow: 0 1px 0 rgba(0,0,0,0.04);
  color: #999;
  font-size: 1rem;
}
.car-right{
  float: right;
}
.car-left{
  float: left;
  line-height: 1.2;
}
.car-left label{
  line-height: 1.5;
  vertical-align: top;
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
  /* .page-bottom button{background: #fa5a4b} */
</style>

