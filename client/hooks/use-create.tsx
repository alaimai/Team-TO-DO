import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import request from 'superagent'
const API_HOST = 'https://paataka.cloud/api/_/team-todo'
const TOKEN = 'inboT4cuIWA'

export function useCreate() {
  const queryClient = useQueryClient()
  useMutation({
    mutationFn: async (data) => {
      const res = await request
        .post(`${API_HOST}/todo`)
        .send(data)
        .auth(TOKEN, { type: 'bearer' })
      return res.body
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
