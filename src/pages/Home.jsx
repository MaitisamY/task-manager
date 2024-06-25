import { useTask } from '../hooks/TaskProvider';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { BsArrows } from 'react-icons/bs';
import windowWidthDetection from '../util/WindowWidthDetection';

import CreateTask from '../components/CreateTask';
import CreateThread from '../components/CreateThread';
import EditTask from '../components/EditTask';
import EditThread from '../components/EditThread';

const Home = () => {
    const {
        tasks,
        moveTaskToCompleted,
        deleteTask,
        updateTask,
        threads,
        moveThreadToCompleted,
        removeCompletedThread,
        updateThread
    } = useTask();

    const todayDateString = new Date().toDateString();
    const filteredTasks = tasks.filter(task => task.status === 'to-do' && (!task.dueDate || new Date(task.dueDate) >= new Date(todayDateString)));
    const filteredThreads = threads.filter(thread => thread.status === 'to-do');

    const combinedItems = [...filteredTasks, ...filteredThreads].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const windowWidth = windowWidthDetection();
    const taskContainerWidth = windowWidth > 768 ? '48.5%' :
        windowWidth > 900 ? '55%' :
        windowWidth > 1050 ? '60%' :
        windowWidth > 1200 ? '65%' : '100%';

    const handleMoveToCompleted = (id) => {
        moveTaskToCompleted(id);
        toast.success('Task moved to completed!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleDeleteTask = (id, taskName) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: `Are you sure you want to delete the task: ${taskName}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        toast.warn(`Deleting task: ${taskName}`, {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        deleteTask(id);
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    const handleUpdateTask = (id, task, dueDate) => {
        updateTask(id, { task, dueDate });
    };

    if (!combinedItems.length) {
        return (
            <>
                <h1 className="page-heading">
                    Welcome
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
                <div
                    className="task-container"
                    style={{ width: windowWidth <= 768 ? '86%' : '97%', minWidth: '90%' }}
                >
                    <div className="content">
                        <h4>Your to do list is empty</h4>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <h1 className="page-heading">
                To Dos
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
                        <CreateTask status="to-do" />
                    </div>
                </div>
                <div className="task-container height-controller" style={{ width: taskContainerWidth }}>
                    <div className="header">
                        <h2>Start adding a thread</h2>
                    </div>
                    <div className="content">
                        <CreateThread status="to-do" />
                    </div>
                </div>
            </div>
            <div className="tasks-threads-holder">
                {
                    combinedItems.map(item => (
                        <div className="box" key={item.id}>
                            {
                                item.task ? (
                                    <EditTask
                                        task={item}
                                        onMarkTask={item.status === 'completed' ? moveTaskToTodo : handleMoveToCompleted}
                                        onDeleteTask={handleDeleteTask}
                                        onUpdateTask={handleUpdateTask}
                                    />
                                ) : (
                                    <EditThread
                                        thread={item}
                                        onMarkThread={item.status === 'completed' ? moveThreadToTodo : moveThreadToCompleted}
                                        onDeleteThread={removeCompletedThread}
                                        onUpdateThread={updateThread}
                                    />
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default Home;
