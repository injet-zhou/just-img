<template>
  <div class="login-wrapper">
    <div class="form-structor">
      <div :class="!isLogin ? 'signup slide-up' : 'signup'">
        <h2 class="form-title" @click="toggleLogin" id="signup"><span>or</span>注册</h2>
        <div class="form-holder">
          <input type="text" class="input" placeholder="用户名" />
          <input type="email" class="input" placeholder="邮箱" />
          <input type="password" class="input" placeholder="密码" />
        </div>
        <button class="submit-btn">注册</button>
      </div>
      <div :class="isLogin ? 'login slide-up' : 'login'">
        <div class="center">
          <h2 class="form-title" @click="toggleLogin" id="login"><span>or</span>登录</h2>
          <div class="form-holder">
            <input v-model="loginReq.username" type="email" class="input" placeholder="邮箱/用户名" />
            <input v-model="loginReq.password" type="password" class="input" placeholder="密码" />
          </div>
          <button @click="login" class="submit-btn">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { encodeLoginRequest, LoginRequest } from "@/proto/auth";

const isLogin = ref(true)
const loginReq = reactive<LoginRequest>({
  email: "",
  password: "",
  username: "",
})

const toggleLogin = () => {
  isLogin.value = !isLogin.value
}

const login = async () => {
  const data = encodeLoginRequest(loginReq)
  console.log(data)
}

</script>

<style scoped lang="scss">
@import "../assets/css/login.scss";
</style>
