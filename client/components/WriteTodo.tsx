import { useCreate } from '../hooks/use-create'
import { ChangeEvent, FormEvent, useState } from 'react'
export function WriteToDo() {
  const defaultValue = 'What would you like Todo ?'
  const [formData, setFormData] = useState(defaultValue)
  const { mutate: createToDo } = useCreate()
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(e.target.value)
  }
  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData && typeof formData === 'string' && formData !== defaultValue) {
      createToDo(formData)
      setFormData('')
    } else {
      alert('Please type Todo in!')
    }
  }
  const handleClickClear = () => {
    if (formData === defaultValue) {
      setFormData('')
    }
  }
  return (
    <form>
      <input
        type="text"
        value={formData}
        onChange={handleChange}
        onClick={handleClickClear}
      />
      <button onClick={handleClick}>submit</button>
    </form>
  )
}
