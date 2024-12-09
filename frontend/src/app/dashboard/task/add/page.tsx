"use client"

import { IoSendSharp } from "react-icons/io5";
import { Input, Select, Textarea } from '@headlessui/react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import commonApi from '@/app/api'
import { useRouter } from 'next/navigation'

const AddTaskForm = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [status, setStatus] = useState('In Progress')

  const router = useRouter()

  const handleSubmit = async () => {
    if (!title || !status) {
      toast.error('请填写完整')
      return
    }

    const {success, message} = await commonApi.addTask({
      title, desc, status
    })

    if (success) {
      toast.success('任务添加成功')
      router.push('/dashboard')
    } else {
      toast.error(message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          新增任务
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
              onChange={e => setTitle(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              描述
            </label>
            <Textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={6}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
            >
              状态
            </label>
            <Select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
            >
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </Select>
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

export default AddTaskForm;
