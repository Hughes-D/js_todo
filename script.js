// add todos. start here so we can use todos already added to test other functions
// delete todos



const form = document.querySelector("#new-todo-form")
const toDoInput = document.querySelector("#todo-input")
const list = document.querySelector('#list')
const template = document.querySelector('#list-item-template')
const LOCAL_STORAGE_PREFIX = 'ADVANCED_TODO_LIST'
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
let todos = loadTodos()
todos.forEach(renderTodo)

list.addEventListener('change', e => {
    if (!e.target.matches('[data-list-item-checkbox]')) return

    // Get the todo that is clicked on
    const parent = e.target.closest('.list-item')
    const todoId = parent.dataset.todoId
    // find one todo
    const todo = todos.find(t => t.id === todoId)
    todo.complete = e.target.checked
    // Tooggle the complete prop to be = to the checkbox val
    // Save updated todo
    saveTodos()
})

list.addEventListener('click', e => {
    if (!e.target.matches('[data-button-delete]')) return

    const parent = e.target.closest('.list-item')
    const todoId = parent.dataset.todoId
    // Remove the todo from screen
    parent.remove()
    // Remove todo from list
    todos = todos.filter(todo => todo.id !== todoId)
    // Save the new todos
    saveTodos()
})

form.addEventListener('submit', e => {
    // Prevents reloading page
    e.preventDefault()

    const todoName = toDoInput.value
    if (todoName === "") return
    const newTodo = {
        name: todoName,
        complete: false,
        // gives a unique id b/c Date() is bookmarked at the millisecond 
        id: new Date().valueOf().toString()
    }
    todos.push(newTodo)

    // render todo
    renderTodo(newTodo)
    saveTodos()

    //clear form input
    toDoInput.value = ""
})

function renderTodo(todo) {
    const templateClone = template.content.cloneNode(true)
    const listItem = templateClone.querySelector('.list-item')
    listItem.dataset.todoId = todo.id
    const textElement = templateClone.querySelector('[data-list-item-text]')
    textElement.innerText = todo.name
    // complete todos
    const checkbox = templateClone.querySelector('[data-list-item-checkbox')
    checkbox.checked = todo.complete
    list.appendChild(templateClone)

}


// load todos
function loadTodos() {
    const todosString = localStorage.getItem(TODOS_STORAGE_KEY)
    return JSON.parse(todosString) || []
}

// save todos
function saveTodos() {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}
