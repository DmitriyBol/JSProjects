const form = document.querySelector('form');
const input = document.querySelector('input');
const todos = document.getElementById('todos');
const todosList = JSON.parse(localStorage.getItem('todos'));

if (todosList) {
    todosList.forEach(todo => {
        addTodo(todo)
    })
}

form.addEventListener('submit', (e) => {
 e.preventDefault();
addTodo();
});

function addTodo(todo) {
    let toDoText = input.value;

    if (todo) { toDoText = todo.text; }

    if (toDoText) {
        const todoEl = document.createElement('li');
            if (todo && todo.completed) {
                todoEl.classList.add('completed')
            }
        todoEl.innerText = toDoText;
        todos.appendChild(todoEl);

        todoEl.addEventListener('click', (e) => {
            todoEl.classList.toggle('completed');
            localS();
        })

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            localS();
        })
        input.value = '';
        localS();
 }
};

function localS() {
    const todoEl = document.querySelectorAll('li');

    const todos = [];

    todoEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed'),
        })
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}
