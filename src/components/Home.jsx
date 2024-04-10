import { useTask } from '../hooks/TaskProvider'

import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'

import 'react-toastify/dist/ReactToastify.css'
import 'react-confirm-alert/src/react-confirm-alert.css'

import CreateTask from './CreateTask'
import EditTask from './EditTask'

function Home() {

    const { tasks, markTask, deleteTask, updateTask } = useTask()

    const todayDateString = new Date().toDateString();
    const filteredTasks = tasks.filter((task) => new Date(task.dueDate) >= new Date(todayDateString));

    // localStorage.removeItem('tasks')

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
                <div className="task-create-box">
                    <div className="header">
                        <h1>Welcome</h1>
                    </div>
                    <div className="content">
                        <p>Start adding tasks</p>
                        <CreateTask />
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="task-create-box">
                <div className="header">
                    <h1>Add Task</h1>
                </div>
                <div className="content">
                    <CreateTask />
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
