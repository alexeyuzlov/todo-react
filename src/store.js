export const STORAGE_KEY = 'todos-react';

export function getAll() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
