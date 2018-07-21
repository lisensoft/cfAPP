<template>
  <div>
    <van-nav-bar
        title="编辑我的车"
        left-text=""
        right-text=""
        left-arrow
        :fixed="true"
        @click-left="onClickLeft"
    />
    <div class="mTop" style="margin-bottom:60px;">
      <div class="car-wrap">
        <div class="car-logo">
          <img src="../../assets/logo.png"/>
        </div>
        <span>{{myCar.carType}}</span>
      </div>
      <van-cell-group>
        <van-cell title="购车时间" value="" v-model="myCar.buyDate"  @click="show = true"/>
        <van-popup v-model="show" position="bottom" :overlay="false">
          <van-datetime-picker
            v-model="datePicker"
            type="date"
            :max-date="maxDate"
            @confirm="sureTime()"
            @cancel="show = false"
          />
        </van-popup>
        <!--<div class="ucd-excess">购车时间</div>
        <van-datetime-picker
            v-model="myCar.buyDate"
            type="date"
            :max-date="maxDate"
        />-->
        <van-field
            center
            type="number"
            placeholder="请输入公里数"
            v-model="myCar.carMile"
            label="行驶里程"
        >
          <van-button slot="button" size="small" type="default">公里</van-button>
        </van-field>
      </van-cell-group>
      <div class="ucd-excess">填写完整可用于查违章</div>
      <van-cell-group>
        <van-field
          type="text"
          placeholder="请输入车牌号"
          v-model="myCar.carCode"
          label="车牌号码"
        />
        <van-field
          type="text"
          placeholder="请输入车架号后四位"
          v-model="myCar.vin"
          label="车架号"
        />
      </van-cell-group>
      <div class="ucd-list" v-show="!myCar.defaultCar">
        <div class="form-item">
          <div class="form-label">设为默认车</div>
          <van-switch v-model="checked" class="switch-btn"/>
        </div>
      </div>
    </div>
    <div class="page-bottom">
      <van-button type="primary" bottom-action @click="updateCar()">保存</van-button>
    </div>
  </div>
</template>
<script>
import { Field, Icon, Switch, Button, DatetimePicker, Popup } from 'vant'
import { localStorageTool, parseTime } from '@/utils'
import { carUpdate } from '@/api/user'
export default {
  data() {
    return {
      user: {},
      checked: false,
      myCar: this.$route.params.item,
      maxDate: new Date(),
      show: false,
      datePicker: ''
    }
  },
  mounted() {
    const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值
    if (userInfo) { // 获取用户信息、
      this.user = JSON.parse(userInfo)
    }
  },
  created() {
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    sureTime() {
      this.show = false
      if (this.datePicker) {
        this.myCar.buyDate = parseTime(this.datePicker, '{y}-{m}-{d}')
      } else {
        this.myCar.buyDate = ''
      }
    },
    updateCar(carId) {
      if (this.checked) {
        this.myCar.defaultCar = 1
      } else {
        // this.myCar.defaultCar = 0
      }
      //  carUpdate({ id: this.myCar.id, carCode: this.myCar.carCode, buyDate: this.myCar.buyDate, carMile: this.myCar.carMile, vin: this.myCar.vin, defaultCar: this.checked }).then((data) => {
      // if (this.myCar.buyDate) {
      //   this.myCar.buyDate = parseTime(this.myCar.buyDate, '{y}-{m}-{d}')
      // }
      carUpdate(this.myCar).then((data) => {
        this.$toast('编辑成功！')
        if (this.myCar.defaultCar === 1) {
          this.$store.dispatch('getDefaultCar')
        }
        this.$router.go(-1)
      })
    }
  },
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Switch.name]: Switch,
    [Button.name]: Button,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup
  }
}
</script>
<style scoped>
  .car-wrap{
    height: 6rem;
    line-height: 6rem;
    padding: 0 2.25rem 0 5.5rem;
    background: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-shadow: 0 1px 0 rgba(0,0,0,0.04);
    position: relative;
    font-size: 1.18rem;
    position: relative;
  }
  .car-logo{
    position: absolute;
    top:50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 3.5rem;
    height: 3.5rem;
    left: 1.18rem;
  }
  .car-logo img{
    width: 100%;
    height: 100%;
  }
  .ucd-list{
    margin: 0.8rem 0 0;
    box-shadow: 0 1px 0 rgba(0,0,0,0.04);
    background: #fff;
    position: relative;
  }
  .form-item{
    box-shadow: 1.18rem 1px 0 rgba(0,0,0,0.04);
    padding: 1.18rem;
    position: relative;
    font-size: 1.18rem;
  }
  .form-date{
    color: #666;
    left: 11rem;
    top: 50%;
    bottom:0;
    width: 50%;
    position: absolute;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 1rem;
  }
  .form-item1::after{
    content: "";
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    border-top: 1px solid #c3c3c3;
    border-right: 1px solid #c3c3c3;
    right: 1.6rem;
    top: 50%;
    -webkit-transform: rotate(45deg) translateY(-70%);
    transform: rotate(45deg) translateY(-70%);
  }
  .form-input{
    position: absolute;
    width: 28%;
    bottom: 0;
    padding-right: 0;
    left: 11rem;
    color: #666;
    font-size: 1rem;
  }
  input{
    background: transparent;
    border: 0;
    box-shadow: none;
    color: #666
  }
  .mileage{
    color: #666;
    position: absolute;
    top: 50%;
    right:1rem;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 1rem;
  }
  .ucd-excess{
    height: 2rem;
    line-height: 2rem;
    color: #999;
    margin-left: 1.18rem;
  }
  .ucd-form-right4{
    position: absolute;
    color: #666;
    left: 11rem;
    top: 0;
    bottom: 0;
    width: 50%;
    padding: 1.18rem 0 0;
    font-size: 1rem;
  }
  .ucd-form-right4 span::after{
    content: "";
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    border-bottom: 1px solid #c3c3c3;
    border-right: 1px solid #c3c3c3;
    left: 1.5rem;
    top: 45%;
    -webkit-transform: rotate(45deg) translateY(-70%);
    transform: rotate(45deg) translateY(-70%);
  }
  .ucd-car-num{
    width: 12rem;
    position: absolute;
    bottom: 0;
    /*left: 3.55rem;*/
    left: 0;
    color:#666;
    font-size: 1rem;
    padding-right: 1.1rem
  }
  .ucd-form-right2{
    color: #666;
    position: absolute;
    left: 11rem;
    top: 0;
    bottom: 0;
    width: 50%;
  }
  .ucd-car-chejia{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 80%;
    color:#666;
    font-size: 1.1rem;
    padding-right: 1.1rem
  }
  .switch-btn{
    position: absolute;
    right: 1em;
    bottom:0;
    top: 20%;
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
</style>

