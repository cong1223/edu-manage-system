"use client"

import { IoSendSharp } from "react-icons/io5";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import commonApi from '@/app/api'
import { Input, Textarea } from '@headlessui/react'

const AddReportForm = () => {
  const [title, setTitle] = useState('')
  const [thisContent, setThisContent] = useState('')
  const [nextContent, setNextContent] = useState('')
  const [tag, setTag] = useState('')

  const router = useRouter()

  const handleSubmit = async () => {
    if (!title || !thisContent || !nextContent || !tag) {
      toast.error('请填写完整')
      return
    }

    const {success, message} = await commonApi.addReport({
      title, thisContent, nextContent, tag
    })

    if (success) {
      toast.success('提交工作报告成功')
      router.push('/dashboard/report')
    } else {
      toast.error(message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          提交工作报告
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
            >
              标题
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
            >
              本周工作内容
            </label>
            <Textarea
              value={thisContent}
              onChange={(e) => setThisContent(e.target.value)}
              rows={6}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
            >
              下周工作内容
            </label>
            <Textarea
              value={nextContent}
              onChange={(e) => setNextContent(e.target.value)}
              rows={6}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
            >
              标签
            </label>
            <Input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-semibold"
            onClick={handleSubmit}
          >
            <span>提交报告</span>
            <IoSendSharp className="text-lg"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReportForm;
