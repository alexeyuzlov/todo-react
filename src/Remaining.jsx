export function Remaining({remaining}) {
    function pluralize(word, count) {
        return word + (count === 1 ? '' : 's');
    }

    return (
        <span className="todo-count">
            <strong>{remaining}</strong> {pluralize('item', remaining)} left
        </span>
    );
}