<template>
  <div class="box">
    <div class="top">
      <p class="title">实时访客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>99999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- 盒子将来echarts展示图形图标的节点 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import 'echarts-liquidfill'
import * as echarts from 'echarts'
let people = ref('215908人')
//获取节点
let charts = ref()
var aqiData = 60
let option = {
  backgroundColor: 'rgb(11,27,52)',
  title: {
    text: aqiData,
    textStyle: {
      fontSize: 80,
      fontWeight: 'normal',
      color: 'rgb(124,190,255)',
    },
    x: 'center',
    y: 'center',
  },
  graphic: [
    {
      type: 'group',
      left: '5%',
      top: '10%',
      children: [
        {
          type: 'text',
          style: {
            fill: '#fff',
            text: '流量统计',
            fontSize: 30,
          },
        },
      ],
    },
  ],
  series: [
    {
      type: 'liquidFill',
      waveAnimation: 10,
      data: [0.35, 0.3],
      color: ['rgb(77,95,202)', 'rgba(79,71,183,.8)'],
      amplitude: 35,
      radius: '80%',
      backgroundStyle: {
        color: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.55,
          colorStops: [
            {
              offset: 0.5,
              color: 'rgb(11,27,52)', // 0% 处的颜色
            },
            {
              offset: 0.75,
              color: 'rgb(27,41,83)', // 100% 处的颜色
            },
            {
              offset: 0.95,
              color: 'rgb(53,63,135)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
      },
      outline: {
        show: false,
      },
      label: {
        normal: {
          formatter: '',
        },
      },
    },
  ],
}
onMounted(() => {
  //获取echarts类的实例
  let mycharts = echarts.init(charts.value)
  //设置实例的配置项
  mycharts.setOption(option)
})
</script>
<style lang="scss" scoped>
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      font-size: 20px;
      span {
        color: yellowgreen;
      }
    }
  }
  .number {
    padding: 10px;
    margin-top: 30px;
    display: flex;

    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }
  .charts {
    width: 100%;
    height: 270px;
  }
}
</style>
