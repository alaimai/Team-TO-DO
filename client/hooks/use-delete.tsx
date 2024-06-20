import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
const API_HOST = 'https://paataka.cloud/api/_/team-todo'
const TOKEN = 'inboT4cuIWA'

export function useDelete(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      const res = await request
        .delete(`${API_HOST}/todo/${id}`)
        .auth(TOKEN, { type: 'bearer' })
      return res.body
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', id] })
    },
  })
}
