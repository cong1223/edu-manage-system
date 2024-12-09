'use client'

import Link from 'next/link'
import commonApi from '@/app/api'
import './button.css'
import { toast } from 'react-toastify'
import React, { useState, useEffect } from 'react'
import { Report } from '@/app/api/types'
import { formatDate, isAdmin } from '@/app/common/utils'
import { FaTags, FaClock } from 'react-icons/fa'
import { Avatar } from '@/app/components'
import { FiTrash2, FiEdit } from 'react-icons/fi'
import { useStore } from '@/app/store'

const ReportList = () => {
  const { user } = useStore()
  const [reports, setReports] = useState<Report[]>([])

  const getReports = async () => {
    const { data, success } = await commonApi.getReports()
    if (success) {
      setReports(data)
    } else {
      toast.error('获取工作报告失败')
    }
  }

  const handleDelete = async (id: number) => {
    const { success, message } = await commonApi.deleteReport(id)
    if (success) {
      toast.success('删除成功')
      getReports()
    } else {
      toast.error(message)
    }
  }

  useEffect(() => {
    getReports()
  }, [])

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex w-full justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">每周工作情况</h1>
          <Link href="/dashboard/report/add" className="text-white">
            <div className="buttons">
              <button className="btn"><span></span><p data-start="添加工作报告" data-text="start!"
                                                      data-title="添加工作报告"></p></button>
            </div>
          </Link>
        </div>
        {
          reports.length ? reports.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl mb-6"
              role="article"
            >
              <div className="flex items-center justify-between mb-6 border-b pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar src={item.user.avatar} size={48}/>
                  <div>
                    <p className="font-medium text-gray-800">{item.user.name}</p>
                  </div>
                </div>
                {
                  (isAdmin(user) || item.user.id === user?.id) && (
                    <div className="flex items-center space-x-4">
                      <Link href={`/dashboard/report/detail/${item.id}?mode=edit`}>
                        <button
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
                        >
                          <FiEdit className="h-4 w-4"/>
                        </button>
                      </Link>
                      <button
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FiTrash2 className="h-4 w-4"/>
                      </button>
                    </div>
                  )
                }
              </div>

              {
                item.title && <h2 className="text-xl font-semibold text-gray-800 mb-4">{item.title}</h2>
              }

              <div
                className={`transition-all duration-300 block`}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">本周工作</h3>
                    <p className="text-gray-600">{item.thisContent || '暂无内容'}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">下周工作</h3>
                    <p className="text-gray-600">{item.nextContent || '暂无内容'}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tag.split(';').filter(i => !!i.trim()).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm flex items-center"
                    >
                      <FaTags className="mr-1"/>
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <FaClock className="mr-1"/>
                    <span>Created: {formatDate(item.createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-1"/>
                    <span>Updated: {formatDate(item.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-gray-500 text-center py-6">暂无数据</p>
          )
        }
      </div>
    </div>
  )
}

export default ReportList
