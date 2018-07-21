<template>
  <div>
    <van-cell-group  class="backColor" style="margin-bottom:60px">
        <van-cell v-for="(item,index) in myCarList" :key="index" @click="setDefault(item.id)">
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
              <div class="car-select" v-show ="item.defaultCar">
                 <van-icon name="success" style="color:red"/>
              </div>
            </div>
          </div>
        </van-cell>
    </van-cell-group>
    <router-link tag='div' class="page-bottom" :to="{path:'/user/myCar/selectBrand'}">
      <van-button type="primary" bottom-action>添加爱车</van-button>
    </router-link>
  </div>
</template>
<script>
import { CellGroup, Cell, Button, Icon } from 'vant'
import { localStorageTool } from '@/utils'
import { carList, carDefault } from '@/api/user'
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
    this.carsList()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    setDefault(carId) {
      carDefault({ id: carId }).then((data) => {
        this.$store.dispatch('getDefaultCar')
        this.$router.go(-1)
        // for (const item of this.myCarList) {
        //   item.defaultCar = 0
        //   if (item.id === carId) {
        //     item.defaultCar = 1
        //   }
        // }
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
    [Button.name]: Button,
    [Icon.name]: Icon
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
  .car-select{
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    right: 0;
  }
</style>

