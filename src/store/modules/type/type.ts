// 定义用户小仓库的数据类型
import { RouteRecordRaw } from 'vue-router'
// 定义商品属性分类
import type { CategoryObj } from '@/api/product/attr/type'

export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}
//定义全部接口返回数据都有的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string
}
//定义用户信息返回数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    button: string[]
    roles: string[]
    name: string
    avatar: string
    buttons: string[]
  }
}

//定义分类仓库state对象的ts类型
export interface CategoryState {
  c1Id: string | number
  c1Arr: CategoryObj[]
  c2Arr: CategoryObj[]
  c2Id: string | number
  c3Arr: CategoryObj[]
  c3Id: string | number
}
