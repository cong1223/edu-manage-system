"use client"

import { FaUpload, FaPhone, FaLock, FaUser, FaGraduationCap, FaCalendarAlt, FaIdCard } from "react-icons/fa";
import { useState, useEffect } from 'react'
import commonApi from '@/app/api'
import { toast } from 'react-toastify'
import { Input, Select } from '@headlessui/react'
import { useStore } from '@/app/store'
import { Avatar } from '@/app/components'
import { number } from 'prop-types'

const PersonalSettings = () => {
  const {user} = useStore()
  const {setState} = useStore

  const [newPassword, setNewPassword] = useState('')
  const [reNewPassword, setReNewPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [newName, setNewName] = useState('')
  const [newStudentId, setNewStudentId] = useState('')
  const [newYear, setNewYear] = useState<number>(0)
  const [newEducation, setNewEducation] = useState('')

  const getYears = () => {
    const years: number[] = []
    for (let i = 2015; i <= new Date().getFullYear() + 10; i++) {
      years.push(i)
    }
    return years
  }

  const getUserInfo = async () => {
    const {data, success, message} = await commonApi.getUserInfo()
    if (success) {
      setState(() => ({user: data}))
    } else {
      toast.error(message)
    }
  }

  const updatePassword = async () => {
    if (newPassword !== reNewPassword) {
      toast.error('两次密码不一致')
      return
    }
    const {success, message} = await commonApi.updateUserPassword(newPassword)
    if (success) {
      toast.success('密码修改成功')
      getUserInfo()
    } else {
      toast.error(message)
    }
  }

  const updateAvatar = async (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        setAvatar(reader.result as string)
        const {success, message} = await commonApi.updateUserAvatar(reader.result as string)
        if (success) {
          toast.success('头像修改成功')
          getUserInfo()
        } else {
          toast.error(message)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const updateName = async () => {
    const {success, message} = await commonApi.updateUserName(newName)
    if (success) {
      toast.success('姓名修改成功')
      getUserInfo()
    } else {
      toast.error(message)
    }
  }

  const updateStudentId = async () => {
    const {success, message} = await commonApi.updateUserStudentId(newStudentId)
    if (success) {
      toast.success('学号修改成功')
      getUserInfo()
    } else {
      toast.error(message)
    }
  }

  const updateYear = async () => {
    if(!newYear) {
      toast.error('请选择入学年份')
      return
    }
    const {success, message} = await commonApi.updateUserYear(newYear)
    if (success) {
      toast.success('入学年份修改成功')
      getUserInfo()
    } else {
      toast.error(message)
    }
  }

  const updateEducation = async () => {
    if(!newEducation) {
      toast.error('请选择教育阶段')
      return
    }
    const {success, message} = await commonApi.updateUserEducation(newEducation)
    if (success) {
      toast.success('教育阶段修改成功')
      getUserInfo()
    } else {
      toast.error(message)
    }
  }

  useEffect(() => {
    const u = sessionStorage.getItem('user')
    if (!u) {
      getUserInfo()
    }
  }, [])

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Change Avatar Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaUser className="mr-2"/> 修改头像
          </h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar src={avatar || user.avatar} size={128}/>
            </div>
            <label
              className="cursor-pointer bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200">
              <FaUpload className="inline mr-2"/>
              上传新头像
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={updateAvatar}
              />
            </label>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaUser className="mr-2"/> 账号(手机号)
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">当前账号(手机号)</label>
            <Input
              value={user.phone}
              disabled
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaLock className="mr-2"/> 修改密码
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">新密码</label>
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="mt-2 flex space-x-1">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-full rounded`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">确认新密码</label>
              <Input
                value={reNewPassword}
                onChange={(e) => setReNewPassword(e.target.value)}
                type="password"
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              onClick={updatePassword}
            >
              更新密码
            </button>
          </div>
        </div>

        {/* Change Name Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaUser className="mr-2"/> 修改姓名
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">当前姓名</label>
              <Input
                value={user.name}
                disabled
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">新姓名</label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              onClick={updateName}
            >
              更新姓名
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaIdCard className="mr-2"/> 修改学号
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">当前学号</label>
              <Input
                value={user.studentId}
                disabled
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">新学号</label>
              <Input
                value={newStudentId}
                onChange={(e) => setNewStudentId(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              onClick={updateStudentId}
            >
              更新学号
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaGraduationCap className="mr-2"/> 修改教育阶段
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">当前教育阶段</label>
              <Input
                value={user.education}
                disabled
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">新教育阶段</label>
              <Select
                value={newEducation}
                onChange={e => setNewEducation(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>请选择</option>
                <option value="本科">本科</option>
                <option value="硕士">硕士</option>
                <option value="博士">博士</option>
              </Select>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              onClick={updateEducation}
            >
              更新教育阶段
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaCalendarAlt className="mr-2"/> 修改入学年份
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">当前入学年份</label>
              <Input
                value={user.year}
                disabled
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">新入学年份</label>
              <Select
                value={newYear}
                onChange={e => setNewYear(Number(e.target.value))}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0} disabled>请选择</option>
                {
                  getYears().map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))
                }
              </Select>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              onClick={updateYear}
            >
              更新入学年份
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalSettings;
