<template>
  <div class="cover-image">
      <div v-for="(item,index) in images" :key="index" class="image" @click="openLayer(index)">
          <img :src="item? item:defaultImage">
      </div>
      <el-dialog :visible="visible" @close="visible = false">
          <select-image @getUrl="imageUrl"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImage: require('../../assets/img/pic_bg.png'),
      visible: false,
      selectIndex: -1
    }
  },
  methods: {
    imageUrl (url) {
      this.$emit('imageUrl1', url, this.selectIndex)
      this.visible = false
    },
    openLayer (index) {
      this.visible = true
      this.selectIndex = index
    }
  }

}
</script>

<style lang="less" scoped>
.cover-image{
  display: flex;
  margin: 20px 0;
  .image{
      border: 1px solid #ccc;
      margin: 5px;
      width:220px;
      height: 220px;
      img{
          width: 100%;
          height: 100%;
      }
  }
}
</style>
