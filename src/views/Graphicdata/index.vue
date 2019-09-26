<template>
  <div>
      <el-card>
          <bread-crumb slot="header">
         <template slot="title">图文数据</template>
         </bread-crumb>
         <el-row type="flex" justify="center">
           <div id="main" style="width: 600px;height:400px;" ref="echart"></div>
            <div id="main1" style="width: 600px;height:400px;" ref="echart2"></div>
         </el-row>
      </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    let myechart = echarts.init(this.$refs.echart)
    let myechart2 = echarts.init(this.$refs.echart2)
    myechart.setOption(this.option)
    myechart2.setOption(this.option2)
  },
  data () {
    return {
      option: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      },
      option2: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  }
}
</script>

<style>

</style>
