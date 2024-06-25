import { useTask } from '../hooks/TaskProvider'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import { formatDateToDisplay } from '../util/DateFormats'
import EditTask from '../components/EditTask';
import windowWidthDetection from '../util/WindowWidthDetection';

const Trash = () => {

    // const { tasks, deleteTask } = useTask()

    // const todayDateString = new Date().toDateString();
    // const filteredTasks = tasks.filter((task) => new Date(task.dueDate) < new Date(todayDateString));

    // const handleDeleteTask = (id, taskName) => {
    //     // Display confirmation dialog before deletion
    //     confirmAlert({
    //         title: 'Confirm Deletion',
    //         message: `Are you sure you want to delete the task: ${taskName}?`,
    //         buttons: [
    //             {
    //                 label: 'Yes',
    //                 onClick: () => {
    //                     // Display toast notification before deletion
    //                     toast.warn(`Deleting task: ${taskName}`, {
    //                         position: "bottom-right",
    //                         autoClose: 3000,
    //                         hideProgressBar: true,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         draggable: true,
    //                         progress: undefined,
    //                     });

    //                     // Perform task deletion
    //                     deleteTask(id);
    //                 }
    //             },
    //             {
    //                 label: 'No',
    //                 onClick: () => { }
    //             }
    //         ]
    //     });
    // };

    const { tasks, deleteTask, updateTask } = useTask();
    const expiredTasks = tasks.filter(task => task.dueDate && new Date(task.dueDate) < new Date());

    const combinedItems = expiredTasks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const windowWidth = windowWidthDetection();

    return (
        <div>
            <h1>Expired</h1>
            {combinedItems.length === 0 ? (
                <div
                    className="task-container"
                    style={{ width: windowWidth <= 768 ? '86%' : '97%', minWidth: '90%' }}
                >
                    <div className="content">
                        <h4>No expired tasks</h4>
                    </div>
                </div>
            ) : (
                combinedItems.map(task => (
                    <div className="box" key={task.id}>
                        <EditTask
                            task={task}
                            onMarkTask={() => {}}
                            onDeleteTask={deleteTask}
                            onUpdateTask={updateTask}
                        />
                    </div>
                ))
            )}
        </div>
    )
}

export default Trash
