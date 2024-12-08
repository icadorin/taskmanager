const TaskManager = ({ onLogout }: { onLogout: () => void }) => {
    return (
      <div className="app-container">
        <header className="app-header">
          <h1>Task Manager</h1>
          <button onClick={onLogout}>Logout</button>
          <p>Gerencie suas tarefas</p>
        </header>
        <h2>Minhas Tarefas</h2>
        <ul className="task-list">
          <li className="task-completed">Tarefa concluída</li>
          <li className="task-pending">Tarefa pendente</li>
        </ul>
      </div>
    );
  };
  
  export default TaskManager;
  