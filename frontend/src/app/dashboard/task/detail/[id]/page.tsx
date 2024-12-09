'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Task } from '@/app/api/types'
import { formatDate, isAdmin } from '@/app/common/utils'
import commonApi from '@/app/api'
import { toast } from 'react-toastify'
import { FaCheckCircle, FaCalendarAlt, FaClock } from 'react-icons/fa'
import { FiTrash2 } from 'react-icons/fi'
import { useStore } from '@/app/store'

const statusColors = {
  'Completed': 'bg-green-100 text-green-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  'Pending': 'bg-yellow-100 text-yellow-800'
}

const TaskDetail = () => {
  const { user } = useStore()

  const params = useParams<{ id: string }>()

  const [task, setTask] = useState<Task | null>(null)

  const getTask = async () => {
    const { data, success } = await commonApi.getTaskById(+params.id)
    if (success) {
      setTask(data)
    } else {
      toast.error('请求失败')
    }
  }

  const handleDelete = async (id: number) => {
    const { success } = await commonApi.deleteTask(id)
    if (success) {
      toast.success('删除成功', {
        autoClose: 1000,
        onClose: () => window.location.href = '/dashboard'
      })
    } else {
      toast.error('删除失败')
    }
  }

  useEffect(() => {
    getTask()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8"
    >
      {
        task === null ? (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="border-b pb-6">
                <h1
                  className="text-3xl font-bold text-gray-900 mb-2"
                  aria-label="Task Title"
                >
                  Loading...
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
            <div className="px-6 py-8 relative">
              {
                isAdmin(user) && (
                  <button
                    className="absolute right-8 top-8 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
                    onClick={() => handleDelete(task.id)}
                  >
                    <FiTrash2 className="h-4 w-4"/>
                  </button>
                )
              }
              <h1
                className="text-3xl font-bold text-gray-900 mb-6"
              >
                {task.title}
              </h1>

              <div className="space-y-6">
                {
                  task.desc && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-700 mb-2">描述</h2>
                      <p className="text-gray-600 leading-relaxed">
                        {task.desc}
                      </p>
                    </div>
                  )
                }

                <div className="flex items-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.status as keyof typeof statusColors]}`}
                >
                  <FaCheckCircle className="mr-2"/>
                  {task.status}
                </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-gray-400"/>
                    <div>
                      <p className="text-sm text-gray-500">创建时间</p>
                      <p className="text-gray-700">
                        {formatDate(task.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaClock className="text-gray-400"/>
                    <div>
                      <p className="text-sm text-gray-500">更新时间</p>
                      <p className="text-gray-700">
                        {formatDate(task.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </motion.div>
  )
}

export default TaskDetail
