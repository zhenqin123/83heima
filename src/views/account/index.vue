<template>
  <div>
   <el-card>
         <bread-crumb slot="header">
         <template slot="title">账户信息</template>
         </bread-crumb>
         <el-form label-width="100px" style="width:300px" :model="formdata" :rules="accountRules" ref="myform">
     <el-form-item label="用户名：" prop="name">
       <el-input v-model="formdata.name" style="width:300px"></el-input>
       </el-form-item>
         <el-form-item label="简介：" prop="intro">
       <el-input v-model="formdata.intro" style="width:300px"></el-input>
       </el-form-item>
         <el-form-item label="邮箱：" prop="email">
       <el-input v-model="formdata.email" style="width:300px"></el-input>
       </el-form-item>
         <el-form-item label="手机号：" prop="mobile">
       <el-input v-model="formdata.mobile" style="width:300px" disabled></el-input>
       </el-form-item>
          <el-form-item>
           <el-button type="primary" @click="testing">保存信息</el-button>
       </el-form-item>
       <el-upload action='' :http-request="upimg"  :show-file-list="false">
       <img :src="formdata.photo?formdata.photo:defaultphoto">
       </el-upload>
         </el-form>
   </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''
      },
      defaultphoto: require('../../assets/img/404.png'),
      accountRules: {
        name: [{ required: true, message: '请输入正确的用户名' }],
        email: [{ required: true, message: '请输入邮箱号' },
          { pattern: '^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$', message: '请输入正确的邮箱格式' }
        ]

      }
    }
  },
  methods: {
    upimg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'PATCH',
        data
      }).then(result => {
        this.formdata.photo = result.data.photo
      })
    },

    getaccount () {
      this.$axios({
        url: '/user/profile',
        method: 'get'
      }).then(result => {
        this.formdata = result.data
      })
    },
    testing () {
      this.$refs.myform.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'PATCH',
            data: this.formdata
          }).then(() => {
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
      })
    }
  },
  created () {
    this.getaccount()
  }
}
</script>

<style lang="less" scoped>
 img{
     position: absolute;
     right: 200px;
     top:200px;
     width: 200px;
     height: 200px;
     border-radius: 50%;
 }
</style>
