<template>
  <div class="index-list">
    <scroll
      ref="indexList"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      :data="data"
      :click="true"
      @scroll="scroll">
      <div class="index-list-content" ref="content">
        <div class="index-list-title" v-if="title" ref="title" @click="titleClick">
          {{title}}
        </div>
        <ul ref="groups">
          <li v-for="(group,index) in data" ref="listGroup" :key="index" >
            <div class="index-list-anchor">{{group.name}}</div>
            <ul>
              <li class="index-list-item border-bottom-1px"  v-for="(item,index) in group.items"   @touchstart="addActiveCls"  @touchend="removeActiveCls" @click="selectItem(item)" :key="index">
                <img  v-lazy="item.img"  width="40" height="40" v-if="item.img" />
                {{item.name}}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </scroll>
    <div class="index-list-nav" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" :data-index="index" :class="{active: currentIndex === index}" :key="index" >{{item}}</li>
      </ul>
    </div>
    <div class="index-list-fixed" ref="fixed" v-show="fixedTitle">
      {{fixedTitle}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  getData,
  addClass,
  removeClass
} from '../scroll/js/dom'

import Scroll from '../scroll/scroll.vue'

const COMPONENT_NAME = 'index-list'
const EVENT_SELECT = 'select'
const EVENT_TITLE_CLICK = 'title-click'
const ACTIVE_CLS = 'index-list-item_active'

const TITLE_HEIGHT = 0
const SUBTITLE_HEIGHT = 40
const ANCHOR_HEIGHT = window.innerHeight <= 480 ? 17 : 18

export default {
  name: COMPONENT_NAME,
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array
    }
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: -1
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.listHeight = []
    this.touch = {}
  },
  mounted() {
    setTimeout(() => {
      this._calculateHeight()
    }, 20)
  },
  computed: {
    fixedTitle() {
      if (this.scrollY > -TITLE_HEIGHT) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].name : ''
    },
    shortcutList() {
      return this.data.map((group) => {
        return group.name
      })
    }
  },
  methods: {
    refresh() {
      this.$refs.indexList.refresh()
    },
    selectItem(item) {
      this.$emit(EVENT_SELECT, item)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    titleClick() {
      this.$emit(EVENT_TITLE_CLICK, this.title)
    },
    onShortcutTouchStart(e) {
      const anchorIndex = getData(e.target, 'index')
      const firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex

      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      const firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      const delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      const anchorIndex = parseInt(this.touch.anchorIndex) + delta

      this._scrollTo(anchorIndex)
    },
    addActiveCls(e) {
      addClass(e.currentTarget, ACTIVE_CLS)
    },
    removeActiveCls(e) {
      removeClass(e.currentTarget, ACTIVE_CLS)
    },
    _calculateHeight() {
      const list = this.$refs.listGroup
      if (!list) {
        return
      }
      this.listHeight = []
      let height = TITLE_HEIGHT
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.$refs.indexList.scrollToElement(this.$refs.listGroup[index], 100)
      this.scrollY = this.$refs.indexList.scroll.y
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    diff(newVal) {
      const fixedTop = (newVal > 0 && newVal < SUBTITLE_HEIGHT) ? newVal - SUBTITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部，newY>0
      if (newY > -TITLE_HEIGHT) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        const height1 = listHeight[i]
        const height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    }
  },
  components: {
    Scroll
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" >
$color-title-background:#f7f7f7;
$color-dark-grey:#333;
$color-grey: #666;
$color-light-grey: #999;
$color-white: #fff;
$color-active-light-gray: rgba(0, 0, 0, .04);
$fontsize-medium: 14px;
$fontsize-small: 12px;

  .index-list{
    position: relative;
    width: 100%;
    height: 100%;
    .list-wrapper{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      background: #f7f7f7;
      .index-list-content{
        background: $color-white;
        border-radius: 2px;
        .index-list-title{
          padding: 14px 16px;
          font-size: $fontsize-medium;
          line-height: 1.6;
          color: $color-dark-grey;
        }
        .index-list-anchor{
          padding: 16px 16px 10px 16px;
          line-height:1;
          font-size: $fontsize-medium;
          color: $color-light-grey;
          background: $color-title-background;
        }
        .index-list-item{
          position: relative;
          height: 46px;
          line-height: 46px;
          padding: 0 15px;
          font-size: $fontsize-medium;
          color: $color-dark-grey;
          img{
            vertical-align: middle;
          }
        }
        .border-bottom-1px:after{
          content:"";
          display:block;
          position:absolute;
          transform-origin:0 0;
          box-sizing:border-box;
          border:0 solid #e5e5e5;
        }
        .index-list-item:not(:last-child)::after{
          border-bottom-width: 1px;
          left: 15px;
          right: 0;
          transform:scale(1,.5);
          width:auto;
        }
        .index-list-item_active{
          background: $color-active-light-gray;
        }
      }
    }
    .index-list-fixed{
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      padding: 16px 16px 10px 16px;
      box-sizing: border-box;
      font-size: $fontsize-medium;
      line-height: 1;
      color: $color-light-grey;
      background: $color-title-background;
    }
    .index-list-nav{
      position: absolute;
      z-index: 30;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-family: Helvetica;
       > ul{
          padding: 0;
          margin: 0;
       }
       li {
          padding: 6px 16px 0 16px;
          line-height: 1;
          text-align: center;
          box-sizing:border-box;
          font-size: $fontsize-small;
          color: $color-grey;
       }
      li:active {
            color: red;
      }
      li.active {
        color: red;
      }
    }
  }

</style>
