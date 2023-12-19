<template>
  <div class="box6">
    <div class="title">
      <p>年度销量对比</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <!-- 图形图标的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
//获取DOM节点
let charts = ref()
let option = {
  // backgroundColor: '#0D2753',
  tooltip: {
    //雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
    confine: true,
    enterable: true, //鼠标是否可以移动到tooltip区域内
  },
  radar: {
    name: {
      textStyle: {
        color: '#05D5FF',
        fontSize: 14,
      },
    },
    shape: 'polygon',
    center: ['50%', '50%'],
    radius: '80%',
    startAngle: 120,
    scale: true,
    axisLine: {
      lineStyle: {
        color: 'rgba(5, 213, 255, .8)',
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        color: 'rgba(5, 213, 255, .8)', // 设置网格的颜色
      },
    },
    indicator: [
      {
        name: '电子产品',
        max: 100,
      },
      {
        name: '美妆',
        max: 100,
      },
      {
        name: '食品',
        max: 100,
      },
      {
        name: '药品',
        max: 100,
      },
      {
        name: '家电',
        max: 100,
      },
    ],
    splitArea: {
      show: false,
    },
  },
  grid: {
    position: 'center',
  },
  polar: {
    center: ['50%', '50%'], // 默认全局居中
    radius: '0%',
  },
  angleAxis: {
    min: 0,
    interval: 5,
    clockwise: false,
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  radiusAxis: {
    min: 0,
    interval: 20,
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      name: '个人雷达图',
      type: 'radar',
      symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
      symbolSize: 10, // 拐点的大小
      itemStyle: {
        normal: {
          color: '#05D5FF',
        },
      },
      areaStyle: {
        normal: {
          color: '#05D5FF',
          opacity: 0.5,
        },
      },
      lineStyle: {
        width: 2,
        color: '#05D5FF',
      },
      label: {
        normal: {
          show: true,

          color: '#fff',
        },
      },
      data: [
        {
          value: [20, 50, 60, 60, 90, 80],
        },
      ],
    },
  ],
}

//组件挂载完毕
onMounted(() => {
  //一个容器可以同时展示多种类型的图形图标
  let mychart = echarts.init(charts.value)
  //设置配置项
  mychart.setOption(option)
})
</script>

<style scoped lang="scss">
.box6 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;

  .title {
    margin-left: 5px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }
}
</style>
