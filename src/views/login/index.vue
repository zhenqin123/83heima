<template>
  <div class='login'>
   <el-card class="box-card">
       <div class="title">
       <img src="../../assets/img/logo_index.png">
       </div>
       <el-form :model="loginform" :rules="loginrules" ref="myform">
       <el-form-item prop="mobile">
           <el-input placeholder="请输入手机号" v-model="loginform.mobile"></el-input>
       </el-form-item>
       <el-form-item prop="code">
           <el-input style="width:65%" placeholder="请输入验证码" v-model="loginform.code"></el-input>
            <el-button style="float:right">发送验证码</el-button>
       </el-form-item>
       <el-form-item prop="agree">
            <el-checkbox v-model="loginform.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
       </el-form-item>
       <el-form-item>
             <el-button type="primary" style="width:100%" @click="testing">登录</el-button>
       </el-form-item>
       </el-form>
   </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginform: {
        mobile: '',
        code: '',
        agree: false
      },
      loginrules: {
        mobile: [{ required: true, message: '请输入正确的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }
        ],
        code: [{ required: true, message: '请输入正确的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }

        ],
        agree: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('请阅读并勾选协议'))
          }
        } }]
      }

    }
  },
  methods: {
    testing () {
      this.$refs.myform.validate((isOK) => {
        if (isOK) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.loginform
          }).then((result) => {
            window.localStorage.setItem('use-token', result.data.token)
            this.$router.push('/home')
          })
        }
      })
    }

  }
}
</script>

<style lang='less' scoped>
.login{
    background-image: url(../../assets/img/login_bg.jpg);
    height: 100vh;
    background-size: cover;
    display: flex;
   justify-content: center;
    align-items: center;
    .box-card{
        width: 440px;
        height :340px;
    .title{
        text-align:center;
        margin-bottom:20px;
        img{
            height: 45px;
        }
    }
    }
}

</style>
