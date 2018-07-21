<template>
  <div>
    <van-nav-bar
      title="保养"
      left-text=""
      right-text=""
      :left-arrow="true"
      :fixed="true"
      @click-left="onClickLeft"
      style="z-index:10;"
    />
    <div class="page-top">
      <div class="car-wrap">
            <div class="car-item">
              <div class="car-info">
                <img src="../../assets/logo.png"/>
              </div>
              <div class="car-text">
                <p class="car-name">保时捷 Carrera GTS 2017款 3.0T 双离合</p>
                <p class="car-num">行驶里程 5000 km </p>
              </div>
              <div class="car-select">
                 <van-icon name="arrow"/>
              </div>
            </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { shopList } from '@/api/shop'
import { List } from 'vant'
export default {
  data() {
    return {
      list: [],
      kindList: [],
      picIp: process.env.BASE_API
    }
  },
  mounted() {
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  },
  components: {
    [List.name]: List
  }
}
</script>
<style scoped>
.page-top{
  background: #fff;
  top: 50px;
  left: 0;
  width: 100%;
  position: relative;
  border-bottom: 1px solid #d7d7dc;
}
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
  .car-select{
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    right: 0;
  }
</style>
