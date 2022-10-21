const newTodoForm = document.querySelector('form.add-todo')
const todoList = document.getElementById("myUL")
let todos = []

// Attribute Enums
const TODO_INDEX = 'todo-index'

// Helper functions
const saveTodosToStorage = (todos) => localStorage.setItem('todos', JSON.stringify(todos))

const getTodosFromStorage = () => JSON.parse(localStorage.getItem('todos') ?? '[]')

const getNewTodoIndex = () => todoList.childNodes.length

function generateCloseButton() {
  const button = document.createElement("Button");
  const txt = document.createTextNode("\u00D7");
  button.className = "close";
  button.appendChild(txt);
  button.setAttribute('type', 'button')
  return button
}

function generateTodoElement({ value, checked }) {
  var todoElement = document.createElement("li");
  var todoText = document.createTextNode(value);
  const todoIndex = getNewTodoIndex()
  const closeButton = generateCloseButton()
  todoElement.appendChild(todoText);
  todoElement.appendChild(closeButton);
  todoElement.setAttribute(TODO_INDEX, todoIndex)
  if (checked) todoElement.classList.add('checked')
  return todoElement
}

function createTodo(payload) {
  const todoElement = generateTodoElement(payload)
  todoList.appendChild(todoElement);
}

// New todo submit Listener
newTodoForm.addEventListener('submit', (e) => {
  e.preventDefault()
  var inputValue = document.getElementById("myInput").value;
  const payload = { value: inputValue, checked: false }
  createTodo(payload)

  // Saving todo to storage
  todos.push(payload)
  saveTodosToStorage(todos)

  newTodoForm.reset()
})

// Global click listeners
document.addEventListener('click', (e) => {
  const el = e.target

  // Todo delete button click to delete a todo
  if (el.type === 'button' && el.parentElement.getAttribute(TODO_INDEX)) {
    // Delete todo
    const todoIndex = parseInt(el.parentElement.getAttribute(TODO_INDEX))
    el.parentElement.remove()
    todos = todos.filter((_, i) => i !== todoIndex)
    saveTodosToStorage(todos)
    return
  }

  // Todo element click to handle check status
  if (el.getAttribute(TODO_INDEX)) {
    // Check status
    const todoIndex = parseInt(el.getAttribute(TODO_INDEX))
    el.classList.toggle('checked')
    if (!todos[todoIndex]) return
    todos[todoIndex].checked = el.classList.contains('checked')
    saveTodosToStorage(todos)
    return
  }
})


// Init todos
function initTodos() {
  try {
    todos = getTodosFromStorage()
  } catch (error) {
    todos = []
  }
  todos.forEach((todo) => todoList.appendChild(generateTodoElement(todo)))
}
initTodos()