'use client'

import { FaUpload, FaUsers } from 'react-icons/fa'
import { IoSendSharp } from 'react-icons/io5'
import { useState } from 'react'
import commonApi from '@/app/api'
import { toast } from 'react-toastify'
import { Input, Select } from '@headlessui/react'


const Register = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [avatar, setAvatar] = useState('')
  const [education, setEducation] = useState('本科')
  const [year, setYear] = useState(new Date().getFullYear())
  const [studentId, setStudentId] = useState('')

  const getYears = () => {
    const years: number[] = []
    for (let i = 2015; i <= new Date().getFullYear() + 10; i++) {
      years.push(i)
    }
    return years
  }


  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleOk = async () => {
    // 密码不能少于6位
    if (password.length < 6) {
      toast.error('密码不能少于6位')
      return
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      toast.error('手机号格式不正确')
      return
    }
    if (!name || !password || !phone || !studentId) {
      toast.error('请填写完整信息')
      return
    }
    const { success, message } = await commonApi.register({ name, password, phone, avatar, education, year, studentId })
    if (success) {
      toast.success('注册成功，请继续登录', {
        onClose: () => window.location.href = '/'
      })
    } else {
      toast.error(message)
    }
  }

  return (
    <div className="overflow-auto w-screen p-6 bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaUsers className="mr-2"/> 注册账号
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {
                  avatar ? <img
                    src={avatar}
                    alt="User avatar"
                    className="w-32 h-32 rounded-full object-cover"
                  /> : <div className="w-32 h-32 rounded-full bg-gray-100"/>
                }
              </div>
              <label
                className="cursor-pointer bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200">
                <FaUpload className="inline mr-2"/>
                头像
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">用户名(手机号)</label>
              <div className="mt-1 relative">
                <Input
                  value={phone}
                  type="tel"
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">密码</label>
              <div className="mt-1 relative">
                <Input
                  value={password}
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">姓名</label>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                type="tel"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">学号</label>
              <Input
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">教育阶段</label>
              <Select
                value={education}
                onChange={e => setEducation(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="本科">本科</option>
                <option value="硕士">硕士</option>
                <option value="博士">博士</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">入学年份</label>
              <Select
                value={year}
                onChange={e => setYear(Number(e.target.value))}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {
                  getYears().map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))
                }
              </Select>
            </div>
          </div>
        </div>
        <button
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-semibold"
          onClick={handleOk}
        >
          <span>提交</span>
          <IoSendSharp className="text-lg"/>
        </button>
      </div>
    </div>
  )

}

export default Register
