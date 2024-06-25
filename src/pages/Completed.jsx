import { useTask } from '../hooks/TaskProvider';
import EditTask from '../components/EditTask';
import EditThread from '../components/EditThread';
import CreateTask from '../components/CreateTask';
import CreateThread from '../components/CreateThread';
import windowWidthDetection from '../util/WindowWidthDetection';
import { BsArrows } from 'react-icons/bs';

const Completed = () => {
    const { 
        tasks, 
        threads, 
        moveTaskToTodo, 
        deleteTask, 
        updateTask, 
        moveThreadToTodo, 
        removeCompletedThread, 
        updateThread 
    } = useTask();

    const completedTasks = tasks.filter(task => task.status === 'completed');
    const completedThreads = threads.filter(thread => thread.status === 'completed');

    const combinedItems = [...completedTasks, ...completedThreads].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const windowWidth = windowWidthDetection();
    const taskContainerWidth = windowWidth > 768 ? '48.5%' 
    : windowWidth > 900 ? '55%' 
    : windowWidth > 1050 ? '60%' 
    : windowWidth > 1200 ? '65%'
    : '100%';

    return (
        <>
            <h1 className="page-heading">
                Completed
            </h1>
            <span className="swipe-text">
                Swipe to see more options
                <BsArrows size={40} style={{ animation: 'swipeRightAndLeft 5s ease-in-out infinite' }} />
            </span>
            <div className="selection">
                <div className="task-container height-controller" style={{ width: taskContainerWidth }}>
                    <div className="header">
                        <h2>Start adding a task</h2>
                    </div>
                    <div className="content">
                        <CreateTask status="completed" />
                    </div>
                </div>
                <div className="task-container height-controller" style={{ width: taskContainerWidth }}>
                    <div className="header">
                        <h2>Start adding a thread</h2>
                    </div>
                    <div className="content">
                        <CreateThread status="completed" />
                    </div>
                </div>
            </div>
            {combinedItems.length === 0 ? (
                <div
                    className="task-container"
                    style={{ width: windowWidth <= 768 ? '86%' : '97%', minWidth: '90%' }}
                >
                    <div className="content">
                        <h4>Nothing is completed yet</h4>
                    </div>
                </div>
            ) : (
                <div className="tasks-threads-holder">
                {combinedItems.map(item => (
                    <div className="box" key={item.id}>
                        {item.task ? (
                            <EditTask
                                task={item}
                                onMarkTask={moveTaskToTodo}
                                onDeleteTask={deleteTask}
                                onUpdateTask={updateTask}
                            />
                        ) : (
                            <EditThread
                                thread={item}
                                onMarkThread={moveThreadToTodo}
                                onDeleteThread={removeCompletedThread}
                                onUpdateThread={updateThread}
                            />
                        )}
                    </div>
                ))}
                </div>
            )}
        </>
    );
};

export default Completed;
