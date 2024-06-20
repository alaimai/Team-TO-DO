import { useToDos } from '../hooks/use-todos'
import { useDelete } from '../hooks/use-delete'
import { useUpdate } from '../hooks/use-update'
import { ToDo } from '../../models/todo'

export function TodoList() {
  const { data, isLoading, isError } = useToDos()
  const { mutate: deleteTodo } = useDelete()
  const { mutate: updateTodo } = useUpdate()
  const handleClickIm = (e: React.MouseEvent<HTMLSpanElement>) => {
    updateTodo({
      id: (e.currentTarget as HTMLElement).getAttribute('data-id'),
      update: {
        important: !(e.currentTarget.getAttribute('booleanmark') === 'true'),
      },
    })
  }
  const handleClickDone = (e: React.MouseEvent<HTMLSpanElement>) => {
    updateTodo({
      id: (e.currentTarget as HTMLElement).getAttribute('data-id'),
      update: {
        done: !(e.currentTarget.getAttribute('booleanmark') === 'true'),
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
              <span
                data-id={todo.id}
                booleanmark="true"
                onClick={handleClickIm}
              >
                ❗️
              </span>
            )}
            {!todo.important && (
              <span
                data-id={todo.id}
                booleanmark="false"
                onClick={handleClickIm}
              >
                ❓
              </span>
            )}
            {todo.done && (
              <span
                data-id={todo.id}
                booleanmark="true"
                onClick={handleClickDone}
              >
                ✅
              </span>
            )}
            {!todo.done && (
              <span
                data-id={todo.id}
                booleanmark="false"
                onClick={handleClickDone}
              >
                ❌
              </span>
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
