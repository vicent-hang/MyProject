<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar
      title="商品搜索"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 搜索栏 -->
    <van-search
      v-model="searchValue"
      show-action
      placeholder="请输入搜索关键词"
    >
      <template #action>
        <div @click="gosearch(searchValue)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div v-if="historyArray.length > 0" class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="historyClear" name="delete-o" size="16"></van-icon>
      </div>
      <div class="list">
        <div v-for="item in historyArray" :key="item" @click="gosearch(item)"> {{ item }}</div>
      </div>
    </div>
  </div>

</template>

<script>
import { getSearchHistory, setSearchHistory } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchValue: '',
      // 默认搜索历史
      historyArray: getSearchHistory()
    }
  },
  methods: {
    gosearch (value) {
      // console.log('搜索')
      if (this.historyArray.includes(value)) {
        // 若有相同的关键字， 则将原有的删除，再添加到最前面
        this.historyArray = this.historyArray.filter(item => item !== value)
      }
      // 没有相同的关键字 ， 则添加到最前面
      this.historyArray.unshift(value)

      // 存入本地
      setSearchHistory(this.historyArray)

      // 跳转搜索列表
      this.$router.push(`/searchlist?search=${value}`)
    },
    historyClear () {
      this.historyArray = []
      setSearchHistory([])
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  .van-nav-bar__title{
        font-weight: 900;
  }
}
.van-search__action {
  background-color: red;
  border-radius: 0 5px 5px 0;
  color: white;
}
.search-history {
  padding: 20px;
  .title {
    .van-icon {
      float: right;
    }
  }
  .list {
    div {
    margin-top: 10px;
    height: 30px;
    width: 100px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #a9a9a9;
    background-color: #fbfbfb;
    border-radius: 30px;
    margin-right: 10px;
    float: left;
    }
  }
}

</style>
