import ky from 'ky'

export interface BaseResponse<T = any> {
  status: number
  success: boolean
  message: string
  data: T
}

export const BaseURL = 'http://localhost:8888'

const request = ky.create({
  prefixUrl: BaseURL,
  retry: 2,
  timeout: 100000,
  headers: {
    'content-type': 'application/json',
    'Authorization': typeof localStorage !== 'undefined' ? `Bearer ${localStorage.getItem('token')}` : ''
  },
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        const { status, statusText } = response
        if (status === 401) {
          localStorage.removeItem('token')
          window.location.href = '/'
          return
        }
        const result: BaseResponse = {
          status,
          success: status === 200,
          message: statusText,
          data: {}
        }
        try {
          result.data = await response.json()
          return new Response(JSON.stringify(result))
        } catch (e) {
          return new Response(
            JSON.stringify(result)
          )
        }
      }
    ]
  }
})

export default request
