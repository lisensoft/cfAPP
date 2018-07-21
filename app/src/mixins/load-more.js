export default {
  data() {
    return {
      pages: {
        perPage: 10, // 每页设置的条数
        currPage: 1, // 当前页
        pageCount: 1 // 总页数
      },
      loading: false,
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
    },
    loadMore() {
      var vm = this
      if (vm.pages.pageCount < vm.pages.currPage) {
        vm.isNoMore()
      } else {
        vm.initData().then((count) => {
          this.$nextTick(() => {
            this.setPages(count)
          })
        })
      }
    },
    isNoMore() {
      this.noMore = true
      this.loading = false
    },
    nextPage(pageCount = 1) {
      this.pages.currPage += 1
      this.pages.pageCount = pageCount
    },
    setPages(totalCount = 0) {
      this.isEmpty = (totalCount === 0)
      this.loading = false
      if (totalCount <= this.pages.perPage) {
        this.noMore = true// 没有更多
      } else {
        // 下一页
        this.nextPage(Math.ceil(totalCount / this.pages.perPage))
      }
    }
  }
}
