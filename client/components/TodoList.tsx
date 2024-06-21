import { useToDos } from '../hooks/use-todos'
import { useDelete } from '../hooks/use-delete'
import { useUpdate } from '../hooks/use-update'
import { ToDo } from '../../models/todo'

export function TodoList() {
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
              <span data-id={todo.id} onClick={() => handleClickIm(todo)}>
                ❗️
              </span>
            )}
            {!todo.important && (
              <span data-id={todo.id} onClick={() => handleClickIm(todo)}>
                ❓
              </span>
            )}
            {todo.done && <span onClick={() => handleClickDone(todo)}>✅</span>}
            {!todo.done && (
              <span onClick={() => handleClickDone(todo)}>❌</span>
            )}
            {/* <label>
              important
              <input
                type="checkbox"
                checked={todo.important}
                onChange={(e) => {
                  updateTodo({
                    id: todo.id,
                    data: { important: e.target.checked },
                  })
                }}
              />
            </label> */}
            {/* <label>
              Done
              <input
                type="checkbox"
                checked={todo.done}
                onChange={(e) => {
                  updateTodo({
                    id: todo.id,
                    data: { done: e.target.checked },
                  })
                }}
              />
            </label> */}
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
