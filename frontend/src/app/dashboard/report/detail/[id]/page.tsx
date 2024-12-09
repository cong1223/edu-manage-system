'use client'

import React, { useState, useEffect } from 'react'
import { Report } from '@/app/api/types'
import commonApi from '@/app/api'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Input, Textarea } from '@headlessui/react'
import { IoSendSharp } from 'react-icons/io5'

const ReportDetail = () => {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()

  const mode = searchParams.get('mode')
  const isEdit = mode === 'edit'

  const [report, setReport] = useState<Report | null>(null)

  const getReport = async () => {
    const { data, success } = await commonApi.getReportById(+params.id)
    if (success) {
      setReport(data)
    } else {
      toast.error('请求失败')
    }
  }

  const handleSubmit = async () => {
    if (!report?.title || !report?.thisContent || !report?.nextContent || !report?.tag) {
      toast.error('请填写完整')
      return
    }

    const {success, message} = await commonApi.editReport(report)

    if (success) {
      toast.success('更新工作报告成功')
      router.push('/dashboard/report')
    } else {
      toast.error(message)
    }
  }

  useEffect(() => {
    getReport()
  }, [])


  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          {isEdit ? '更新工作报告' : '工作报告详情'}
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
            >
              标题
            </label>
            <Input
              disabled={!isEdit}
              value={report?.title}
              onChange={(e) => setReport({
                ...(report as Report),
                title: e.target.value
              })}
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
              disabled={!isEdit}
              value={report?.thisContent}
              onChange={(e) => setReport({
                ...(report as Report),
                thisContent: e.target.value
              })}
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
              disabled={!isEdit}
              value={report?.nextContent}
              onChange={(e) => setReport({
                ...(report as Report),
                nextContent: e.target.value
              })}
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
              disabled={!isEdit}
              value={report?.tag}
              onChange={(e) => setReport({
                ...(report as Report),
                tag: e.target.value
              })}
              className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
              placeholder="输入标签，以分号分割"
            />
          </div>

          {
            isEdit && (
              <button
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-semibold"
                onClick={handleSubmit}
              >
                <span>更新报告</span>
                <IoSendSharp className="text-lg"/>
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ReportDetail
