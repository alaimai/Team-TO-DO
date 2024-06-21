import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
// import { API_HOST, TOKEN } from '../.env'

const API_HOST = 'https://paataka.cloud/api/_/team-todo/'
const TOKEN = 'inboT4cuIWA'

export function useToDos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await request
        .get(`${API_HOST}todo`)
        .query({ orderBy: '_.important', dir: 'desc' })
        .auth(TOKEN, { type: 'bearer' })

      // console.log('api call:', res.body)

      return res.body
    },
  })
}
