<template>
  <div>
    <van-nav-bar
        title="填写爱车信息"
        left-text=""
        right-text=""
        left-arrow
        :fixed="true"
        @click-left="onClickLeft"
    />
    <div class="mTop" style="margin-bottom:60px;">
      <div class="ucd-excess">请完善以下信息便于更精确的为您推荐保养套餐 </div>
      <van-cell-group>
        <van-cell title="城市" is-link value="请选择城市" v-model="currentCity.city" :to="{path:'/home/area'}"/>
        <van-field
          type="text"
          placeholder="请选择车辆"
          v-model="carTypeName"
          disabled
          label="车辆"
        />
        <van-cell title="购车时间" value="" v-model="buyDate"  @click="show = true"/>
        <van-popup v-model="show" position="bottom" :overlay="false">
          <van-datetime-picker
            v-model="datePicker"
            type="date"
            :max-date="maxDate"
            @confirm="sureTime()"
            @cancel="show = false"
          />
        </van-popup>
        <van-field
          type="number"
          placeholder="请输入公里数"
          v-model="carMile"
          label="行驶里程"
        >
          <van-button slot="button" size="small" type="default">公里</van-button>
        </van-field>
      </van-cell-group>
    </div>
    <div class="page-bottom">
      <van-button type="primary" bottom-action @click="addCar()">保存</van-button>
    </div>
  </div>
</template>
<script>
import { Field, Icon, Button, DatetimePicker, Popup } from 'vant'
import { localStorageTool, parseTime } from '@/utils'
import { carAdd } from '@/api/user'
export default {
  data() {
    return {
      user: {},
      maxDate: new Date(),
      carType: '', // 车型类
      carTypeName: '',
      buyDate: '',
      carMile: 0,
      currentCity: {},
      show: false,
      datePicker: ''
    }
  },
  mounted() {
    const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值
    if (userInfo) { // 获取用户信息、
      this.user = JSON.parse(userInfo)
    }
    this.currentCity = this.$store.getters.currentCity // 获取当前城市
    if (this.$route.params.cartype) {
      this.carType = this.$route.params.cartype
      this.carTypeName = this.carType.pbrand + ' ' + this.carType.ptype + ' ' + this.carType.pcaryear + '款 ' + this.carType.psalename
    }
    // if (this.$route.query.plevelID) {
    //   this.plevelID = this.$route.query.plevelID
    // }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    urlArea() {
      this.$router.push({ path: '/home/area' })
    },
    sureTime() {
      this.show = false
      if (this.datePicker) {
        this.buyDate = parseTime(this.datePicker, '{y}-{m}-{d}')
      } else {
        this.buyDate = ''
      }
    },
    addCar() {
      carAdd({ ownerId: this.user.id, carType: this.carTypeName, buyDate: this.buyDate, carMile: this.carMile, city: this.currentCity.city, pLevelId: this.carType.plevelID, pBrand: this.carType.pbrand, pType: this.carType.ptype, pVolume: this.carType.pvolume, pCarYear: this.carType.pcaryear }).then((data) => {
        this.$toast('新增成功！')
        this.$store.dispatch('getDefaultCar')
        this.$router.go(-1)
      })
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        setTimeout(done, 1000)
      } else {
        done()
      }
    }
  },
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup
  }
}
</script>
<style scoped>
  .form-label{
    font-size: 1.1rem;
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
    left: 6rem;
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

