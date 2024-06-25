import { useTask } from '../hooks/TaskProvider'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import { formatDateToDisplay } from '../util/DateFormats'

const Trash = () => {

    const { tasks, deleteTask } = useTask()

    const todayDateString = new Date().toDateString();
    const filteredTasks = tasks.filter((task) => new Date(task.dueDate) < new Date(todayDateString));

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

    if (!filteredTasks || filteredTasks.length === 0) {
        return (
            <>
                <h1 className="page-heading">Trash</h1>
                <div className="task-container" style={{ width: '97%', minWidth: '90%' }}>
                    <div className="content">
                        <h4>Your trash is empty</h4>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <h1 className="page-heading">Trash</h1>
            {
                filteredTasks.map(task => (
                    <div className="box" key={task.id}>
                        <div className="content">
                            <h3 style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
                                <span>{task.task}</span>
                            </h3>
                        </div>
                        <div className="footer">
                            <div>
                                <h6>Due Date: {formatDateToDisplay(task.dueDate)}</h6>
                            </div>
                            <div>
                                <button 
                                    className="danger" 
                                    onClick={() => handleDeleteTask(task.id, task.task)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Trash