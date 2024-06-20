import { useToDos } from '../hooks/use-todos'
import { useDelete } from '../hooks/use-delete'
import { useUpDate } from '../hooks/use-update'
export function ToDoList() {
  const { data, isLoading, isError } = useToDos()
  const deletetodo = useDelete()
  const update = useUpDate()
  console.log(data)
  if (isLoading) {
    return <div>Loading</div>
  }
  if (isError) {
    return <div>something wrong</div>
  }
  if (!data || !data.items) {
    return <div>no todo list</div>
  }
  return (
    <div>
      <ul>
        {data.items.map((todo) => (
          <li key={todo.id}>
            {todo.id} - {todo.name}-
            <label>
              important
              <input
                type="checkbox"
                checked={todo.important}
                onChange={(e) => {
                  update.mutate({ id: todo.id, important: e.target.checked })
                }}
              />
            </label>
            <button
              onClick={() => {
                deletetodo.mutate(todo.id)
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
