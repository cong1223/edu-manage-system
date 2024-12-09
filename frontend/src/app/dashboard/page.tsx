'use client'

import React, { useState, useEffect } from 'react'
import { FaBell, FaTasks, FaUsers, FaMicroscope, FaChevronRight } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io'
import Link from 'next/link'
import commonApi from '@/app/api'
import { toast } from 'react-toastify'
import { Task, Notice, Research, User } from '@/app/api/types'
import { formatDate, isAdmin } from '@/app/common/utils'
import { useStore } from '@/app/store'
import { useRouter } from 'next/navigation'


const DashboardHome = () => {
  const router = useRouter()
  const {user} = useStore()

  const [notifications, setNotifications] = useState<Notice[]>([])

  const [tasks, setTasks] = useState<Task[]>([])

  const [members, setMembers] = useState<{ '博士': User[]; '硕士': User[]; '本科': User[] }>({
    '博士': [],
    '硕士': [],
    '本科': []
  })

  const [researches, setResearches] = useState<Research[]>([])

  const getTasks = async () => {
    const { data, success } = await commonApi.getTasks()

    if (success) {
      setTasks(data)
    } else {
      toast.error(
        'Failed to get tasks. Please try again later.'
      )
    }
  }

  const getNotifications = async () => {
    const { data, success } = await commonApi.getNotices()

    if (success) {
      setNotifications(data)
    } else {
      toast.error(
        'Failed to get notifications. Please try again later.'
      )
    }
  }

  const getResearch = async () => {
    const { data, success } = await commonApi.getResearches()

    if (success) {
      setResearches(data)
    } else {
      toast.error(
        'Failed to get research. Please try again later.'
      )
    }
  }

  const getMembers = async () => {
    const { data, success } = await commonApi.getMembers()

    if (success) {
      const groupedMembers: { '博士': User[]; '硕士': User[]; '本科': User[] } = {
        '博士': [],
        '硕士': [],
        '本科': []
      }
      data.filter((member) => member.name !== 'admin').forEach((member) => {
        if (member.education === '博士') {
          groupedMembers['博士'].push(member)
        } else if (member.education === '硕士') {
          groupedMembers['硕士'].push(member)
        } else if (member.education === '本科') {
          groupedMembers['本科'].push(member)
        }
      })
      setMembers(groupedMembers)
    } else {
      toast.error(
        'Failed to get members. Please try again later.'
      )
    }
  }

  useEffect(() => {
    getTasks()
    getNotifications()
    getResearch()
    getMembers()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Notifications Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaBell className="text-blue-500 text-xl mr-2"/>
              <h2 className="text-xl font-semibold text-gray-800">通知公告</h2>
            </div>
            {
              isAdmin(user) && <Link href="/dashboard/notice/add">
                <button
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  <IoMdAdd className="text-lg"/>
                  <span>新增通知</span>
                </button>
              </Link>
            }
          </div>
          <ul className="space-y-3" role="list" aria-label="Notifications list">
            {notifications.length > 0 ? notifications.map((notification) => (
              <li
                key={notification.id}
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                role="listitem"
                onClick={() => router.push(`/dashboard/notice/detail/${notification.id}`)}
              >
                <div className="flex-1">
                  <p className="text-gray-700">{notification.title}</p>
                  <span className="text-sm text-gray-500">{formatDate(notification.createdAt)}</span>
                </div>
                <FaChevronRight className="text-gray-400"/>
              </li>
            )) : (
              <p className="text-gray-500 text-center py-6">暂无数据</p>
            )}
          </ul>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaTasks className="text-green-500 text-xl mr-2"/>
              <h2 className="text-xl font-semibold text-gray-800">近期任务</h2>
            </div>
            {
              isAdmin(user) && <Link href="/dashboard/task/add">
                <button
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  <IoMdAdd className="text-lg"/>
                  <span>新增任务</span>
                </button>
              </Link>
            }
          </div>
          <ul className="space-y-3" role="list" aria-label="Tasks list">
            {tasks.length ? tasks.map((task) => (
              <li
                key={task.id}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                role="listitem"
                onClick={() => router.push(`/dashboard/task/detail/${task.id}`)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{task.title}</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${task.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {task.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Date: {formatDate(task.createdAt)}</p>
              </li>
            )) : (
              <p className="text-gray-500 text-center py-6">暂无数据</p>
            )}
          </ul>
        </div>

        {/* Members Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-[1.02]">
          <div className="flex items-center mb-4">
            <FaUsers className="text-purple-500 text-xl mr-2"/>
            <h2 className="text-xl font-semibold text-gray-800">成员</h2>
          </div>
          {
            Object.values(members).reduce((sum, currentArray) => sum + currentArray.length, 0) ? (
              <div className="space-y-4">
                {
                  members['博士'].length > 0 && <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">博士生</h3>
                    <ul className="grid grid-cols-2 gap-2" role="list" aria-label="PhD students list">
                      {members['博士'].map((member) => (
                        <li
                          key={member.id}
                          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          role="listitem"
                        >
                          <p className="text-gray-700 font-medium">{member.name} ({member.year})</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
                {
                  members['硕士'].length > 0 && <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">研究生</h3>
                    <ul className="grid grid-cols-2 gap-2" role="list" aria-label="Master's students list">
                      {members['硕士'].map((member) => (
                        <li
                          key={member.id}
                          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          role="listitem"
                        >
                          <p className="text-gray-700 font-medium">{member.name} ({member.year})</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
                {
                  members['本科'].length > 0 && <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">本科生</h3>
                    <ul className="grid grid-cols-2 gap-2" role="list" aria-label="Master's students list">
                      {members['本科'].map((member) => (
                        <li
                          key={member.id}
                          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          role="listitem"
                        >
                          <p className="text-gray-700 font-medium">{member.name} ({member.year})</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              </div>) : <p className="text-gray-500 text-center py-6">暂无数据</p>
          }
        </div>

        {/* Research Directions Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaMicroscope className="text-red-500 text-xl mr-2"/>
              <h2 className="text-xl font-semibold text-gray-800">仪器设备</h2>
            </div>
            {
              isAdmin(user) && <Link href="/dashboard/research/add">
                <button
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  <IoMdAdd className="text-lg"/>
                  <span>新增设备</span>
                </button>
              </Link>
            }
          </div>
          <ul className="space-y-3" role="list" aria-label="Research directions list">
            {researches.length ? researches.map((item) => (
              <li
                key={item.id}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                role="listitem"
                onClick={() => router.push(`/dashboard/research/detail/${item.id}`)}
              >
                <p className="text-gray-700 font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Equipment: {item.component}</p>
              </li>
            )) : (
              <p className="text-gray-500 text-center py-6">暂无数据</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome
