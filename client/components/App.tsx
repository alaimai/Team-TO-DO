import '../main.css'
import { TodoList } from './ToDoList'
import WriteToDo from './WriteTodo'

function App() {
  return (
    <div className="app">
      <h1 className="page-title">To Do List</h1>
      <div className="write-todo-container">
        <WriteToDo />
      </div>
      <div className="todo-container">
        <TodoList />
      </div>
    </div>
  )
}

export default App
