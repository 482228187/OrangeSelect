<template>
  <div class="login_container">
    <!-- 采用layout布局 -->
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          v-model="loginForm"
          ref="loginForms"
          :rules="rules"
        >
          <h1>Hello</h1>
          <h2>欢迎来到橙芯甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
//获取路由器
let $router = useRouter()
//路由对象
let $route = useRoute()
//收集账号与密码数据
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
// 收集表单元素
let loginForms = ref()
let loading = ref(false)
let userStore = useUserStore()
// 定义表单校验规则
const rules = {
  username: [
    //规则对象属性:
    {
      required: true, // required,代表这个字段务必要填的
      min: 5, //min:文本长度至少多少位
      max: 10, // max:文本长度最多多少位
      message: '长度应为6-10位', // message:错误的提示信息
      trigger: 'change', //trigger:触发校验表单的时机 change->文本发生变化触发校验, blur:失去焦点的时候触发校验规则
    },
  ],
  password: [
    //规则对象属性:
    {
      required: true, // required,代表这个字段务必要填的
      min: 6, //min:文本长度至少多少位
      max: 10, // max:文本长度最多多少位
      message: '密码长度应为6-10位', // message:错误的提示信息
      trigger: 'change', //trigger:触发校验表单的时机 change->文本发生变化触发校验, blur:失去焦点的时候触发校验规则
    },
  ],
}
const login = async () => {
  //  首先保证表单通过校验了再发请求
  await loginForms.value.validate()
  // 登录的加载状态变化
  loading.value = true
  // 处理登录的业务逻辑:1.通知仓库发起登录请求,请求成功则路由跳转,否则提示登录失败
  try {
    // 登录成功
    await userStore.userLogin(loginForm)
    //判断登录的时候,路由路径当中是否有query参数，如果有就往query参数挑战，没有跳转到首页
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '登录成功！',
      title: `HI,${getTime()}好`,
    })
    // 加载状态变化
    loading.value = false
  } catch (error) {
    // 加载状态变化
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background1.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
