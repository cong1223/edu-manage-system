'use client'

import React, { useState, useRef } from 'react'
import { FiUpload, FiX } from 'react-icons/fi'
import { CgSpinner } from 'react-icons/cg'
import { Textarea } from '@headlessui/react'
import { useSearchParams, useRouter } from 'next/navigation'
import commonApi from '@/app/api'
import { toast } from 'react-toastify'

const FileUploadForm = () => {
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  const maxSize = 500 * 1024 * 1024 // 500MB

  const router = useRouter()

  const handleDragEnter = (e: any) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: any) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const validateFile = (file: any) => {
    if (file.size > maxSize) {
      setError('文件超过 500MB 限制.')
      return false
    }
    const allowedExtensions = /(\.pdf|\.doc|\.docx|\.xls|\.xlsx)$/i;
    if (!allowedExtensions.exec(file.name)) {
      setError('请上传有效的文件类型 (PDF, Word, Excel)。')
      return false
    }
    return true
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile)
      setError('')
    }
  }

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile)
      setError('')
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!file) {
      setError('请选择文件.')
      return
    }
    setIsLoading(true)

    try {
      const res = await commonApi.uploadFile(category || 'doc', file)
      setIsLoading(false)
      if (res.status === 200) {
        toast.success('Upload successful!')
        router.push(`/dashboard/${category}`)
      } else {
        toast.error('上传失败，请重试。')
      }
    } catch (error) {
      setError('上传失败，请重试。')
      setIsLoading(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">上传文件</h1>

        <div className="space-y-6">
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'
            } ${error ? 'border-red-500' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            role="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept=".pdf, .doc, .docx, .xls, .xlsx"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="text-center">
              <FiUpload className="mx-auto h-12 w-12 text-gray-400"/>
              <p className="mt-2 text-gray-600">
                拖放您的文件到这里，或单击以选择
              </p>
              <p className="text-sm text-gray-500 mt-1">
                支持的格式: pdf，word，excel (max 500MB)
              </p>
            </div>

            {file && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                {/* @ts-ignore */}
                <span className="text-sm text-gray-600 truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile()
                  }}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  aria-label="Remove file"
                >
                  <FiX className="h-5 w-5"/>
                </button>
              </div>
            )}
          </div>

          {error && (
            <p
              className="text-red-500 text-sm mt-2"
              role="alert"
              aria-live="polite"
            >
              {error}
            </p>
          )}

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              描述
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              rows={3}
            />
          </div>

          <div className="flex justify-end">
            <button
              disabled={isLoading}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              onClick={handleSubmit}
            >
              {isLoading ? (
                <>
                  <CgSpinner className="animate-spin h-5 w-5 mr-2"/>
                  上传中...
                </>
              ) : (
                <>确认上传</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUploadForm
