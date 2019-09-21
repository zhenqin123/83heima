<template>
  <div>
     <el-card>
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
        <el-button type="text">修改</el-button>
        <el-button type="text">关闭评论</el-button>
      </el-table-column>
    </el-table>
     </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }

      }).then(result => {
        // console.log(result.data)
        this.tableData = result.data.results
      })
    }
  },
  created () {
    this.getComment()
  }

}
</script>

<style>

</style>
