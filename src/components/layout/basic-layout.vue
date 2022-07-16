<template>
  <n-layout>
    <n-layout-content>
      <n-layout-header bordered :inverted="true"
        ><basic-header></basic-header
      ></n-layout-header>
      <slot></slot>
    </n-layout-content>
    <basic-footer />
  </n-layout>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.n-layout {
  height: 100%;
}
</style>
