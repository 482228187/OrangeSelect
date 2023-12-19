<template>
  <div class="box1">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
//获取图形图标的DOM节点
let charts = ref()
let option = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    right: 30,
    top: 40,
    orient: 'vertical', //图例组件方向的设置
    textStyle: {
      color: 'white',
      fontSize: 14,
    },
  },
  series: [
    {
      name: '年龄分布',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'left',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 7.16, name: '16岁以下' },
        { value: 23.15, name: '16-18岁' },
        { value: 51.71, name: '19-24岁' },
        { value: 16.87, name: '25岁-35岁' },
        { value: 10.5, name: '36-50岁' },
        { value: 0.04, name: '50岁以下' },
      ],
    },
  ],
  grid: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
}

onMounted(() => {
  //初始化echarts实例
  let mycharts = echarts.init(charts.value)
  //设置配置项
  mycharts.setOption(option)
})
</script>
<style scoped lang="scss">
.box1 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;

  .title {
    margin-left: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: 260px;
  }
}
</style>
