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
      update: {
        important: !todo.important,
      },
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
    return <div>Something is Wrong!</div>
  }
  if (!data || !data.items) {
    return <div>no todo list</div>
  }
  return (
    <div>
      <ul>
        {data.items.map((todo: ToDo) => (
          <li
            className={`todo-li ${todo.important ? 'important' : ''}`}
            key={todo.id}
          >
            {todo.name}
            <div className="button-container">
              <button
                className={`button ${todo.important ? 'important-button' : ''}`}
                onClick={() => handleClickIm(todo)}
                aria-label={`Mark as ${
                  todo.important ? 'not important' : 'important'
                }`}
              >
                {todo.important ? '❗️' : '❓'}
              </button>
              <button
                className="button"
                onClick={() => handleClickDone(todo)}
                aria-label={`Mark as ${todo.done ? 'not done' : 'done'}`}
              >
                {todo.done ? '✅' : '❌'}
              </button>
              <button className="button" onClick={() => deleteTodo(todo.id)}>
                🗑️
              </button>
            </div>
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
          </li>
        ))}
      </ul>
    </div>
  )
}
