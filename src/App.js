import { useState } from 'react';
import './App.css';

let nextId = 1;

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  function addTask() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setTasks([...tasks, { id: nextId++, name: trimmed, done: false }]);
    setInputValue('');
  }

  function toggleDone(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function removeTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditingValue(task.name);
  }

  function saveEdit(id) {
    const trimmed = editingValue.trim();
    if (!trimmed) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, name: trimmed } : t));
    setEditingId(null);
    setEditingValue('');
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingValue('');
  }

  function handleInputKeyDown(e) {
    if (e.key === 'Enter') addTask();
  }

  function handleEditKeyDown(e, id) {
    if (e.key === 'Enter') saveEdit(id);
    if (e.key === 'Escape') cancelEdit();
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Lista de Tarefas</h1>

        <div className="add-row">
          <input
            className="text-input"
            type="text"
            placeholder="Nova tarefa..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <button className="btn btn-add" onClick={addTask}>Adicionar</button>
        </div>

        {tasks.length === 0 && (
          <p className="empty">Nenhuma tarefa ainda. Adicione uma acima!</p>
        )}

        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={`task-item${task.done ? ' done' : ''}`}>
              <input
                type="checkbox"
                className="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
              />

              {editingId === task.id ? (
                <input
                  className="text-input edit-input"
                  type="text"
                  value={editingValue}
                  onChange={e => setEditingValue(e.target.value)}
                  onKeyDown={e => handleEditKeyDown(e, task.id)}
                  autoFocus
                />
              ) : (
                <span className="task-name">{task.name}</span>
              )}

              <div className="actions">
                {editingId === task.id ? (
                  <>
                    <button className="btn btn-save" onClick={() => saveEdit(task.id)}>Salvar</button>
                    <button className="btn btn-cancel" onClick={cancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <button
                    className="btn btn-edit"
                    onClick={() => startEdit(task)}
                    disabled={task.done}
                  >
                    Editar
                  </button>
                )}
                <button className="btn btn-delete" onClick={() => removeTask(task.id)}>Remover</button>
              </div>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <div className="footer">
            <p className="summary">
              {tasks.filter(t => t.done).length} de {tasks.length} concluída(s)
            </p>
            {tasks.some(t => t.done) && (
              <button className="btn btn-clear" onClick={() => setTasks(tasks.filter(t => !t.done))}>
                Limpar concluídas
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
