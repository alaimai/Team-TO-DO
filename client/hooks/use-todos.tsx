import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
// import { API_HOST, TOKEN } from '../../.env'

const API_HOST = 'https://paataka.cloud/api/_/team-todo'
const TOKEN = 'inboT4cuIWA'

export function useToDos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await request
        .get(`${API_HOST}/todo`)
        .auth(TOKEN, { type: 'bearer' })

      // console.log('api call:', res.body)

      return res.body
    },
  })
}

export function useCreateToDo() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (text) => {
      const res = await request
        .post(`${API_HOST}/todo`)
        .auth(TOKEN, { type: 'bearer' })
        .send({ text })

      return res.body
    },

    onSuccess: async () => {
      qc.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
