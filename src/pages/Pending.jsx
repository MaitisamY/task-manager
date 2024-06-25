import { useTask } from '../hooks/TaskProvider'
import EditTask from '../components/EditTask'
import EditThread from '../components/EditThread'
import CreateTask from '../components/CreateTask'
import CreateThread from '../components/CreateThread'
import windowWidthDetection from '../util/WindowWidthDetection'

const Pending = () => {
    const { tasks, threads, moveTaskToCompleted, moveTaskToTodo, deleteTask, updateTask, moveThreadToCompleted, moveThreadToTodo, removeCompletedThread, updateThread } = useTask();

    const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
    const inProgressThreads = threads.filter(thread => thread.status === 'in-progress');

    const combinedItems = [...inProgressTasks, ...inProgressThreads].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const windowWidth = windowWidthDetection();
    const taskContainerWidth = windowWidth > 768 ? '48.5%' 
    : windowWidth > 900 ? '55%' 
    : windowWidth > 1050 ? '60%' 
    : windowWidth > 1200 ? '65%'
    : '100%';

    return (
        <div>
            <h1>In Progress</h1>
            <div className="selection">
                <div className="task-container height-controller" style={{ width: taskContainerWidth }}>
                    <div className="header">
                        <h2>Start adding a task</h2>
                    </div>
                    <div className="content">
                        <CreateTask />
                    </div>
                </div>
                <div className="task-container height-controller" style={{ width: taskContainerWidth }}>
                    <div className="header">
                        <h2>Start adding a thread</h2>
                    </div>
                    <div className="content">
                        <CreateThread />
                    </div>
                </div>
            </div>
            {combinedItems.length === 0 ? (
                <div
                    className="task-container"
                    style={{ width: windowWidth <= 768 ? '86%' : '97%', minWidth: '90%' }}
                >
                    <div className="content">
                        <h4>Nothing is in progress yet</h4>
                    </div>
                </div>
            ) : (
                combinedItems.map(item => (
                    <div className="box" key={item.id}>
                        {item.task ? (
                            <EditTask
                                task={item}
                                onMarkTask={moveTaskToCompleted}
                                onDeleteTask={deleteTask}
                                onUpdateTask={updateTask}
                            />
                        ) : (
                            <EditThread
                                thread={item}
                                onMarkThread={moveThreadToCompleted}
                                onDeleteThread={removeCompletedThread}
                                onUpdateThread={updateThread}
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default Pending
