export interface ToDo {
  name: string
  id: number
  created_on: number
  important: boolean
  done: boolean
}

export interface List {
  list: ToDo[]
}
