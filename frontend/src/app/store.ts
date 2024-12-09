import { create } from 'zustand/react'
import { User } from '@/app/api/types'

interface StoreState {
  user: User;
}
export const
  useStore = create<StoreState>((set) => ({
    user: {
      id: 0,
      name: '',
      phone: '',
      avatar: '',
      password: '',
      studentId: '',
      education: '',
      year: 0
    },
  }));