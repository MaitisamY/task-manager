import { useTask } from '../hooks/TaskProvider'

import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import { BsArrows } from 'react-icons/bs'
import windowWidthDetection from '../util/WindowWidthDetection'

import CreateTask from '../components/CreateTask'
import CreateThread from '../components/CreateThread'
import EditTask from '../components/EditTask'

const Home = () => {

    const { tasks, markTask, deleteTask, updateTask } = useTask()

    const todayDateString = new Date().toDateString();
    const filteredTasks = tasks.filter((task) => new Date(task.dueDate) >= new Date(todayDateString));

    const windowWidth = windowWidthDetection()

    // Calculating the width for the task containers based on the window width
    const taskContainerWidth = windowWidth > 768 ? '48.5%' 
    : windowWidth > 900 ? '55%' 
    : windowWidth > 1050 ? '60%' 
    : windowWidth > 1200 ? '65%'
    : '100%';

    const handleMarkTask = (id) => {

        const task = tasks.find(task => task.id === id)
        markTask(id)

        toast.success(`Marked as ${task.status === 'pending' ? 'completed' : 'pending'}`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const handleDeleteTask = (id, taskName) => {
        // Display confirmation dialog before deletion
        confirmAlert({
            title: 'Confirm Deletion',
            message: `Are you sure you want to delete the task: ${taskName}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        // Display toast notification before deletion
                        toast.warn(`Deleting task: ${taskName}`, {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                        // Perform task deletion
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
        updateTask(id, task, dueDate)
    }
        
    if (!filteredTasks || filteredTasks.length === 0) {
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
        )
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
            {
                filteredTasks.map(task => (
                    <div className="box" key={task.id}>
                        <EditTask 
                            task={task} 
                            tasks={tasks}
                            onMarkTask={handleMarkTask}
                            onDeleteTask={handleDeleteTask} 
                            onUpdateTask={handleUpdateTask}
                        />
                    </div>
                ))
            }
        </>
    )
}

export default Home;
