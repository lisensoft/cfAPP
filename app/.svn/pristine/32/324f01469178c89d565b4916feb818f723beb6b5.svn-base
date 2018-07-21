<template class="main">
  <div>
    <van-nav-bar
      title="新闻详情"
      left-text=""
      right-text=""
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
    <div class="news-detail mTop">
      <div class="news-title"> {{newsOne.title}} </div>
      <div class="news-bottom">
        <span class="news-author">{{newsOne.author}}</span>
        <span class="news-time">{{newsOne.createDate}}</span>
        <div class="news-visited">
            <van-icon name="password-view"/>
            <span>{{newsOne.hits}}</span>
        </div>
      </div>
      <div style="margin-bottom:60px">
        <div>
          <div v-html="newsOne.detail" class="new-div"></div>
          <p class="source">本文来源于{{newsOne.source}}</p>
          <button class="like" @click="addNewLike">
            <svg-icon :icon-class="'like'"></svg-icon>
            {{newsOne.like}}
            <span v-if=!newsOne.like>0</span>
          </button>
        </div>
        <van-cell-group class="topGroup" v-if="commentList.length>0">
          <van-cell title="全部评论"  icon="wap-nav" />
          <van-cell v-for="(item,index) in commentList" :key="index">
              <div class="content">
                <div class="bg-cut">
                  <img v-lazy="{ src:picUrl+item.headImage,loading:defaultTop,error:defaultTop}"  />
                </div>
                <!-- <div class="comment-views">
                  <svg-icon :icon-class="'like'" @click="addComentLike(item.id)" style="width:1.25rem;height:1.25rem"></svg-icon>
                  <span>{{item.like}}</span>
                  <span v-if=!item.like>0</span>
                </div> -->
                <div class="content-name">{{item.userName}}</div>
                <div class="content-time">{{item.createDate}}</div>
                <div class="content-content">{{item.comment}}</div>
              </div>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="footer">
        <van-icon name="chat" class="footer-icon" @click="sendComment"/>
        <div class="footer-div">
          <input type="text" v-model="comment" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { newsOne, newsCommentList, newsComment, newLike, newsCommentLike } from '@/api/news'
import { localStorageTool } from '@/utils'
import { List } from 'vant'
import defaultTop from '../../assets/img/avatar_default.png'
export default {
  data() {
    return {
      picUrl: process.env.BASE_API,
      defaultTop: defaultTop,
      user: {},
      commentList: [],
      newsOne: {
        title: ''
      },
      newsComment: {},
      loading: false,
      finished: false,
      comment: '' // 评论的文字内容
    }
  },
  mounted() {
    const { userInfo } = localStorageTool.getLocalStorage('userInfo') // 获取LocalStorage值
    if (userInfo) { // 获取用户信息、
      this.user = JSON.parse(userInfo)
    }
  },
  created() {
    newsOne({ id: this.$route.query.id }).then((data) => {
      this.newsOne = data.new// 赋值数据
    })
    this.getCommentList()
  //  newsCommentList({ id: this.$route.query.id }).then((data) => {
  //    this.commentList = data.commentList// 赋值数据
  //  })
  },
  methods: {
    getCommentList() {
      newsCommentList({ id: this.$route.query.id }).then((data) => {
        this.commentList = data.commentList// 赋值数据
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    addNewLike() {
      newLike({ id: this.$route.query.id }).then((data) => {
        this.newsOne.like += 1
        this.$toast('头条点赞成功！')
      })
    },
    addComentLike(commentId) {
      newsCommentLike({ id: commentId }).then((data) => {
        var m = this.commentList.filter((item) => { return item.id === commentId })
        if (m.length > 0) {
          m[0].like += 1
        }
        this.$toast('评论点赞成功！')
      })
    },
    sendComment() {
      newsComment({ newsId: this.$route.query.id, userId: this.user.id, comment: this.comment }).then((data) => {
        this.getCommentList()
        this.$toast('评论成功！')
        this.comment = ''
      })
    }
  },
  components: {
    [List.name]: List
  }
}
</script>
<style scoped>
.main{
  height:100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.news-detail{
  background: #fff;
  word-break: break-all;
  -webkit-text-align:justify;
  text-align: justify;
  padding: 1.89rem 1.18rem 1.18rem;
}
.news-detail p{
  word-break: break-all;
  padding:0.55rem 0;
  line-height:2rem;
}
.news-title{
  color:#333;
  font-size: 1.73rem;
  line-height: 1.97rem;
  font-weight: 700;
}
.news-bottom{
    font-size: 1rem;
    padding:1.18rem 0;
  }
  .news-author{
    color: #666;
  }
  .news-visited{
    float: right;

  }
.news-time{
  color: #999;
  margin-left:0.39rem;
}
.source{
  font-size: 1rem;
  color: rgb(191,191,191)
}
.topGroup{
    margin-top: 0.7rem;
  }
.like{
  margin: 0.4rem auto 0;
  padding: 0.35rem 0.75rem 0.4rem;
  border-radius: 1.73rem;
  border: 1px solid #e5e4e4;
  background: #fff;
  min-width: 6.5rem;
  font-size: 1.25rem;
  display: block;
}
.content{
  margin-bottom: 0.7rem;
  padding: 0.8rem 1.18rem 0.8rem 3.75rem;
  position: relative;
  /*box-shadow: 1.18rem 1px 0 rgba(0,0,0,0.04)*/
}
.bg-cut{
  width: 2.76rem;
  height: 2.76rem;
  border-radius: 50%;
  position: absolute;
  left: 0;
}
.bg-cut img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.comment-views{
  color:#999;
  float:right;
  line-height: 1.5rem;
}
.content-name{
  display: inline-block;
  color: #666;
}
.content-time{
  color: #999;
  font-size: 0.9rem;
}
.content-content{
  word-break: break-all;
  font-size: 1.18rem;
}
.footer{
  position: fixed;
  height: 50px;
  width: 100%;
  left: 0;
  bottom: 0;
  background: #e7e7e7;
}
.footer-div{
  height: 30px;
  margin-top: 9px;
  border: 1px solid #ccc;
  margin-right: 55px;
  margin-left: 10px;
  padding: 0 10px;
  background: #fff;
  border-radius: 5px;
}
.footer-div input{
  border: 0;
  background: #fff;
  width: 99%;
  margin: 0 auto;
  height: 28px;
  border-radius: 5px;
}
.footer-icon{
  font-size: 24px;
  float: right;
  padding: 0 1.18rem;
  margin-top: 10px;
  color: #666
}
.new-div{
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
}
img{
  max-width: 100%;
  height: auto;
}
</style>

