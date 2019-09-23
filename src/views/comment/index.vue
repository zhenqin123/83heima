<template>
  <div>
     <el-card  v-loading="loading">
         <bread-crumb slot="header">
         <template slot="title">评论列表</template>
         </bread-crumb>
         <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
       width="600px"
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
       align="center"
        prop="comment_status"
        :formatter="statusFormatter"
        label="评论状态">
      </el-table-column>
      <el-table-column
        align="center"
        prop="total_comment_count"
        label="总评论数">
      </el-table-column>
        <el-table-column
        align="center"
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
       <el-table-column
        align="center"
        label="操作"
        >
        <template slot-scope="obj">
        <el-button type="text">修改</el-button>
        <el-button type="text" :style="{color:obj.row.comment_status?'#E6A23C':'#409EFF'}" @click="closeorOpen(obj.row)">{{obj.row.comment_status? "关闭评论":"打开评论"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin-top:20px">
    <el-pagination
    background
    layout="prev, pager, next"
    :current-page="page.currentPage"
    :page-size="page.perPage"
   :total="page.pageCount" @current-change='currentChange'>
</el-pagination>
    </el-row>
     </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      page: {
        pageCount: 0,
        currentPage: 1,
        perPage: 10
      },
      loading: false
    }
  },
  methods: {
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.perPage }

      }).then(result => {
        // console.log(result.data)
        this.tableData = result.data.results
        this.page.pageCount = result.data.total_count
        this.loading = false
      })
    },
    statusFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    closeorOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否要${mess}评论?`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getComment()
        })
      })
    },
    currentChange (newPage) {
      // alert(newPage)
      this.page.currentPage = newPage
      this.getComment()
    }

  },
  created () {
    this.getComment()
  }

}
</script>

<style>

</style>
