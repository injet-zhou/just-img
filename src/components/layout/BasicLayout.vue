<template>
  <n-layout>
    <n-layout-header bordered :inverted="true"
      ><basic-header></basic-header
    ></n-layout-header>
    <n-layout-content content-style="padding: 24px;">
      <slot></slot>
    </n-layout-content>
    <div class="footer"><basic-footer /></div>
  </n-layout>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.n-layout {
  height: 100%;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #f5f5f5;
  text-align: center;
  line-height: 50px;
  font-size: 14px;
  color: #666;
}
</style>
