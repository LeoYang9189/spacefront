"use client";

import React, { useEffect, useState } from "react";
import { addToast, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useStore from "@/store/useStore";
import { authLogin, getVerificationCode } from "@/api/common";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaLock,
  FaArrowLeft,
} from "react-icons/fa";
import Link from "next/link";
import { tryCatch } from "@/utils/util";
import Image from "next/image";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    phone: "",
    username: "",
    password: "",
    role: "设计师/设计公司",
    email: "",
    verificationCode: "",
  });
  const [verifyImages, setVerifyImages] = useState("");
  const router = useRouter();
  const { setToken } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const { phone, verificationCode } = formData;
    const [err, res] = await tryCatch(authLogin, {
      phone,
      verificationCode,
      loginType: "verificationCode",
    });
    if (err) {
      addToast({
        description: err.msg,
        color: "warning",
      });
      return;
    }
    setToken(res.token);
    router.push("/");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getVerifyImg = async (openToast = false) => {
    // 验证中国手机号格式
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      openToast &&
        addToast({
          title: "提示",
          description: "请输入 11 位手机号",
          color: "warning",
        });
      return;
    }
    const [err, res] = await tryCatch(getVerificationCode, formData.phone);
    if (err) {
      addToast({
        description: err.msg,
        color: "warning",
      });
      return;
    }
    setVerifyImages(res.verifyImages);
  };

  useEffect(() => {
    getVerifyImg();
  }, [formData.phone]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* 返回首页按钮 */}
      <Link
        href="/"
        className="fixed top-8 left-8 flex items-center text-brand-600 hover:text-brand-700 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        <span>返回首页</span>
      </Link>

      <div className="max-w-md w-full space-y-8">
        {/* 标题部分 */}
        <div>
          <Link href="/" className="block text-center mb-8">
            <h2 className="text-4xl font-bold text-brand-600">ZSPACEPLUS</h2>
          </Link>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-b from-brand-50 to-white">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xl font-medium text-brand-600 hover:text-brand-700 transition-colors"
                >
                  {isLogin ? "用户登录" : "用户注册"}
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* 表单部分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* 登录表单只显示用户名和密码 */}
              {isLogin ? (
                <>
                  {/* 手机号输入框 */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FaPhone />
                    </div>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="请输入手机号"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-colors text-brand-600 placeholder:text-gray-400"
                      required
                    />
                  </div>
                  {/* 图片验证码 */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FaLock />
                    </div>
                    <input
                      type="text"
                      name="verificationCode"
                      value={formData.verificationCode}
                      onChange={handleChange}
                      placeholder="请输入验证码"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-colors text-brand-600 placeholder:text-gray-400"
                      required
                    />
                    {verifyImages && (
                      <Image
                        className="absolute top-[1px] right-[1px] h-[48px]"
                        style={{ borderLeft: "1px solid #e5e7eb" }}
                        src={verifyImages}
                        alt="Verification code"
                        width={120}
                        height={48}
                        onClick={() => getVerifyImg(true)}
                      />
                    )}
                  </div>

                  {/* 密码输入框 */}
                  {/* <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FaLock />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="请输入密码"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-colors text-brand-600 placeholder:text-gray-400"
                      required
                    />
                  </div> */}
                </>
              ) : (
                <>
                  {/* 手机号输入框 */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FaPhone />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="请输入您的手机号码"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-colors text-brand-600 placeholder:text-gray-400"
                      required
                    />
                  </div>

                  {/* 用户名输入框 */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="请输入用户名"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-colors text-brand-600 placeholder:text-gray-400"
                      required
                    />
                  </div>

                  {/* 密码输入框 */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FaLock />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="请输入密码"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-colors text-brand-600 placeholder:text-gray-400"
                      required
                    />
                  </div>

                  {/* 身份选择 */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FaBuilding />
                    </div>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-colors text-brand-600 bg-white appearance-none"
                    >
                      <option value="设计师/设计公司">设计师/设计公司</option>
                      <option value="经销商">经销商</option>
                      <option value="采购商">采购商</option>
                    </select>
                  </div>

                  {/* 邮箱输入框 */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="请输入您的邮箱"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-colors text-brand-600 placeholder:text-gray-400"
                    />
                  </div>
                </>
              )}
            </div>

            {/* 提交按钮 */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-300"
              >
                {isLogin ? "登 录" : "注 册"}
              </button>
            </div>

            {/* 切换注册/登录 */}
            {/* <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-brand-600 hover:text-brand-700 transition-colors"
              >
                {isLogin ? '还没有账号？立即注册' : '已有账号？立即登录'}
              </button>
            </div> */}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
