<template>
  <div>
    <van-nav-bar
      title="关于我们"
      left-text=""
      right-text=""
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
  </div>
</template>
<script>
import { Button, Field } from 'vant'
export default {
  data() {
    return {
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
    [Field.name]: Field,
    [Button.name]: Button
  }
}
</script>

