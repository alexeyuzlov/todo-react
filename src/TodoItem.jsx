import { useState } from 'react';
import { TodoService } from './todo.service';

export function TodoItem({todo, todos, setTodos}) {
    const [editedTodo, setEditedTodo] = useState(null);
    const [loading, setLoading] = useState(false);

    let beforeEditCache = '';

    function removeTodo(todo) {
        setLoading(true);
        TodoService.remove(todo.id).then(
            () => {
                const newTodos = [...todos];
                const index = newTodos.indexOf(todo);
                newTodos.splice(index, 1);
                setTodos(newTodos);
            }
        ).finally(() => setLoading(false))
    }

    function editTodo(todo) {
        beforeEditCache = todo.title;
        setEditedTodo(todo);
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
                    disabled={loading}
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
    );
}