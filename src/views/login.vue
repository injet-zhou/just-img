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
import { onMounted, reactive, ref } from "vue";
import { encodeLoginRequest, LoginRequest } from "@/proto/auth";
import { useRouter } from "vue-router";
import utils from '@/utils'
import server from '@/server'
import { useMessage } from "naive-ui";

const {api} = server
const {isValidEmail} = utils.validate
const {Storage} = utils
const router = useRouter()

const isLogin = ref(false)
const loginReq = reactive<LoginRequest>({
  email: "",
  password: "",
  username: "",
})

type ReqParams = {
  username: string
  password: string
  email: string
}

const toggleLogin = () => {
  isLogin.value = !isLogin.value
}

const login = async () => {
  const req: ReqParams = {
    username: loginReq.username?.trim() ?? '',
    password: loginReq.password?.trim() ?? '',
    email: loginReq.email?.trim() ?? '',
  }
  if (!req.username) {
    window.$message.error('请输入用户名/邮箱')
    return
  }
  if (!req.password) {
    window.$message.error('请输入密码')
    return
  }

  if (isValidEmail(req.username)) {
    req.email = req.username
  }

  const data = encodeLoginRequest(loginReq)
  const res: any = await api.login(data)
  if (res.code === 200) {
    const storage = new Storage()
    const {content} = res
    storage.setToken(content?.token)
    storage.set('user', content ?? '')
    router.push('/')
  }
}

onMounted(() => {
  window.$message = useMessage()
})

</script>

<style scoped lang="scss">
@import "../assets/css/login.scss";
</style>
