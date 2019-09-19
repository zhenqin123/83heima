<template>
  <div class='login'>
   <el-card class="box-card">
       <div class="title">
       <img src="../../assets/img/logo_index.png">
       </div>
       <el-form style="margin-top:20px">
       <el-form-item>
           <el-input></el-input>
       </el-form-item>
       <el-form-item>
           <el-input style="width:65%"></el-input>
            <el-button style="float:right">发送验证码</el-button>
       </el-form-item>
       <el-form-item>
            <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
       </el-form-item>
       <el-form-item>
             <el-button type="primary" style="width:100%">登录</el-button>
       </el-form-item>
       </el-form>
   </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scope>
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
        img{
            height: 45px;
        }
    }
    }
}

</style>
