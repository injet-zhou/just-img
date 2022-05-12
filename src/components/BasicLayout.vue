<template>
  <n-layout>
      <n-layout-header><basic-header></basic-header></n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <slot></slot>
      </n-layout-content>
      <n-layout-footer><basic-footer></basic-footer></n-layout-footer>
    </n-layout>
</template>

<script setup lang="ts">

</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
