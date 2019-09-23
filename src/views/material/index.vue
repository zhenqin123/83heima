<template>
  <div>
     <el-card>
         <bread-crumb slot="header">
         <template slot="title">素材管理</template>
         </bread-crumb>
      <el-upload action="" :http-request="uploadimg" class="upload1">
        <el-button type="primary">上传文件</el-button>
      </el-upload>
         <el-tabs v-model="activeName" @tab-click="changeTab">
    <el-tab-pane label="全部素材" name="all">
      <div class="img-list">
      <el-card class="img-item" v-for="item in list" :key="item.id">
        <img :src="item.url">
         <div class="operate">
        <i class="el-icon-star-on" :style="{color:item.is_collected?'red':'#000'}"></i>
        <i class="el-icon-delete-solid"></i>
      </div>
      </el-card>
      </div>
<el-row type="flex" justify="center">
<el-pagination
  background
  layout="prev, pager, next"
  :current-page="page.currentPage"
    :page-size="page.perPage"
   :total="page.pageCount" @current-change='currentChange'>
</el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
      <el-card class="img-item" v-for="item in list" :key="item.id">
        <img :src="item.url">
         <!-- <div class="operate">
        <i class="el-icon-star-on" :style="{color:item.is_collected?'red':'#000'}"></i>
        <i class="el-icon-delete-solid"></i>
      </div> -->
      </el-card>
      </div>
      <el-row type="flex" justify="center">
<el-pagination
  background
  layout="prev, pager, next"
  :current-page="page.currentPage"
    :page-size="page.perPage"
   :total="page.pageCount" @current-change='currentChange'>
</el-pagination>
      </el-row>
    </el-tab-pane>
  </el-tabs>
     </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      collectList: [],
      page: {
        pageCount: 0,
        currentPage: 1,
        perPage: 10
      }
    }
  },
  methods: {
    uploadimg (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.getMaterial()
      })
    },
    currentChange (newpage) {
      this.page.currentPage = newpage
      this.getMaterial()
    },
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', page: this.page.currentPage, per_page: this.page.perPage }
      }).then(result => {
        this.list = result.data.results
        this.page.pageCount = result.data.total_count
      })
    }
    // handleClick () {
    //   if (this.activeName === 'all') {
    //     this.getMaterial(false)
    //   } else {
    //     this.getMaterial(true)
    //   }
    // }
  },
  created () {
    this.getMaterial()
  }

}
</script>

<style lang='less' scoped>
.upload1{
  position: absolute;
  right: 30px;
  margin-top: -10px;
  z-index: 1;
}
.img-list{
  display: flex;
  flex-wrap: wrap;
  .img-item{
  position: relative;
   width: 180px;
   height: 180px;
   border-radius: 5%;
   margin: 30px;
   img{
     width: 100%;
     height: 100%;
   }
   .operate{
    position: absolute;
    bottom: 0;
    left:0;
    width: 100%;
    background-color: #f4f5f6;
    height: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    i{
      font-size: 20px;
    }
   }
  }

}
</style>
