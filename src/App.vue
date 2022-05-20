<template>
  <n-message-provider>
    <BasicLayout>
      <router-view />
    </BasicLayout>
  </n-message-provider>
</template>

<script setup lang="ts"></script>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
