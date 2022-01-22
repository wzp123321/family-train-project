<script setup lang="ts">
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
</script>

<template>
  <a-locale-provider :locale="zhCN">
    <router-view></router-view>
  </a-locale-provider>
</template>
