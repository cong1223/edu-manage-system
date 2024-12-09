import { FC } from 'react'

interface Props {
  size?: number
  src?: string
}

const Avatar: FC<Props> = ({size, src}) => {
  return src ? <img
    src={src}
    alt="User avatar"
    className="rounded-full object-cover"
    style={{width: size, height: size}}
  />:<div className="bg-gray-300 rounded-full" style={{width: size, height: size}} />
}
export default Avatar