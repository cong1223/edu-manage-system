'use client'

import React, { useState, useEffect } from 'react'
import { FiDownload, FiFile, FiTrash2 } from 'react-icons/fi'
import { useStore } from '@/app/store'
import Link from 'next/link'
import { IoMdAdd } from 'react-icons/io'
import commonApi from '@/app/api'
import { IFile } from '@/app/api/types'
import { toast } from 'react-toastify'
import { isAdmin } from '@/app/common/utils'

const Document = () => {
  const { user } = useStore()

  const [files, setFiles] = useState<IFile[]>([])

  const handleDownload = async (fileId: string) => {
    const response = await commonApi.downloadFile(fileId)
    if (response) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition ? contentDisposition.split('filename=')[1].replace(/"/g, '') : 'downloaded_file';
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  const handleDelete = async (fileId: string) => {
    const {success} = await commonApi.deleteFile(fileId)
    if (success) {
      toast.success('删除成功')
      getFiles()
    } else {
      toast.error('删除失败')
    }
  }

  const getFiles = async () => {
    const {success, data} = await commonApi.getFileList('doc')
    setFiles(success ? data : [])
  }


  useEffect(() => {
    getFiles()
  }, [])

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Files</h1>
          <Link href="/dashboard/upload?category=doc">
            <button
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              <IoMdAdd className="text-lg"/>
              <span>上传文件</span>
            </button>
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {
            files.length ? (
              <ul className="divide-y divide-gray-200">
                {files.map((file) => (
                  <li
                    key={file.id}
                    className="p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex-shrink-0">
                          <FiFile className="h-6 w-6 text-gray-400"/>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">{file.size} KB</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleDownload(file.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
                        >
                          <FiDownload className="h-4 w-4"/>
                        </button>
                        {
                          isAdmin(user) && (
                            <button
                              onClick={() => handleDelete(file.id)}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
                              aria-label={`Delete ${file.name}`}
                            >
                              <FiTrash2 className="h-4 w-4"/>
                            </button>
                          )
                        }
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : <p className="text-gray-500 text-center py-6">暂无数据</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Document
