export function Visibility({visibility, setVisibility}) {
    return (
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
    );
}