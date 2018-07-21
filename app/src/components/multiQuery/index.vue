<template>
  <div class="multiQuery" >
    <div class="page-top">
      <div class="flex-wrap">
        <div class="flex top-item"   @click="showType=!showType;sortType=false"  :class="{active:showType}"  >
          {{selectItem.label}} <arrow :isActive="showType" ></arrow>
        </div>
        <div class="vertical-line"></div>
        <div class="flex top-item"  @click="sortType=!sortType;showType=false"  :class="{active:sortType}" >
          综合排序<arrow :isActive="sortType" ></arrow>
        </div>
      </div>
    </div>
    <van-popup v-model="showType"  position="top" :overlay="true" class="popupShow" transition="popup-fade" >
      <van-cell-group>
        <van-cell v-for="(item, index) in Typelist" :key="index" :title="item.label" icon="home"  @click="selectI(item)"  >
           <van-icon slot="right-icon" name="success"  style="color:red;"  v-if="selectItem.value==item.value"  />
        </van-cell>
      </van-cell-group>
    </van-popup>
    <van-popup v-model="sortType"  position="top" :overlay="true" class="popupShow" transition="popup-fade" >
      <van-cell-group>
        <van-cell title="综合排序"  />
        <van-cell title="距离最近"  />
      </van-cell-group>
    </van-popup>
  </div>
</template>
<script>
import { Popup } from 'vant'
import { getTypeList } from '@/api/common'
import arrow from './arrow'
export default {
  name: 'multiQuery',
  data() {
    return {
      Typelist: [
        {
          label: '全部类型',
          value: ''
        }
      ],
      showType: false,
      sortType: false,
      selectItem: {
        label: '全部类型',
        value: ''
      }
    }
  },
  mounted() {
    getTypeList({ type: 'itemType' }).then((data) => { // 获取门店类别
      this.Typelist.push(...data.newList)
    })
  },
  methods: {
    selectI(item) {
      this.selectItem = item
      this.showType = false
      this.$emit('change', item)
    }
  },
  components: {
    [Popup.name]: Popup,
    arrow
  }
}
</script>
<style   lang='scss' >
.multiQuery{
  .popupShow{
    top:86px;max-height:60%;overflow-y:auto
  }
  .active{
    color: red;
  }
  .van-modal{
    top:88px;
  }
  .page-top{
   position: fixed;
   top: 46px;
   left: 0;
   z-index: 1;
   width: 100%;
  }
  .flex-wrap{
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #ededee;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .flex{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .vertical-line{
    position: relative;
  }
  .vertical-line::after{
    top: 5px;
    bottom: 5px;
    background: #ccc;
    content: '';
    width: 1px;
    position: absolute;
    -webkit-transform: scale(0.5,1);
    transform: scale(0.5,1)
  }
}
</style>
