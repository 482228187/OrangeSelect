//路由鉴权：鉴权：项目当中路由能不能被访问的权限
import router from '@/router'
import nprogress from 'nprogress'
import { lgoSetting } from './setting'
//引入进度条样式
import 'nprogress/nprogress.css'
import pinia from './store'
import useUserStore from './store/modules/user'
const userStore = useUserStore(pinia)
//全局前置守卫的业务逻辑1.判断是有token,如果有如果访问login 直接登陆成功，指向首页
// 登陆成功访问其余的页面,查看是否有个人信息,有直接放行,没有请求个人信息之后放行,如果token过期或更改则退出登录

router.beforeEach(async (to: any, from: any, next: any) => {
  //网页的名字
  document.title = `${lgoSetting.title}-${to.meta.title}`
  //访问某一个路由之前的守卫

  nprogress.start()
  // 获取token和用户名
  const token = userStore.token
  let username = userStore.username
  // 登录判断
  //用户登录判断
  if (token) {
    //登陆成功，访问login。指向首页
    if (to.path == '/login') {
      next('/')
    } else {
      //登陆成功访问其余的，放行
      //有用户信息
      if (username) {
        //放行
        next()
      } else {
        //如果没有用户信息，在收尾这里发请求获取到了用户信息再放行
        try {
          //获取用户信息
          await userStore.userInfo()
          //万一刷新的时候是异步路由，有可能获取到用户信息但是异步路由没有加载完毕，出现空白效果
          next({ ...to })
        } catch (error) {
          //token过期|用户手动处理token
          //退出登陆->用户相关的数据清空

          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    //用户未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

//全局后置守卫
router.afterEach((to: any, from: any) => {
  // to and from are both route objects.
  nprogress.done()
})

//第一个问题：任意路由切换实现进度条业务 ----nprogress
