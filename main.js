class Todos {
  constructor(arrInMemory, arrInLocalS) {
    this.arrInMemory = arrInMemory
    this.arrInLocalS = arrInLocalS
  }
  find(id) {
    let res = {}
    this.arrInMemory.forEach(t => {
      if (t.id == id) res = t
    })
    return res
  }
  _add(todo) {
    this.arrInMemory.push(todo)
  }
  _delete(todo) {
    this.arrInMemory = this.arrInMemory.filter(t => {
      return t.id !== todo.id
    })
  }
  _update(todo) {
    this.arrInMemory = this.arrInMemory.map(t => {
      if (t.id === todo.id) {
        t.taks = todo.taks
        t.completed = todo.completed
      }
      return t
    })
  }
  _deleteAll() {
    this.arrInMemory = []
  }

  op(func, todo) {
    this[`_${func}`](todo)
    this.arrInLocalS = JSON.stringify(this.arrInMemory)
  }
}

class Todo {
  constructor(task) {
    this.id = Date.now()
    this.task = task
    this.completed = false
  }
}

let todosData

// let todoObj = new Todo('walk the dog')
// let todoArrObj = new Todos([], '[]')
// todoArrObj.op('add', todoObj)
window.addEventListener('load', () => {
  //localStorage.removeItem('myTodos')// to reset the data
  if (!localStorage.getItem('myTodos')) localStorage.setItem('myTodos', '[]')
  console.log(localStorage.getItem('myTodos'))
  let todosArrText = localStorage.getItem('myTodos')
  let todosArrObj = JSON.parse(todosArrText)
  todosData = new Todos(todosArrObj, todosArrText)
})
