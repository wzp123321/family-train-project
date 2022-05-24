<script setup lang="ts">
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { ConfigProvider } from 'ant-design-vue';
</script>

<template>
  <ConfigProvider :locale="zhCN">
    <router-view></router-view>
  </ConfigProvider>
</template>
