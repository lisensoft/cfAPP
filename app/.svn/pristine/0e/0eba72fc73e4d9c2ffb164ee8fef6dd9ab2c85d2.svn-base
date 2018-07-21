<template>
  <div class="is_empty" v-show="value" >
    <div>
      <img src="@/assets/img/is_empty.png" alt="无数据" width="20%">
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'is-empty',
  props: { value: Boolean }
}
</script>
<style lang="scss"  scoped >
  .is_empty{
    text-align: center;
    color: #999;
    padding-top:50%;
    >div{
      margin-bottom: 20px;
    }
  }
</style>
