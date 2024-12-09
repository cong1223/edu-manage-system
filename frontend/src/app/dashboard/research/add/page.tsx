"use client"

import { IoSendSharp } from "react-icons/io5";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import commonApi from '@/app/api'
import { Input } from '@headlessui/react'
import { Avatar } from '@/app/components'
import { FaUpload } from 'react-icons/fa'

const AddResearchForm = () => {
  const [name, setName] = useState('')
  const [component, setComponent] = useState('')
  const [purpose, setPurpose] = useState('')
  const [location, setLocation] = useState('')
  const [keeper, setKeeper] = useState('')
  const [img, setImg] = useState('')

  const router = useRouter()

  const onImgChange = async (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        setImg(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!name || !component || !purpose || !location || !keeper) {
      toast.error('请填写完整')
      return
    }

    const {success, message} = await commonApi.addResearch({
      name,
      component,
      purpose,
      location,
      keeper,
      img
    })

    if (success) {
      toast.success('仪器设备添加成功')
      router.push('/dashboard')
    } else {
      toast.error(message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          新增仪器设备
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar src={img} size={128}/>
              </div>
              <label
                className="cursor-pointer bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200">
                <FaUpload className="inline mr-2"/>
                上传设备图片
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={onImgChange}
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
            >
              设备名称
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
            >
              组成部件
            </label>
            <Input
              value={component}
              onChange={(e) => setComponent(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
            >
              用途
            </label>
            <Input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
            >
              设备所在位置
            </label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
            >
              保管人
            </label>
            <Input
              value={keeper}
              onChange={(e) => setKeeper(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-semibold"
            onClick={handleSubmit}
          >
            <span>提交</span>
            <IoSendSharp className="text-lg"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddResearchForm;
