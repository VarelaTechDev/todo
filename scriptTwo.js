// Define an array to hold the list of todos
let todos = [];

// Get the current selected storage type from the dropdown
function getStorageType() {
    return document.getElementById('storage-type').value;
}

// Depending on the selected storage type, get the todos from the appropriate source
function getTodos() {
    const storageType = getStorageType();
    // If the storage type is array, return the todos array
    if (storageType === 'array') {
        return todos;
    } 
    // If the storage type is localStorage, get the todos from localStorage
    else {
        const storedTodos = localStorage.getItem('todos');
        // If there are todos in localStorage, parse them into a JS array and return
        // If localStorage is empty, return an empty array
        return storedTodos ? JSON.parse(storedTodos) : [];
    }
}

// Depending on the selected storage type, store the todos in the appropriate place
function setTodos(newTodos) {
    const storageType = getStorageType();
    // If the storage type is array, set the todos array to the new todos
    if (storageType === 'array') {
        todos = newTodos;
    } 
    // If the storage type is localStorage, stringify the new todos and set in localStorage
    else {
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
}

// Render the todos on the page
function renderTodos() {
    // Get the ul element
    const list = document.getElementById('todo-list');
    // Clear the ul
    list.innerHTML = '';
    // Get the todos
    const todos = getTodos();
    // For each todo
    for(let i = 0; i < todos.length; i++) {
        // Create a new li element and buttons
        const li = document.createElement('li');
        const text = document.createTextNode(todos[i]);
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        // When the delete button is clicked, delete the todo
        deleteButton.onclick = function() {
            deleteTodo(i);
        };
        const editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        // When the edit button is clicked, update the todo
        editButton.onclick = function() {
            const newTodo = prompt('Edit your todo', todos[i]);
            if (newTodo) {
                updateTodo(i, newTodo);
            }
        };
        // Append the text and buttons to the li, then append the li to the ul
        li.appendChild(text);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        list.appendChild(li);
    }
}

// Add a new todo
function addTodo() {
    // Get the input value
    const input = document.getElementById('todo-input');
    const value = input.value;
    // If there's a value, add it to the todos and refresh the todos displayed on the page
    if (value) {
        const todos = getTodos();
        todos.push(value);
        setTodos(todos);
        input.value = '';
        renderTodos();
    }
}

// Delete a todo
function deleteTodo(index) {
    // Remove the todo at the given index and refresh the todos displayed on the page
    const todos = getTodos();
    todos.splice(index, 1);
    setTodos(todos);
    renderTodos();
}

// Update a todo
function updateTodo(index, value) {
    // Update the todo at the given index and refresh the todos displayed on the page
    const todos = getTodos();
    todos[index] = value;
    setTodos(todos);
    renderTodos();
}

// When the selected storage type changes, refresh the todos displayed on the page
document.getElementById('storage-type').onchange = renderTodos;

// Initial render of the todos on the page
renderTodos();
