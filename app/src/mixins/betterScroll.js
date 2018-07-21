export default {
  data() {
    return {
      pages: {
        perPage: 10, // 每页设置的条数
        currPage: 1, // 当前页
        pageCount: 1 // 总页数
      },
      noMore: false,
      isEmpty: false
    }
  },
  methods: {
    resetInit() {
      this.pages = {
        perPage: 10,
        currPage: 1,
        pageCount: 1
      }
      this.noMore = false
      this.isEmpty = false
      this.loadMore()
      this.$refs.scroll.forceUpdate()
    },
    loadMore() {
      var vm = this
      if (vm.pages.pageCount < vm.pages.currPage) {
        this.noMore = true
        this.$refs.scroll.forceUpdate()
      } else {
        vm.initData().then((count) => {
          this.$nextTick(() => {
            this.setPages(count)
          })
        })
      }
    },
    onPullingDown() {
      this.resetInit()
    },
    onPullingUp() {
      // 更新数据
      this.loadMore()
    },
    setPages(totalCount = 0) {
      this.isEmpty = (totalCount === 0)
      this.pages.currPage = this.pages.currPage + 1
      this.pages.pageCount = Math.ceil(totalCount / this.pages.perPage)
    }
  }
}
