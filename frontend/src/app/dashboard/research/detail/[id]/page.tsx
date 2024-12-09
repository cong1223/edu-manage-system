'use client'

import React, { useState, useEffect } from 'react'
import { Research } from '@/app/api/types'
import { useParams } from 'next/navigation'
import commonApi from '@/app/api'
import { toast } from 'react-toastify'
import { formatDate, isAdmin } from '@/app/common/utils'
import { motion } from 'framer-motion'
import { FiBox, FiMapPin, FiUser, FiCalendar, FiClock } from 'react-icons/fi'
import { useStore } from '@/app/store'

const ResearchDetails = () => {
  const { user } = useStore()

  const params = useParams<{ id: string }>()

  const [equipment, setEquipment] = useState<Research | null>(null)

  const getResearch = async () => {
    const { data, success } = await commonApi.getResearchById(+params.id)
    if (success) {
      setEquipment(data)
    } else {
      toast.error('请求失败')
    }
  }

  const handleDelete = async (id: number) => {
    const { success } = await commonApi.deleteResearch(id)
    if (success) {
      toast.success('删除成功', {
        autoClose: 1000,
        onClose: () => {
          window.location.href = '/dashboard'
        }
      })
    } else {
      toast.error('删除失败')
    }
  }

  useEffect(() => {
    getResearch()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8"
    >
      {
        equipment === null ? (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="border-b pb-6">
                <h1
                  className="text-3xl font-bold text-gray-900 mb-2"
                  aria-label="Research Title"
                >
                  Loading...
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <article className="max-w-3xl mx-auto bg-white overflow-hidden">
              <div className="w-full">
                {
                  equipment.img && (
                    <img
                      className="mx-auto max-h-96 object-contain mt-12"
                      src={equipment.img}
                    />
                  )
                }

                <div className="p-8">
                  <h1
                    className="text-3xl font-bold text-gray-900 mb-6"
                    role="button"
                  >
                    {equipment.name}
                  </h1>

                  <div className="space-y-6">
                    <section className="border-b pb-4">
                      <div
                        className="group"
                      >
                        <div className="text-sm text-gray-500 flex items-center">
                          <FiBox className="mr-2"/>
                          组成部件
                        </div>
                        <div className="mt-1 text-lg font-semibold text-gray-900">
                          {equipment.component}
                        </div>
                      </div>
                    </section>

                    <section className="border-b pb-4">
                      <div
                        className="group"
                      >
                        <div className="text-sm text-gray-500">用途</div>
                        <div className="mt-1 text-lg font-semibold text-gray-900">
                          {equipment.purpose}
                        </div>
                      </div>
                    </section>

                    <section className="border-b pb-4">
                      <div
                        className="group"
                      >
                        <div className="text-sm text-gray-500 flex items-center">
                          <FiMapPin className="mr-2"/>
                          设备所在位置
                        </div>
                        <div className="mt-1 text-lg font-semibold text-gray-900">
                          {equipment.location}
                        </div>
                      </div>
                    </section>

                    <section className="border-b pb-4">
                      <div
                        className="group"
                      >
                        <div className="text-sm text-gray-500 flex items-center">
                          <FiUser className="mr-2"/>
                          保管人
                        </div>
                        <div className="mt-1 text-lg font-semibold text-gray-900">
                          {equipment.keeper}
                        </div>
                      </div>
                    </section>

                    <footer className="pt-4 text-sm text-gray-500">
                      <div className="flex justify-between items-center">
                        <div
                          className="group"
                        >
                          <div className="flex items-center">
                            <FiCalendar className="mr-2"/>
                            创建时间: {formatDate(equipment.createdAt)}
                          </div>
                        </div>

                        <div
                          className="group"
                        >
                          <div className="flex items-center">
                            <FiClock className="mr-2"/>
                            更新时间: {formatDate(equipment.updatedAt)}
                          </div>
                        </div>

                        {isAdmin(user) && (
                          <button
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
                            onClick={() => handleDelete(equipment.id)}
                          >
                            删除设备
                          </button>
                        )}
                      </div>
                    </footer>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )
      }
    </motion.div>
  )
}

export default ResearchDetails
