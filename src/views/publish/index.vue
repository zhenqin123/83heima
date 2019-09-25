<template>
  <div>
      <el-card>
          <bread-crumb slot="header">
          <template slot="title">
             发布文章
          </template>
          </bread-crumb>
          <el-form class="form-content" label-width="80px" :model="formdata" :rules="rules" ref="formtest">
              <el-form-item label="标题" prop="title">
             <el-input placeholder="文章名称" style="width:500px" v-model="formdata.title"></el-input>
              </el-form-item>
            <el-form-item label="内容" prop="content">
                <!-- <el-input type="textarea" :rows="10"  placeholder="请输入内容" v-model="formdata.content"></el-input> -->
                <quill-Editor  v-model="formdata.content" style="height:300px"></quill-Editor>
            </el-form-item>
            <el-form-item label="封面" prop="cover" style="margin-top:100px">
                <el-radio-group v-model="formdata.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
  </el-radio-group>
            </el-form-item>
            <el-form-item label="频道" prop="channel_id">
                 <el-select  placeholder="请选择" v-model="formdata.channel_id">
    <el-option v-for="item in channel" :key="item.id" :label="item.name" :value="item.id">
    </el-option>
  </el-select>
            </el-form-item>
            <el-form-item style="margin-top:30px">
              <el-button type="primary" @click="testing(false)">发布</el-button>
              <el-button  @click="testing(true)">存为草稿</el-button>
            </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      channel: [],
      formdata: {
        title: '',
        channel_id: null,
        content: '',
        cover: {
          type: 0,
          images: []

        }
      },
      rules: {
        title: [{ required: true, message: '标题不能为空' }, { min: 2, max: 30, message: '标题必须是2-30个字符' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }

    }
  },
  methods: {
    getDatabyId (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(result => {
        this.formdata = result.data
      })
    },
    testing (draft) {
      this.$refs.formtest.validate((isok) => {
        if (isok) {
          let id = this.$route.params.id
          // if (id) {
          this.$axios({
            url: id ? `/articles/${id}` : '/articles',
            method: id ? 'put' : 'post',
            params: { draft },
            data: this.formdata
            // data: {
            //   title: this.formdata.title,
            //   content: this.formdata.content,
            //   cover: this.formdata.cover,
            //   channel_id: this.formdata.channel_id
            // }
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
        // } else {
        //   this.$axios({
        //     url: `/articles/${id}`,
        //     method: 'put',
        //     params: { draft },
        //     data: this.formdata
        //   })
        // }
        // }
      })
    },
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channel = result.data.channels
      })
    }
  },
  created () {
    this.getChannel()
    let id = this.$route.params.id
    id && this.getDatabyId(id)
  }
}
</script>

<style lang="less" scoped>
.form-content{
    margin-left: 30px;
}
</style>
