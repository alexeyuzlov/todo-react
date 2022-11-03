export function ToggleAll({allDone, markAllDone}) {
    return (
        <>
            <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                checked={allDone}
                onChange={(e) => markAllDone(e.target.checked)}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
        </>
    );
}