'use client'

import Link from 'next/link'
import { useState } from 'react'
import commonApi from '@/app/api'
import { toast } from 'react-toastify'
import { Input } from '@headlessui/react'

export default function Login() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleOk = async () => {
    const { success, message, data } = await commonApi.login({ phone, password })
    if (success) {
      localStorage.setItem('token', data.token)
      toast.success('登录成功', {
        autoClose: 1000,
        onClose: () => window.location.href = '/dashboard'
      })
    } else {
      toast.error('登录失败')
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            登录账号
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="用户名" className="block text-sm/6 font-medium text-gray-900">
                用户名
              </label>
              <div className="mt-2">
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="用户名"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="密码" className="block text-sm/6 font-medium text-gray-900">
                  密码
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    忘记密码?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="密码"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleOk}
              >
                登录
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            没有账号?
            <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              注册
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
