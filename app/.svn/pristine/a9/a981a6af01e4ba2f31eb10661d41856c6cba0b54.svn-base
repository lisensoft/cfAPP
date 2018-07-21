<template>
  <div>
     <van-nav-bar
      title="选择年款配置"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
      :z-index="100"
    />
    <div class="mTop">
      <div v-for="(item,index) in assessList" :key="index"  >
        <div style="margin-left:15px;color:#999;height:30px;line-height:30px;" >{{item.year}}款</div>
        <van-cell-group>
          <van-cell  v-for="(listItem,li) in item.list"  :key="li"   :title="listItem.psalename"  @click="selectType(listItem)"  />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>
<script>
import { getCarTypeSaleName } from '@/api/carType'
export default {
  data() {
    return {
      assessList: []
    }
  },
  created() {
    if (this.$route.params.brand) {
      getCarTypeSaleName({ carBrand: this.$route.params.brand, pVender: this.$route.params.vender, pType: this.$route.params.cartype }).then((data) => {
        this.assessList = data.newList
      })
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    selectType(type) {
      // const cartype = type.pbrand + ' ' + type.ptype + ' ' + type.pcaryear + '款 ' + type.psalename
      this.$router.replace({ name: '填写爱车信息',
        params: {
          cartype: type
        }
      })
    }
  },
  components: {
  }
}
</script>
<style scoped>
</style>

