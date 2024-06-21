import { useToDos } from '../hooks/use-todos'
import { useDelete } from '../hooks/use-delete'
import { useUpdate } from '../hooks/use-update'
import { ToDo } from '../../models/todo'

export function ToDoList() {
  const { data, isLoading, isError } = useToDos()
  const { mutate: deleteTodo } = useDelete()
  const { mutate: updateTodo } = useUpdate()
  const handleClickIm = (todo: ToDo) => {
    updateTodo({
      id: todo.id,
      update: { important: !todo.important },
    })
  }
  const handleClickDone = (todo: ToDo) => {
    updateTodo({
      id: todo.id,
      update: {
        done: !todo.done,
      },
    })
  }
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
        {data.items.map((todo: ToDo) => (
          <li key={todo.id}>
            {todo.name} -
            {todo.important && (
              <button data-id={todo.id} onClick={() => handleClickIm(todo)}>
                ❗️
              </button>
            )}
            {!todo.important && (
              <button data-id={todo.id} onClick={() => handleClickIm(todo)}>
                ❓
              </button>
            )}
            {todo.done && (
              <button onClick={() => handleClickDone(todo)}>✅</button>
            )}
            {!todo.done && (
              <button onClick={() => handleClickDone(todo)}>❌</button>
            )}
            <button
              onClick={() => {
                deleteTodo(todo.id)
              }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
