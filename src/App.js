import { useEffect, useState } from 'react';
import { FooterInfo } from './FooterInfo';
import { NewTodo } from './NewTodo';
import { Visibility } from './Visibility';
import { Remaining } from './Remaining';
import { filters } from './filters';
import { ToggleAll } from './ToggleAll';
import { TodoList } from './TodoList';
import { TodoService } from './todo.service';
import { uuidv4 } from './guid';

function App() {
    const [todos, setTodos] = useState([]);
    const [allDone, setAllDone] = useState(false);
    const [remaining, setRemaining] = useState(0);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [visibility, setVisibility] = useState('all');

    useEffect(() => {
        setFilteredTodos(filters[visibility](todos));
        setRemaining(filters.active(todos).length);
    }, [todos, visibility]);

    useEffect(() => {
        TodoService.getAll().then(
            (data) => setTodos(data)
        );
    }, []);

    useEffect(() => {
        setAllDone(remaining === 0);
    }, [remaining]);

    function addTodo(value) {
        const newTodo = {id: uuidv4(), title: value, completed: false};

        TodoService.create(newTodo).then(
            () => {
                const newTodos = [
                    ...todos,
                    newTodo
                ];

                setTodos(newTodos);
            }
        );
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

    function removeCompleted() {
        setTodos(filters.active(todos));
    }

    return (
        <div className="App">
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTodo addTodo={addTodo}/>
                </header>

                <section style={todos.length > 0 ? {display: 'block'} : {display: 'none'}} className="main">
                    <ToggleAll allDone={allDone} markAllDone={markAllDone}/>
                    <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
                </section>

                <footer style={todos.length > 0 ? {display: 'block'} : {display: 'none'}} className="footer">
                    <Remaining remaining={remaining}/>

                    <Visibility visibility={visibility} setVisibility={setVisibility}/>

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

            <FooterInfo/>
        </div>
    );
}

export default App;
