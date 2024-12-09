import {
  LoginParams,
  User,
  RegisterParams,
  LoginResponse,
  AddNoticeParams,
  Notice,
  AddResearchParams,
  Research,
  AddTaskParams,
  Task,
  AddReportParams,
  Report,
  IFile
} from './types'
import request, { BaseResponse, BaseURL } from './request'
import { toast } from 'react-toastify'

export default {
  login: async (params: LoginParams) => request
    .post('api/auth/login', { json: params })
    .json<BaseResponse<LoginResponse>>(),
  register: async (params: RegisterParams) => request
    .post('api/auth/register', { json: params })
    .json<BaseResponse<User>>(),
  updateUserPassword: async (password: string) => request
    .put(`api/user/password`, { json: { password } })
    .json<BaseResponse>(),
  updateUserAvatar: async (avatar: string) => request
    .put(`api/user/avatar`, { json: { avatar } })
    .json<BaseResponse<User>>(),
  updateUserName: async (name: string) => request
    .put(`api/user/name`, { json: { name } })
    .json<BaseResponse<User>>(),
  updateUserEducation: async (education: string) => request
    .put(`api/user/education`, { json: { education } })
    .json<BaseResponse<User>>(),
  updateUserYear: async (year: number) => request
    .put(`api/user/year`, { json: { year } })
    .json<BaseResponse<User>>(),
  updateUserStudentId: async (studentId: string) => request
    .put(`api/user/student_id`, { json: { studentId } })
    .json<BaseResponse<User>>(),
  getUserInfo: async () => request
    .get(`api/user/info`)
    .json<BaseResponse<User>>(),
  addNotice: async (params: AddNoticeParams) => request
    .post('api/notice/add', { json: params })
    .json<BaseResponse>(),
  getNotices: async () => request
    .get('api/notice/list')
    .json<BaseResponse<Notice[]>>(),
  addResearch: async (params: AddResearchParams) => request
    .post('api/research/add', { json: params })
    .json<BaseResponse>(),
  getResearches: async () => request
    .get('api/research/list')
    .json<BaseResponse<Research[]>>(),
  addTask: async (params: AddTaskParams) => request
    .post('api/task/add', { json: params })
    .json<BaseResponse>(),
  getTasks: async () => request
    .get('api/task/list')
    .json<BaseResponse<Task[]>>(),
  getReports: async () => request
    .get('api/report/list')
    .json<BaseResponse<Report[]>>(),
  addReport: async (params: AddReportParams) => request
    .post('api/report/add', { json: params })
    .json<BaseResponse>(),
  getMembers: async () => request
    .get('api/user/list')
    .json<BaseResponse<User[]>>(),
  getNoticeById: async (id: number) => request
    .get(`api/notice/${id}`)
    .json<BaseResponse<Notice>>(),
  getResearchById: async (id: number) => request
    .get(`api/research/${id}`)
    .json<BaseResponse<Research>>(),
  getTaskById: async (id: number) => request
    .get(`api/task/${id}`)
    .json<BaseResponse<Task>>(),
  uploadFile: async (category: string, file: File, desc?: string) => {
    const formData = new FormData()
    formData.append('file', file)
    // @ts-ignore
    const headers = new Headers(formData.headers);
    headers.append('Authorization', typeof localStorage !== 'undefined' ? `Bearer ${localStorage.getItem('token')}` : '');
    return fetch(`${BaseURL}/api/upload?category=${category}&desc=${desc}`, {
      method: 'POST',
      body: formData,
      headers
    })
  },
  downloadFile: async (fileId: string) => {
    try {
      const response = await fetch(`${BaseURL}/api/file/${fileId}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response
    } catch (error) {
      toast.error('下载失败')
    }
  },
  getFileList: async (category: string) => request
    .get(`api/file/list?category=${category}`)
    .json<BaseResponse<IFile[]>>(),
  deleteFile: async (fileId: string) => request
    .delete(`api/file/${fileId}`)
    .json<BaseResponse>(),
  getReportById: async (id: number) => request
    .get(`api/report/${id}`)
    .json<BaseResponse<Report>>(),
  deleteReport: async (id: number) => request
    .delete(`api/report/${id}`)
    .json<BaseResponse>(),
  editReport: async (report: Report) => request
    .put(`api/report/${report.id}`, { json: report })
    .json<BaseResponse>(),
  deleteNotice: async (id: number) => request
    .delete(`api/notice/${id}`)
    .json<BaseResponse>(),
  deleteTask: async (id: number) => request
    .delete(`api/task/${id}`)
    .json<BaseResponse>(),
  deleteResearch: async (id: number) => request
    .delete(`api/research/${id}`)
    .json<BaseResponse>(),
}
