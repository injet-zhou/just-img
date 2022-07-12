<template>
  <div class="footer-content">
    <div class="copyRight">
      <span>© 2022</span>
      <span>just-img</span>
    </div>
    <div class="beian">
      <span>京ICP备20000123号</span>
      <span>京公网安备11010802020134号</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .copyRight {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #999;
    span {
      margin-right: 10px;
      font-weight: bold;
    }
  }
  .beian {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #999;
    span {
      margin-right: 10px;
    }
  }
}
</style>
