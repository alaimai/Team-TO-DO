//imports
import { ChangeEvent, FormEvent, useState } from 'react'
import { useCreateToDo } from '../hooks/use-todos.tsx'
import { useToDos } from '../hooks/use-todos.tsx'
// import { useDelete } from '../hooks/use-delete.ts'
// import { ToDo } from '../../models/todo.ts'

export default function WriteToDo() {
  const createToDo = useCreateToDo()
  const [toDo, setToDo] = useState('')
  // const deleteToDo = useDelete()
  const { data: todos, isLoading, isError } = useToDos()

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (toDo.trim() !== '') {
      createToDo.mutate(toDo)
      setToDo('')
    }
  }
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setToDo(evt.target.value)
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>There was an Error loading your To Dos...</div>

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        aria-label="New To Do"
        className="new-to-do"
      >
        <div>
          <input
            name="name"
            onChange={handleChange}
            value={toDo}
            placeholder="What would you like to do?"
            className="to-do-text"
          ></input>
        </div>
        <div>
          <button type="submit" className="button-to-do">
            Create New To Do
          </button>
        </div>
      </form>
    </div>
  )
}
