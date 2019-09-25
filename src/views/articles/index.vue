<template>
  <div>
      <el-card>
         <bread-crumb slot="header">
          <template slot="title">文章列表</template>
         </bread-crumb>
         <el-form>
          <el-form-item label="文章状态:">
             <el-radio-group v-model="formdata.status" @change="changeCondition">
    <el-radio :label="5">全部</el-radio>
    <el-radio :label="0">草稿</el-radio>
    <el-radio :label="1">待审核</el-radio>
    <el-radio :label="2">审核通过</el-radio>
    <el-radio :label="3">审核失败</el-radio>
  </el-radio-group>
          </el-form-item>
           <el-form-item label="频道列表:">
             <el-select  placeholder="请选择" v-model="formdata.channel_id" @change="changeCondition">
    <el-option v-for="item in channel" :key="item.id" :label="item.name" :value="item.id">
    </el-option>
  </el-select>
           </el-form-item>
          <el-form-item label="时间选择:">
              <el-date-picker
              @change="changeCondition"
              v-model="formdata.date"
            value-format="yyyy-MM-dd"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
          </el-form-item>
         </el-form>
      </el-card>
  <el-card>
    <div class="total">共找到条统计的数据</div>
    <div class="article-list" v-for="item in list" :key="item.id.toString()">
      <div class="left">
        <div>
        <img :src="item.cover.images.length>0? item.cover.images[0]:defaultimg">
      </div>
        <div class="left-text">
          <span>{{item.title}}</span>
          <span><el-tag :type="item.status|statusType">{{item.status|getStatus}}</el-tag></span>
          <span>{{item.pubdate}}</span>
        </div>
      </div>
      <div class="right">
        <span @click="goEdit(item.id)"><i class="el-icon-edit"></i>修改</span>
        <span class="delete" @click="deleteArtical(item.id)"><i class="el-icon-delete"></i>删除</span>
      </div>
    </div>
     <el-row type="flex" justify="center" style="margin-top:20px">
    <el-pagination
    @current-change="currentChange"
  background
  layout="prev, pager, next"
  :page-size="this.page.perPage"
  :current-page="this.page.curentPage"
  :total="this.page.total">
</el-pagination>
  </el-row>
  </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      defaultimg: require('../../assets/img/home.jpg'),
      formdata: {
        status: 5,
        channel_id: null,
        date: []
      },
      channel: [],
      page: {
        curentPage: 1,
        total: 0,
        perPage: 10
      }
    }
  },
  methods: {
    goEdit (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    deleteArtical (id) {
      this.$confirm('您确定要删除此文章吗？').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          mrethod: 'delete'
        }).then(() => {
          this.queryArtical()
        })
      })
    },
    queryArtical () {
      let params = {
        channel_id: this.formdata.channel_id,
        status: this.formdata.status === 5 ? null : this.formdata.status,
        begin_pubdate: this.formdata.date.length > 0 ? this.formdata.date[0] : null,
        end_pubdate: this.formdata.date.length > 1 ? this.formdata.date[1] : null,
        page: this.page.curentPage,
        per_page: this.page.perPage
      }
      this.getArtical(params)
    },
    currentChange (newPage) {
      this.page.curentPage = newPage
      this.queryArtical()
    },
    changeCondition () {
      this.page.curentPage = 1
      this.queryArtical()
      // let params = {
      //   channel_id: this.formdata.channel_id,
      //   status: this.formdata.status === 5 ? null : this.formdata.status,
      //   begin_pubdate: this.formdata.date.length > 0 ? this.formdata.date[0] : null,
      //   end_pubdate: this.formdata.date.length > 1 ? this.formdata.date[1] : null,
      //   page: this.page.curentPage,
      //   per_page: this.page.perPage
      // }
      // this.getArtical(params)
    },
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channel = result.data.channels
      })
    },
    getArtical (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getArtical()
    this.getChannel()
  },
  filters: {
    getStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发布'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  }
}
</script>

<style lang="less" scoped >
.total{
  height: 40px;
  line-height: 40px;
  border-bottom: 1px dashed #ccc;
}
.article-list{
  padding: 20px;
  display: flex;
  justify-content: space-between;
  .left{
    display: flex;
  img{
    width: 180px;
    height: 100px;
  }
  .left-text{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 20px;
  }
  }
   .right{
    .delete{
      margin-left: 10px;
    }
  }

}
</style>
