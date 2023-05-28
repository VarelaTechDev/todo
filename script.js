// ? Our list of todos
let todos = [];

const renderTodos = () => {
    const list = document.getElementById('todo-list');
    list.innerHTML = '';
    for(let i = 0; i < todos.length; i++) {
        const li = document.createElement('li');
        const text = document.createTextNode(todos[i]);
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.onclick = function() {
            deleteTodo(i);
        };
        const editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        editButton.onclick = function() {
            const newTodo = prompt('Edit your todo', todos[i]);
            if (newTodo) {
                updateTodo(i, newTodo);
            }
        };
        li.appendChild(text);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        list.appendChild(li);
    }
}

// function addTodo() {
//     const input = document.getElementById('todo-input');
//     const value = input.value;
//     if (value) {
//         todos.push(value);
//         input.value = '';
//         renderTodos();
//     }
// }

const addTodo = () => {
    const input = document.getElementById('todo-input');
    const value = input.value;
    if (value) {
        todos.push(value);
        input.value = '';
        renderTodos();
    }
}

const deleteTodo = (index) => {
    todos.splice(index, 1);
    renderTodos();
}

const updateTodo = (index, value) => {
    todos[index] = value;
    renderTodos();
}

renderTodos();