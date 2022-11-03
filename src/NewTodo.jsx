import { useState } from 'react';

export function NewTodo({addTodo}) {
    const [newTodo, setNewTodo] = useState('');

    function add() {
        const value = newTodo && newTodo.trim();
        if (!value) {
            return;
        }

        addTodo(value);
        setNewTodo('');
    }

    return (
        <input
            className="new-todo"
            autoFocus
            autoComplete="off"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
        />
    );
}