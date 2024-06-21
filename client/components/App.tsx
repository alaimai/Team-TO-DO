import '../main.css'
import { TodoList } from './ToDoList'
import WriteToDo from './WriteTodo'

function App() {
  return (
    <div>
      <h1 className="page-title">To Do List</h1>
      <div className="todo-container">
        <div>
          <TodoList />
        </div>
        <ul className="todo-list">
          <div>
            <WriteToDo />
          </div>
        </ul>
      </div>
    </div>
  )
}

export default App
