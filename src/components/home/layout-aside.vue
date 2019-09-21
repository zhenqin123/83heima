<template>
  <div class="layout-aside">
   <div class="logo">
     <img src="../../assets/img/logo_admin.png">
     </div>
    <el-menu
       style="width:202px"
      background-color=" #353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b"
      :router="true"
      >
    <el-menu-item index="4">
       <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/home">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>内容管理</span>
        </template>
          <el-menu-item index="/home/publish">发布文章</el-menu-item>
          <el-menu-item index="/home/articles">文章列表</el-menu-item>
          <el-menu-item index="/home/comment">评论列表</el-menu-item>
          <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>
          <el-menu-item index="/home/Graphicdata">图文数据</el-menu-item>
          <el-menu-item index="/home/Fanprofile">粉丝概况</el-menu-item>
          <el-menu-item index="/home/Fansportrait">粉丝画像</el-menu-item>
          <el-menu-item index="/home/fanlist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/account">
        <i class="el-icon-s-tools"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
     </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout-aside{
  width: 201px;
  height:100vh;
  // background-color: #323745;
  text-align: center;
  .logo{
     padding-top: 15px;
     img{
       height: 30px;
     }
  }

}
</style>
