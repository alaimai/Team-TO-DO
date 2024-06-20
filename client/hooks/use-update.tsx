import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import request from 'superagent'
const API_HOST = 'https://paataka.cloud/api/_/team-todo'
const TOKEN = 'inboT4cuIWA'

export function useUpDate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ data, id }) => {
      const res = await request
        .patch(`${API_HOST}/todo/${id}`)
        .send({ data })
        .auth(TOKEN, { type: 'bearer' })
      return res.body
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
