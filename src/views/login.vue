<template>
  <div class="login-wrapper">
    <div class="form-structor">
      <div :class="!data.isLogin ? 'signup slide-up' : 'signup'">
        <h2 class="form-title" @click="toggleLogin" id="signup"><span>or</span>注册</h2>
        <div class="form-holder">
          <input v-model="registerReq.username" type="text" class="input" placeholder="用户名" />
          <input v-model="registerReq.email" type="email" class="input" placeholder="邮箱" />
          <input v-model="registerReq.password" type="password" class="input" placeholder="密码" />
          <input v-model="confirmPassword" type="password" class="input" placeholder="确认密码" />
        </div>
        <button @click="throttledRegister" class="submit-btn">注册</button>
      </div>
      <div :class="data.isLogin ? 'login slide-up' : 'login'">
        <div class="center">
          <h2 class="form-title" @click="toggleLogin" id="login"><span>or</span>登录</h2>
          <div class="form-holder">
            <input class="input" v-model="loginReq.username" type="email" placeholder="邮箱/用户名" />
            <input v-model="loginReq.password" type="password" class="input" placeholder="密码" />
          </div>
          <button @click="throttledLogin" class="submit-btn">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { encodeLoginRequest, LoginRequest, RegisterRequest } from "@/proto/auth";
import { useRouter } from "vue-router";
import utils from '@/utils'
import server from '@/server'
import { useMessage } from "naive-ui";
import _ from 'lodash'

const {api} = server
const {isValidEmail} = utils.validate
const {Storage} = utils
const router = useRouter()

const data = reactive({
  isLogin: false,
})
const loginReq = reactive<LoginRequest>({
  email: "",
  password: "",
  username: "",
})
const confirmPassword = ref("")

const registerReq = reactive<RegisterRequest>({
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
  data.isLogin = !data.isLogin
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
  try {
    const res: any = await api.login(data)
    if (res.code === 200) {
      const storage = new Storage()
      const {content} = res
      storage.setToken(content?.token)
      storage.set('user', content ?? '')
      router.push('/')
    }
  } catch (e) {
  }
}

const throttledLogin = _.throttle(login, 3000)

const register = async () => {
  const req: ReqParams = {
    username: registerReq.username?.trim() ?? '',
    password: registerReq.password?.trim() ?? '',
    email: registerReq.email?.trim() ?? '',
  }
  if (!req.username && !req.email) {
    window.$message.error('请输入用户名或邮箱')
    return
  }
  if (!req.password) {
    window.$message.error('请输入密码')
    return
  }
  if (req.password !== confirmPassword.value) {
    window.$message.error('两次输入的密码不一致')
    return
  }
  if (req.email && !isValidEmail(req.email)) {
    window.$message.error('请输入正确的邮箱')
    return
  }
  const bin = encodeLoginRequest(registerReq)
  try {
    const res: any = await api.register(bin)
    if (res.code === 200) {
      window.$message.success('注册成功')
      data.isLogin = true
    }
  } catch (e: any) {
    window.$message.error(e.message)
  }

}

const throttledRegister = _.throttle(register, 3000)

onMounted(() => {
  window.$message = useMessage()
})

</script>

<style scoped lang="scss">
@import "../assets/css/login.scss";
</style>
