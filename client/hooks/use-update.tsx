import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import request from 'superagent'
const API_HOST = 'https://paataka.cloud/api/_/team-todo'
const TOKEN = 'inboT4cuIWA'

export function useUpdate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, update }) => {
      const res = await request
        .patch(`${API_HOST}/todo/${id}`)
        .send(update)
        .auth(TOKEN, { type: 'bearer' })
      return res.body
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
