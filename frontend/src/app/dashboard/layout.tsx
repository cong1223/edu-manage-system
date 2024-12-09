"use client"

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import cls from 'classnames'
import { useState, useEffect, Suspense } from 'react'
import { useStore } from '@/app/store'
import { toast } from 'react-toastify'
import commonApi from '@/app/api'
import { Avatar } from '@/app/components'


export default function Layout({ children }: { children: React.ReactNode }) {

  const [active, setActive] = useState("/dashboard")

  const {user} = useStore()
  const {setState} = useStore

  const getUserInfo = async () => {
    const {data, success, message} = await commonApi.getUserInfo()
    if (success) {
      setState(() => ({user: data}))
      sessionStorage.setItem('user', JSON.stringify(data))
    } else {
      toast.error(message)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActive(window.location.pathname)
    }
    getUserInfo()
  }, [])

  return (
    <Suspense>
      <Disclosure as="nav" className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                <Link
                  href="/dashboard"
                  className={cls("inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700", {
                    "!border-indigo-500 text-gray-900": active === "/dashboard",
                  })}
                  onClick={() => setActive("/dashboard")}
                >
                  网站首页
                </Link>
                <Link
                  href="/dashboard/report"
                  className={cls("inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700", {
                    "!border-indigo-500 text-gray-900": active.startsWith("/dashboard/work"),
                  })}
                  onClick={() => setActive("/dashboard/report")}
                >
                  每周工作情况
                </Link>
                <Link
                  href="/dashboard/cooperation"
                  className={cls("inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700", {
                    "!border-indigo-500 text-gray-900": active === "/dashboard/cooperation",
                  })}
                  onClick={() => setActive("/dashboard/cooperation")}
                >
                  共同工作
                </Link>
                <Link
                  href="/dashboard/doc"
                  className={cls("inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700", {
                    "!border-indigo-500 text-gray-900": active === "/dashboard/doc",
                  })}
                  onClick={() => setActive("/dashboard/doc")}
                >
                  共享文献
                </Link>
                <Link
                  href="/dashboard/download"
                  className={cls("inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700", {
                    "!border-indigo-500 text-gray-900": active === "/dashboard/download",
                  })}
                  onClick={() => setActive("/dashboard/download")}
                >
                  下载
                </Link>
                <Link
                  href="/dashboard/user"
                  className={cls("inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700", {
                    "!border-indigo-500 text-gray-900": active === "/dashboard/user",
                  })}
                  onClick={() => setActive("/dashboard/user")}
                >
                  个人系统
                </Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Avatar src={user?.avatar} size={24} />
                    <span className="text-sm font-semibold text-gray-900 ml-2">{user.name}</span>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link
                      href="/dashboard/user"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      个人系统
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <div
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem('token')
                        window.location.replace('/')
                      }}
                    >
                      退出登录
                    </div>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 pb-4 pt-2">
            <DisclosureButton
              as="a"
              href="/dashboard"
              className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
            >
              网站首页
            </DisclosureButton>
            <DisclosureButton
              as="a"
              href="/dashboard/report"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            >
              每周工作情况
            </DisclosureButton>
            <DisclosureButton
              as="a"
              href="/dashboard/cooperation"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            >
              共同工作
            </DisclosureButton>
            <DisclosureButton
              as="a"
              href="/dashboard/doc"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            >
              共享文献
            </DisclosureButton>
            <DisclosureButton
              as="a"
              href="/dashboard/download"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            >
              下载
            </DisclosureButton>
            <DisclosureButton
              as="a"
              href="/dashboard/user"
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            >
              个人系统
            </DisclosureButton>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <main>{children}</main>
    </Suspense>
  )
}
