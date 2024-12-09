import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import { User } from '@/app/api/types'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

export const formatDate = (date: string) => {
  return dayjs(date).tz(dayjs.tz.guess()).format('YYYY-MM-DD HH:mm:ss')
}

export const isAdmin = (user: User) => {
  return user.phone === '13571898817'
}
