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
const addBtn = document.querySelector('#add')
const ul = document.querySelector('ul')

const lihtml = todo => {
  //receives a todo object and return a HTML li elemnt
  let li = document.createElement('li')
  li.className = `animate__animated animate__backInRight`
  li.innerHTML = `
<div class="completed">
  <div class="toggle-custom">
    <input type="checkbox" id="" />
    <label for=""></label>
  </div>
</div>
<div  contenteditable="true">walk the dog</div>
<div>
  <div>
    <span class="final">
      <svg
        class="svgicon icheck"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 80 80"
        xml:space="preserve"
      >
        <circle
          transform="rotate(-90 40 40)"
          class="another-circle"
          cx="40"
          cy="40"
          r="37"
        />

        <foreignObject x="0" y="0" width="100%" height="100%">
          <div
            class="divicon"
            style="
              width: inherit;
              height: 80px;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <i class="material-icons" style="font-size: 48px;"
              >check</i
            >
          </div>
        </foreignObject>
      </svg>
    </span>
  </div>
  <div>
    <span class="final">
      <svg
        class="svgicon idelete"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 80 80"
        xml:space="preserve"
      >
        <circle
          transform="rotate(-90 40 40)"
          class="another-circle"
          cx="40"
          cy="40"
          r="37"
        />

        <foreignObject x="0" y="0" width="100%" height="100%">
          <div
            class="divicon"
            style="
              width: inherit;
              height: 80px;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <i class="material-icons" style="font-size: 48px;"
              >delete</i
            >
          </div>
        </foreignObject>
      </svg>
    </span>
  </div>
</div>
`
  li.children[0].children[0].children[0].setAttribute('id', `toggle-${todo.id}`)
  li.children[0].children[0].children[1].setAttribute('for', `toggle-${todo.id}`)
  return li
}

window.addEventListener('load', () => {
  //localStorage.removeItem('myTodos')// to reset the data
  if (!localStorage.getItem('myTodos')) localStorage.setItem('myTodos', '[]')
  console.log(localStorage.getItem('myTodos'))
  let todosArrText = localStorage.getItem('myTodos')
  let todosArrObj = JSON.parse(todosArrText)
  todosData = new Todos(todosArrObj, todosArrText)
})
