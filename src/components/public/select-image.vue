<template>
  <div>
    <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="first">
        <div class="material">
        <el-card v-for="item in list" :key="item.id" class="each-material">
         <img :src="item.url" @click="transUrl(item)">
        </el-card>
        </div>
        <el-row type="flex" justify="center" style="margin-top:20px">
   <el-pagination
   @current-change="pageChange"
  background
  layout="prev, pager, next"
  :total="page.total"
  :page-size="page.pagesize"
  :current-page="page.currentpage">
</el-pagination>
  </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="second">
    <el-upload
  class="avatar-uploader"
  action=""
  :show-file-list="false"
  :http-request="uploadimg"
  >
  <i class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      list: [],
      page: {
        total: 0,
        currentpage: 1,
        pagesize: 12
      }
    }
  },
  methods: {
    uploadimg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        this.$emit('getUrl', result.data.url)
      })
    },
    transUrl (item) {
      this.$emit('getUrl', item.url)
    },
    pageChange (newPage) {
      this.page.currentpage = newPage
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentpage, per_page: this.page.pagesize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }

}
</script>

<style lang='less' scoped>
.material{
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
.each-material{
    width: 150px;
    height: 120px;
    margin: 20px;
    img{
        width: 100%;
        height: 100%;
    }
}
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
