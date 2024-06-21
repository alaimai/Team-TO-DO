import { ChangeEvent, FormEvent, useState } from 'react'
import { useToDos } from '../hooks/use-todos'
import { useQuery } from '@tanstack/react-query'
import { useCreateToDo } from '../hooks/use-todos'

export default function TestComponent() {
  const [toDo, setToDo] = useState('')

  const newToDo = useCreateToDo()

  function handleChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    const { value, name } = evt.currentTarget
    console.log('this is the current text', name, ';', value)
    setToDo(value)
  }

  function submit() {
    // console.log('todo:', toDo)
    newToDo.mutate(toDo)
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    submit()
  }

  const todos = useToDos()
  // console.log(todos)

  function handleDelete(e) {
    console.log(e.target.id)
  }

  if (todos.isPending) {
    return <p>Loading...</p>
  }

  return (
    <>
      <ul>
        {todos.data.items.map((element) => (
          <div key={element.id} className="item">
            <li key={element.id}>
              {element.name}
              <button id={element.id} onClick={handleDelete}>
                🗑️
              </button>
            </li>
          </div>
        ))}
      </ul>
      <form>
        <textarea name="text" value={toDo} onChange={handleChange}></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  )
}
