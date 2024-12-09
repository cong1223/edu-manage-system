export interface LoginParams {
  phone: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterParams {
  name: string;
  password: string;
  phone: string;
  year: number;
  studentId: string;
  education: string;
  avatar?: string;
}

export interface User {
  id: number;
  name: string;
  phone: string;
  avatar?: string;
  password: string;
  year: number;
  studentId: string;
  education: string;
}

export interface AddNoticeParams {
  title: string;
  desc: string;
}

export interface Notice {
  title: string;
  desc: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddTaskParams {
  title: string;
  desc: string;
  status: string;
}

export interface Task {
  title: string;
  desc: string;
  status: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddResearchParams {
  name: string
  component: string
  purpose: string
  location: string
  keeper: string
  img?: string
}

export interface Research {
  id: number
  name: string
  component: string
  purpose: number
  location: string
  keeper: string
  img?: string
  createdAt: string
  updatedAt: string
}

export interface AddReportParams {
  title: string
  thisContent: string
  nextContent: string
  tag: string
}

export interface Report {
  title: string
  thisContent: string
  nextContent: string
  tag: string
  id: number
  createdAt: string
  updatedAt: string
  user: User
}

export interface IFile {
  id: string
  name: string
  size: number
  type: string
  desc?: string
  category: string
  path: string
  createdAt: string
  updatedAt: string
  user: User
}

