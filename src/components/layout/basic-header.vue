<template>
  <n-grid :x-gap="12" :cols="4">
    <n-grid-item>
      <div class="logo-container">
        <img
          class="logo"
          src="https://s3.bmp.ovh/imgs/2022/07/13/620c62f3c03c79f8.png"
          alt="logo"
        />
      </div>
    </n-grid-item>
    <n-grid-item :offset="2">
      <div class="avatar-container">
        <n-tag round :bordered="false" :color="{ color: '#BBB', textColor: '#555', borderColor: '#555' }">
          {{user.username}}
          <template #avatar>
            <n-avatar
              :src="user.avatar"
            />
          </template>
        </n-tag>
      </div>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import StorageManager from "@/utils/storage";
import { onMounted, reactive } from "vue";
const storage = new StorageManager();

const defaultAvatar = "https://s3.bmp.ovh/imgs/2022/07/13/ae8f5a5375163dd1.png"

const user = reactive({
  username: "",
  avatar: "",
});

onMounted(()=>{
  const userInfo = JSON.parse(storage.get("user") ?? "") ?? {};
  if (userInfo && Object.keys(userInfo).length) {
    user.username = userInfo.username;
    user.avatar = userInfo.avatar || defaultAvatar;
  }
})
</script>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 15px;
  .logo {
    width: 100px;
    height: 100%;
  }
}
.avatar-container {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 15px;
}
</style>
