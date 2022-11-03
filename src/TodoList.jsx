import { TodoItem } from './TodoItem';

export function TodoList({todos, setTodos, filteredTodos}) {
    return (
        <ul className="todo-list">
            {
                filteredTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos}/>
                ))
            }
        </ul>
    );
}