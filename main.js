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
    localStorage.setItem('myTodos', JSON.stringify(this.arrInMemory))
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
const taskName = document.querySelector('#taskname')
let deleteBtns

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
<div  contenteditable="true" class="" >walk the dog</div>
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
          r="36"
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
          r="36"
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
  if (todo.completed) {
    li.children[1].classList.add('stroke__disabled')
    li.children[0].children[0].children[0].checked = true
  }

  li.children[1].addEventListener('keyup', e => {
    e.stopPropagation()
    e.preventDefault()
    if (e.which === 13) {
      e.target.blur()
      e.target.innerText = `${e.target.innerText}`.replace(/\r?\n|\r/g, '').trim()

      updateTaskName(e, todo)
    }
  })
  li.children[1].addEventListener('blur', e => {
    e.stopPropagation()
    updateTaskName(e, todo)
  })

  li.children[2].children[1].children[0].addEventListener('click', e => {
    e.preventDefault()
    e.stopPropagation()
    removeElement(e, todo)
  })

  li.children[0].children[0].addEventListener('change', e => {
    e.stopPropagation()
    markTaskascompleted(e, todo)
  })

  li.children[1].innerText = todo.task

  li.children[0].children[0].children[0].setAttribute('id', `toggle-${todo.id}`)
  li.children[0].children[0].children[1].setAttribute('for', `toggle-${todo.id}`)
  return li
}

const removeElement = (el, todo) => {
  let nodeToRemove
  if (el.target.tagName === 'I') {
    nodeToRemove = el.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
  }
  if (el.target.tagName === 'DIV') {
    nodeToRemove = el.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
  }

  nodeToRemove.parentNode.removeChild(nodeToRemove)
  todosData.op('delete', todo)
}

const updateTaskName = (e, todo) => {
  console.log(e)
  // console.log(e.target.innerText())
  todo.task = e.target.innerText.replace(/\r?\n|\r/g, '')
  console.log(e.target.innerText)
  todosData.op('update', todo)
}
const markTaskascompleted = (e, todo) => {
  let text = e.target.parentNode.parentNode.parentNode.children[1]
  text.classList.toggle('stroke__disabled')
  todo.completed = !todo.completed
  todosData.op('update', todo)
}

const addElement = task => {
  let newTodo = new Todo(task)
  let newLi = lihtml(newTodo)
  todosData.op('add', newTodo)
  ul.appendChild(newLi)
}

window.addEventListener('load', () => {
  //localStorage.removeItem('myTodos')// to reset the data
  if (!localStorage.getItem('myTodos')) localStorage.setItem('myTodos', '[]')
  console.log(localStorage.getItem('myTodos'))
  let todosArrText = localStorage.getItem('myTodos')
  let todosArrObj = JSON.parse(todosArrText)
  todosData = new Todos(todosArrObj, todosArrText)
  let fragment = document.createDocumentFragment()
  todosData.arrInMemory.forEach(todo => {
    let liElement = lihtml(todo)
    fragment.appendChild(liElement)
  })
  ul.appendChild(fragment)
})

const addBtn2 = document.querySelector('#addbtn')
const input = document.querySelector('#taskname')
const okBtn = document.querySelector('#ok')
const cancelBtn = document.querySelector('#cancel')
const divConfirm = document.querySelector('#confirm')

okBtn.addEventListener('click', () => {
  addElement(input.value)
  cancelBtn.click()
})

let disableOKBtn = () => {
  okBtn.children[0].classList.remove('icheck')
  okBtn.children[0].classList.add('idisabled')
}

addBtn2.addEventListener('click', () => {
  divConfirm.style.width = '440px'
  input.style.width = '300px'

  okBtn.style.width = '54px'
  okBtn.style.height = '54px'
  cancelBtn.style.width = '54px'

  cancelBtn.style.visibility = 'visible'
  okBtn.style.visibility = 'visible'
  addBtn2.style.visibility = 'hidden'
  input.focus()
})
cancelBtn.addEventListener('click', () => {
  divConfirm.style.width = '0px'
  input.style.width = '0px'

  cancelBtn.style.width = '0px'
  okBtn.style.width = '0px'
  okBtn.style.height = '0px'

  cancelBtn.style.visibility = 'hidden'
  okBtn.style.visibility = 'hidden'
  addBtn2.style.visibility = 'visible'
  input.value = ''
  disableOKBtn()
})

input.addEventListener('keyup', e => {
  if (input.value.trim().length < 3) {
    disableOKBtn()
  } else {
    okBtn.children[0].classList.remove('idisabled')
    okBtn.children[0].classList.add('icheck')
    if (e.which === 13) {
      okBtn.click()
      input.blur()
    }
  }
})
