import { useQueryClient, useMutation } from '@tanstack/react-query'
import request from 'superagent'
import { ToDo } from '../../models/todo.ts'

const API_HOST = 'https://paataka.cloud/api/_/team-todo'
const TOKEN = 'inboT4cuIWA'

interface UpdateToDoParams {
  id: number
  update: Partial<ToDo>
}

export function useUpdate() {
  const queryClient = useQueryClient()
  return useMutation<ToDo, Error, UpdateToDoParams>({
    mutationFn: async ({ id, update }: UpdateToDoParams) => {
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
