import { useToDos } from '../hooks/use-todos'

export function ToDoList() {
  const { data, isLoading, isError } = useToDos()
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
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  )
}
