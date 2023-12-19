// 管理用户的接口
import request from '@/utils/request'

enum API {
  // 登录接口
  LOGIN_URL = '/admin/acl/index/login',
  // 用户信息接口
  USERINFO_URL = '/admin/acl/index/info',
  // 退出登录接口
  LOGOUT_URL = '/admin/acl/index/logout',
}

export const reqLogin = (data: any) =>
  request.post<any, any>(API.LOGIN_URL, data)

export const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL)

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
