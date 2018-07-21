<template>
  <div id="app">
    <!-- <transition :name="transitionName"  >
      <router-view  class="view-router" ></router-view>
    </transition> -->
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="view-router"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive" class="view-router"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-right' // 默认动态路由变化为slide-right
    }
  },
  watch: {
    '$route'(to, from) {
      const toLength = to.fullPath.split('/').length// 路由层级高向层级低动画返回，低到高前进
      const fromlength = from.fullPath.split('/').length
      if (from.meta.keepAlive) { // 有缓存界面添加滚动距离参数
        from.meta.scrollTop = document.getElementsByClassName('view-router')[0].scrollTop
      }
      if (toLength < fromlength) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" src="@/assets/css/global.scss" />
<style>

</style>
