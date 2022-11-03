export class TodoService {
    static getAll() {
        return fetch('http://localhost:5000/todos').then(
            (data) => data.json(),
        );
    }

    static create(todo) {
        return fetch('http://localhost:5000/todos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
    }

    static remove(todoId) {
        return fetch(`http://localhost:5000/todos/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}