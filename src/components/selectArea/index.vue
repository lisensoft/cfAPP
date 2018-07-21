<template>
  <div>
     <van-nav-bar
      :title="currentCity"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
    <van-cell-group class="mTop">
      <van-cell  title="石家庄" value="当前定位城市" icon="location" />
    </van-cell-group>
    <index-list  :data="data" title="" @select="clickProvince" class="listHeight" ></index-list>
    <van-popup v-model="showPopup" position="right" style="height:100%;width:60%;"   >
      <div style="padding-left:15px;height:50px;line-height:50px;"  class="backColor" >{{cityP}}</div>
      <van-cell-group>
        <van-cell  v-for="(city,ci) in cityByP"  :key="ci"  :title="city.city"  @click="selectCity(city)"  />
      </van-cell-group>
    </van-popup>
  </div>
</template>
<script>
import { Popup } from 'vant'
import { areaList } from '@/api/area'
import { localStorageTool } from '@/utils'
import IndexList from '@/components/index-list/index-list.vue'
export default {
  name: 'selectArea',
  data() {
    return {
      currentCity: '当前城市-石家庄',
      cityMark: ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      assessList: [],
      cityByP: [], // 选择省查找的数据
      cityP: '',
      // hotCity: [], // 热门城市
      showPopup: false // 是否显示右侧层
    }
  },
  created() {
    areaList({ pageNo: 0, pageSize: 1000, isShow: 1 }).then((data) => {
      this.assessList = data.page.records// 赋值地区数据
    })
  },
  computed: {
    data() {
      const ret = []
      this.cityMark.forEach((Group) => {
        const group = {}
        group.name = Group
        group.items = []
        this.assessList.forEach((itemD) => {
          if ((Group === '热门' && itemD.isHot === 1) || itemD.mark === Group) {
            const item = {}
            item.name = Group === '热门' ? itemD.city : itemD.province
            item.value = itemD.province
            item.group = Group
            if (group.items.filter((a) => { return a.name === item.name }).length <= 0) {
              group.items.push(item)
            }
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
    clickProvince(p) { // 点击省操作
      if (p.group === '热门') {
        this.cityByP = this.assessList.filter((item) => {
          return item.city === p.name
        })
        this.selectCity(this.cityByP[0])
      } else {
        this.cityByP = this.assessList.filter((item) => {
          return item.province === p.name
        })
        if (p.name.indexOf('北京') >= 0 || p.name.indexOf('天津') >= 0 || p.name.indexOf('上海') >= 0 || p.name.indexOf('重庆') >= 0) { // 直辖市直接保存
          this.selectCity(this.cityByP[0])
        } else {
          this.showPopup = true
          this.cityP = p.name
        }
      }
    },
    selectCity(city) { // 选择市地区
      localStorageTool.setLocalStorage({
        'currentCity': JSON.stringify(city)
      })
      this.$store.commit('SET_CURRENTCITY', city)
      this.$router.go(-1)
    }
  },
  components: {
    [Popup.name]: Popup,
    IndexList
  }
}
</script>
<style scoped>
.listHeight{
  height: calc(100% - 90px);
}
.areaTop{
  padding:10px 15px;
}
.flexbox {
  display:-webkit-box;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
}
.flexTop1{
  /*-webkit-box-flex: 1;
  -webkit-flex:1;
  flex:1;*/
  width:25%
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

