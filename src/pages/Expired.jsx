import { useTask } from '../hooks/TaskProvider';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { formatDateToDisplay } from '../util/DateFormats';
import EditTask from '../components/EditTask';
import windowWidthDetection from '../util/WindowWidthDetection';

const Expired = () => {
    const { tasks, deleteTask, updateTask } = useTask();

    const todayDateString = new Date().toDateString();
    const expiredTasks = tasks.filter(task => task.dueDate && new Date(task.dueDate) < new Date(todayDateString));

    const combinedItems = expiredTasks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const windowWidth = windowWidthDetection();

    return (
        <>
            <h1 className="page-heading">
                Expired
            </h1>
            {combinedItems.length === 0 ? (
                <div
                    className="task-container"
                    style={{ width: windowWidth <= 768 ? '86%' : '97%', minWidth: '90%' }}
                >
                    <div className="content">
                        <h4>No expired tasks yet</h4>
                    </div>
                </div>
            ) : (
                <div className="tasks-threads-holder">
                    {combinedItems.map(task => (
                        <div className="box" key={task.id}>
                            <EditTask
                                task={task}
                                onMarkTask={() => { }}
                                onDeleteTask={deleteTask}
                                onUpdateTask={updateTask}
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Expired;
