'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { addToast } from '@heroui/react'
import { FaUser, FaPhone, FaEnvelope, FaBuilding } from 'react-icons/fa'
import { saveContactUs } from '@/api/common'
import { tryCatch } from '@/utils/util'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    contactName: '',
    phone: '',
    email: '',
    corporateName: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    const [err, res] = await tryCatch(saveContactUs, formData)
    if (err) {
      addToast({
        description: err.msg || '系统错误，请稍后再试',
        color: 'warning',
      })
      return
    }
    addToast({
      description: '提交成功，我们会尽快与您取得联系',
      color: 'success',
    })
    setFormData({
      contactName: '',
      phone: '',
      email: '',
      corporateName: '',
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 标题部分 */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-brand-600 mb-4"
            >
              联系我们
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-lg"
            >
              留下您的联系方式，我们会尽快与您取得联系
            </motion.p>
          </div>

          {/* 表单部分 */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 姓名输入框 */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="您的姓名"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-colors text-brand-600 placeholder:text-gray-400"
                  required
                />
              </div>

              {/* 电话输入框 */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FaPhone />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="联系电话"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-colors text-brand-600 placeholder:text-gray-400"
                  required
                />
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
                  placeholder="电子邮箱"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-colors text-brand-600 placeholder:text-gray-400"
                />
              </div>

              {/* 公司输入框 */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FaBuilding />
                </div>
                <input
                  type="text"
                  name="corporateName"
                  value={formData.corporateName}
                  onChange={handleChange}
                  placeholder="公司名称"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-colors text-brand-600 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* 提交按钮 */}
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-300"
              >
                提交信息
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
