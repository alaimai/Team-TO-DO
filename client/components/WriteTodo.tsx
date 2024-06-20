import { useCreate } from '../hooks/use-create'
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react'
export function WriteToDo() {
  const [formData, setFormData] = useState('')
  const { mutate: createToDo } = useCreate()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value)
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData && typeof formData === 'string') {
      createToDo(formData)
      setFormData('')
    } else {
      alert('Please type Todo in!')
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="New To Do" className="new-to-do">
      <div>
        {' '}
        <input
          aria-label="to do text"
          className="to-do-text"
          type="text"
          value={formData}
          onChange={handleChange}
          placeholder="What would you like Todo ?"
        />
      </div>
      <div>
        <button className="button-to-do">Create New To Do</button>
      </div>
    </form>
  )
}
