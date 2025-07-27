import request from "@/utils/request";

// 用户登录
export const userLogin = (params: any) => {
  return request.post({ url: "/fr/auth/login", params });
};

// 获取验证码
export const getVerificationCode = (params: any) => {
  return request.get({ url: "/fr/auth/getVerificationCode", params });
};

// 获取用户信息
export const getUserInfo = (params: any) => {
  return request.get({ url: "/fr/user/me", params });
};

// 更新用户信息
export const updateUserInfo = (params: any) => {
  return request.post({ url: "/fr/user/update", params });
};

// 更新用户密码
export const updateUserPwd = (params: any) => {
  return request.post({ url: "/fr/user/updatePwd", params });
};
