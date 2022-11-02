import { useEffect, useRef, useState } from 'react';
import { getAll, save } from './store';

function App() {
    const filters = {
        all: todos => todos,
        active: todos => todos.filter(todo => !todo.completed),
        completed: todos => todos.filter(todo => todo.completed)
    };

    const [newTodo, setNewTodo] = useState('');
    const [allDone, setAllDone] = useState(false);
    const [todos, setTodos] = useState(getAll());
    const [remaining, setRemaining] = useState(0);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [visibility, setVisibility] = useState('all');
    const [editedTodo, setEditedTodo] = useState(null);

    let beforeEditCache = '';

    useEffect(() => {
        setFilteredTodos(filters[visibility](todos));
        save(todos);
        setRemaining(filters.active(todos).length);
    }, [todos, visibility]);

    useEffect(() => {
        setAllDone(remaining === 0);
    }, [remaining]);

    function addTodo() {
        const value = newTodo && newTodo.trim();
        if (!value) {
            return;
        }

        const newTodos = [
            ...todos,
            {id: Date.now(), title: value, completed: false}
        ];

        setTodos(newTodos);
        setNewTodo('');
    }

    function markAllDone(value) {
        const newTodos = todos.map((todo) => {
            return {
                ...todo,
                completed: value
            };
        });
        setTodos(newTodos);
        setAllDone(value);
    }

    function editTodo(todo) {
        beforeEditCache = todo.title;
        setEditedTodo(todo);
    }

    function removeTodo(todo) {
        const newTodos = [...todos];
        const index = newTodos.indexOf(todo);
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    function doneEdit(todo) {
        if (!editedTodo) {
            return;
        }

        setEditedTodo(null);
        todo.title = todo.title.trim();
        if (!todo.title) {
            removeTodo(todo);
        }
    }

    function cancelEdit(todo) {
        setEditedTodo(null);
        todo.title = beforeEditCache;
    }

    function removeCompleted() {
        setTodos(filters.active(todos));
    }

    function pluralize(word, count) {
        return word + (count === 1 ? '' : 's');
    }

    function changeTodo(todo, change) {
        const newTodos = todos.map((t) => {
            if (t === todo) {
                return {
                    ...t,
                    ...change,
                };
            }
            return t;
        });

        setTodos(newTodos);
    }

    return (
        <div className="App">
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>

                    <input
                        className="new-todo"
                        autoFocus
                        autoComplete="off"
                        placeholder="What needs to be done?"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                    />
                </header>

                <section style={todos.length > 0 ? {display: 'block'} : {display: 'none'}} className="main">
                    <input
                        id="toggle-all"
                        className="toggle-all"
                        type="checkbox"
                        checked={allDone}
                        onChange={(e) => markAllDone(e.target.checked)}
                    />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">
                        {
                            filteredTodos.map((todo) => (
                                <li
                                    className={
                                        'todo '
                                        + (todo.completed ? 'completed' : '')
                                        + (todo === editedTodo ? 'editing' : '')
                                    }
                                    key={todo.id}
                                >
                                    <div className="view">
                                        <input
                                            className="toggle"
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={(e) => changeTodo(todo, {completed: e.target.checked})}
                                        />

                                        <label
                                            onClick={(e) => e.detail === 2 && editTodo(todo)}
                                        >
                                            {todo.title}
                                        </label>

                                        <button
                                            onClick={() => removeTodo(todo)}
                                            type="button"
                                            className="destroy">
                                        </button>

                                    </div>
                                    <input
                                        className="edit"
                                        type="text"
                                        value={todo.title}
                                        onChange={(e) => changeTodo(todo, {title: e.target.value})}
                                        onKeyDown={(e) => {
                                            e.key === 'Enter' && doneEdit(todo);
                                            e.key === 'Escape' && cancelEdit(todo);
                                        }}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </section>

                <footer style={todos.length > 0 ? {display: 'block'} : {display: 'none'}} className="footer">
                    <span className="todo-count">
                        <strong>{remaining}</strong> {pluralize('item', remaining)} left
                    </span>
                    <ul className="filters">
                        <li>
                            <a
                                href="#/all"
                                className={visibility === 'all' ? 'selected' : ''}
                                onClick={() => setVisibility('all')}
                            >
                                All
                            </a>
                        </li>

                        <li>
                            <a
                                href="#/active"
                                className={visibility === 'active' ? 'selected' : ''}
                                onClick={() => setVisibility('active')}
                            >
                                Active
                            </a>
                        </li>

                        <li>
                            <a
                                href="#/completed"
                                className={visibility === 'completed' ? 'selected' : ''}
                                onClick={() => setVisibility('completed')}
                            >
                                Completed
                            </a>
                        </li>
                    </ul>

                    <button
                        type="button"
                        style={todos.length > remaining ? {display: 'block'} : {display: 'none'}}
                        className="clear-completed"
                        onClick={() => removeCompleted()}
                    >
                        Clear completed
                    </button>
                </footer>
            </section>

            <footer className="info">
                <p>Double-click to edit a todo</p>
                <p>Written by <a href="http://evanyou.me">Evan You</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        </div>
    );
}

export default App;
