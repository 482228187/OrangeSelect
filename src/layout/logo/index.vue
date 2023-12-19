<!-- 封装标题和logo组件 -->
<template>
  <div class="logo" v-if="lgoSetting.logoHidden">
    <img :src="lgoSetting.logo" alt="" />
    <p>{{ lgoSetting.title }}</p>
  </div>
</template>

<script setup lang="ts">
//引入设置标题与logo配置文件
import { lgoSetting } from '@/setting'
</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
