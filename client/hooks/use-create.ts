import { useQueryClient, useMutation } from '@tanstack/react-query'
import request from 'superagent'
const API_HOST = 'https://paataka.cloud/api/_/team-todo'
const TOKEN = 'inboT4cuIWA'

export function useCreate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: string) => {
      const now = new Date()
      const formData = {
        name: data,

        important: false,
        done: false,
        created_on: now.toLocaleDateString(),
      }
      const res = await request
        .post(`${API_HOST}/todo`)
        .send(formData)
        .auth(TOKEN, { type: 'bearer' })
      return res.body
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
