<template>
  <div style="display: inline-block;" >
    <svg t="1528441729013" class="arrow"  :class="{'is-active':isActive}" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2100" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32">
    <path d="M927.804 352.193l-415.804 415.632-415.803-415.632 63.616-63.445 352.209 352.017 352.102-352.017z" p-id="2101" ></path></svg>
  </div>
</template>

<script>
export default {
  name: 'arrow',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.arrow {
  display: inline-block;
  cursor: pointer;
  width: 10px;
  height: 10px;
  transform: rotate(0deg);
  transition: .38s;
  transform-origin: 50% 50%;
  fill: #999999;
}
.arrow.is-active {
  transform: rotate(180deg);
  fill: red;
}
</style>
