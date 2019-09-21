<template>
  <div>
      <el-row class="layout-header" type='flex' justify="space-between" align="middle">
          <el-col :span="6"><i class="el-icon-s-unfold"></i>江苏传智播客教育科技股份有限公司</el-col>
          <el-col :span="4"><img :src="userInfo.photo?userInfo.photo: defaultImg">
     <el-dropdown trigger="click" @command="Commandclick">
      <span class="el-dropdown-link">
        {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="account">个人信息</el-dropdown-item>
        <el-dropdown-item command="git">git地址</el-dropdown-item>
        <el-dropdown-item command="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
          </el-col>
      </el-row>
      <el-row></el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      let token = window.localStorage.getItem('use-token')
      this.$axios({
        url: '/user/profile',
        headers: { 'Authorization': `Bearer ${token}` }
      }).then((result) => {
        // console.log(result)
        this.userInfo = result.data
      })
    },
    Commandclick (key) {
      // this.$message(key)
      if (key === 'account') {
        // 个人信息
      } else if (key === 'git') {
        // 进入个人git页面
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
  }

}
</script>

<style lang="less" scoped>
.layout-header{
    .el-icon-s-unfold{
        font-size: 18px;
        vertical-align: top;
        margin-right: 4px;
    }
    img{
        width: 35px;
        height:35px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 4px;
    }
}
</style>
