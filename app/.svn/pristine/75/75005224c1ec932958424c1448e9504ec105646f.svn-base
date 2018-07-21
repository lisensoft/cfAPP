<template>
  <div>
     <van-nav-bar
      title="选品牌"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
      :z-index="100"
    />
    <div class="areaTop mTop">
      <index-list  :data="data" title="" @select="clickBrand" ></index-list>
    </div>
    <van-popup v-model="showPopup" position="right" style="height:100%;width:60%;overflow:auto;"  id="Model"  >
      <div v-for="(model,index) in ModelByB" :key="index" >
        <div style="padding-left:15px;height:30px;line-height:30px;" class="backColor"  >{{model.vender}}</div>
        <van-cell-group >
          <van-cell  v-for="type in model.carTypeList" :key="type" :title="type"  @click="clickCarType(model.vender,type)"  />
        </van-cell-group>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Popup } from 'vant'
import { getCarTypeBrand, getCarTypes } from '@/api/carType'
import IndexList from '@/components/index-list/index-list.vue'
export default {
  data() {
    return {
      picIp: process.env.BASE_API,
      BrandMark: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      assessList: [],
      ModelByB: [], // 选择省查找的数据
      selectBrand: '', // 选择的品牌
      showPopup: false // 是否显示右侧层
    }
  },
  created() {
    getCarTypeBrand({}).then((data) => {
      this.assessList = data.newList// 赋值
    })
  },
  computed: {
    data() {
      const ret = []
      this.BrandMark.forEach((Group) => {
        const group = {}
        group.name = Group
        group.items = []
        this.assessList.forEach((itemD) => {
          if (itemD.pCarBrandMark === Group) {
            const item = {}
            item.name = itemD.pbrandname
            item.value = itemD.pbrandname
            item.img = this.bindUrl(itemD.carLogo)
            group.items.push(item)
          }
        })
        if (group.items.length > 0) {
          ret.push(group)
        }
      })
      return ret
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    bindUrl(url) {
      if (url) {
        return this.picIp + url.substring(1)
      }
      return this.picIp + url
    },
    bandBrand(mark) {
      const pData = this.assessList.filter((item) => {
        return item.pCarBrandMark === mark
      })
      return pData
    },
    clickBrand(brand) {
      if (brand.name !== this.selectBrand) {
        this.selectBrand = brand.name
        getCarTypes({ carBrand: brand.name }).then((data) => {
          this.ModelByB = data.newList// 赋值
          this.showPopup = true
        })
      } else {
        this.showPopup = true
      }
    },
    clickCarType(vender, type) {
      this.$router.replace({
        name: '选年款',
        params:
        {
          'brand': this.selectBrand,
          'vender': vender,
          'cartype': type
        }
      })
    }
  },
  components: {
    [Popup.name]: Popup,
    IndexList
  }
}
</script>
<style scoped>
.areaTop{
  height: calc(100% - 46px);
  /* height:calc(100%-46px);
  position:fixed;
  top:46px;
  width: 100%; */
}
.flexbox {
  padding:0px 15px;
  display:-webkit-box;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
}
.flexTop1{
  /*-webkit-box-flex: 1;
  -webkit-flex:1;
  flex:1;*/
  flex: 0 0 25%;
}
.flex-city{
  height: 2.5rem;
  line-height:2.5rem;
  text-align: center;
  margin: 0 0.4rem;
  background-color: #fff;
  border-radius: 0.6rem;
  border: solid 1px #dedbdb;
}
</style>

