document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');

    //add a new to-do item
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const li = document.createElement('li');
        li.className = 'flex justify-between items-center mb-2';
        li.innerHTML = `
            <span class="todo-text">${todoText}</span>
            <div>
                <button class="editButton bg-yellow-500 text-white rounded px-2 py-1 hover:bg-yellow-600">Edit</button>
                <button class="deleteButton bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600">Delete</button>
            </div>
        `;

        todoList.appendChild(li);
        todoInput.value = '';

        // edit and delete buttons
        li.querySelector('.editButton').addEventListener('click', () => editTodo(li));
        li.querySelector('.deleteButton').addEventListener('click', () => deleteTodo(li));
    }

    // edit a to-do item
    function editTodo(li) {
        const todoText = li.querySelector('.todo-text');
        const currentText = todoText.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'border border-gray-300 rounded p-1 mr-2';

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.className = 'bg-green-500 text-white rounded px-2 py-1 hover:bg-green-600';

        li.innerHTML = '';
        li.appendChild(input);
        li.appendChild(saveButton);

        saveButton.addEventListener('click', () => {
            const newText = input.value.trim();
            if (newText !== '') {
                todoText.textContent = newText;
                li.innerHTML = `
                    <span class="todo-text">${newText}</span>
                    <div>
                        <button class="editButton bg-yellow-500 text-white rounded px-2 py-1 hover:bg-yellow-600">Edit</button>
                        <button class="deleteButton bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600">Delete</button>
                    </div>
                `;
                li.querySelector('.editButton').addEventListener('click', () => editTodo(li));
                li.querySelector('.deleteButton').addEventListener('click', () => deleteTodo(li));
            }
        });
    }

    // delete a to-do item
    function deleteTodo(li) {
        todoList.removeChild(li);
    }

    // adding a new to-do item
    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});