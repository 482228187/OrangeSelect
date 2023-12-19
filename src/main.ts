import { createApp } from 'vue'
import App from '@/App.vue'
// 引入element plus 插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// element 国际化配置引入
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// svg 插件需要的配置
import 'virtual:svg-icons-register'
// 在入口文件引入Component/index.ts文件
import gloablComponent from './components/index'
// 引入路由
import router from './router'
// 引入全局样式
import '@/styles/index.scss'
//引入路由鉴权文件
import './permisstion'
// 引入pinia
import pinia from './store'
//暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 获取应用实例对象
const app = createApp(App)
// 使用插件
app.use(ElementPlus, {
  locale: zhCn, //element 国际化配置
})
app.use(gloablComponent)

app.use(router)

app.use(pinia)
// 将应用挂载
app.mount('#app')
