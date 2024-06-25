import { useState, useEffect } from 'react'
import { FaPen, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { LiaToggleOffSolid, LiaToggleOnSolid } from 'react-icons/lia'
import { toast } from 'react-toastify'
import { formatDateToInput, formatDateToDisplay } from '../util/DateFormats'

const EditTask = ({ task, onMarkTask, onDeleteTask, onUpdateTask }) => {
    const [editingTasks, setEditingTasks] = useState({});
    const [taskChanges, setTaskChanges] = useState({});
    const [status, setStatus] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [dateError, setDateError] = useState({ id: '', error: '' });
    const [taskError, setTaskError] = useState({ id: '', error: '' });

    const handleDueDateChange = (event) => {
        setDueDate(event.target.value);
    };

    const handleTaskChanges = (e, id) => {
        const { value } = e.target;
        setTaskChanges((prevTaskChanges) => ({
            ...prevTaskChanges,
            [id]: value,
        }));
    };

    const startEditing = (id) => {
        setEditingTasks((prevEditingTasks) => ({
            ...prevEditingTasks,
            [id]: true,
        }));

        setTaskChanges((prevTaskChanges) => ({
            ...prevTaskChanges,
            [id]: task.task,
        }));

        setStatus(task.status);

        const formattedDueDate = formatDateToInput(task.dueDate);
        setDueDate(formattedDueDate);

        setTimeout(() => {
            const textarea = document.getElementById(`task-${id}`);
            if (textarea) {
                textarea.focus();
                textarea.setSelectionRange(textarea.value.length, textarea.value.length);
            }
        }, 0);
    };

    const stopEditing = (id) => {
        setEditingTasks({
            ...editingTasks,
            [id]: false,
        });
        setTaskError({ id: '', error: '' });
        setDateError({ id: '', error: '' });
    };

    const handleEditFormSubmit = (e, id) => {
        e.preventDefault();

        const formattedDueDate = formatDateToDisplay(dueDate);
        const dueDateObj = new Date(formattedDueDate);

        if (taskChanges[id].length === 0) {
            setTaskError({
                ...taskError,
                id: id,
                error: 'Task cannot be empty!',
            });
        } else if (taskChanges[id].length < 6) {
            setTaskError({
                ...taskError,
                id: id,
                error: 'Task must be at least 6 characters long!',
            });
        } else if (taskChanges[id].length > 125) {
            setTaskError({
                ...taskError,
                id: id,
                error: 'Task must be at most 125 characters long!',
            });
        } else if (dueDate && dueDateObj < new Date(new Date().setHours(0, 0, 0, 0))) {
            setDateError({
                ...dateError,
                id: id,
                error: 'Due date cannot be in the past!',
            });
        } else {
            setTaskError({ id: '', error: '' });

            const updatedTask = {
                id: id,
                task: taskChanges[id],
                dueDate: dueDate ? new Date(dueDate).toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' }) : null,
                status: status,
            };

            onUpdateTask(id, updatedTask);
            stopEditing(id);

            toast.success('Task updated successfully', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <>
            {
                editingTasks[task.id] ? (
                    <form onSubmit={(e) => handleEditFormSubmit(e, task.id)}>
                        <div className="content">
                            <label>Edit task</label>
                            <textarea
                                name={`task-${task.id}`}
                                id={`task-${task.id}`}
                                value={taskChanges[task.id]}
                                type="text"
                                rows="6"
                                onChange={(e) => handleTaskChanges(e, task.id)}
                                placeholder="Edit your task here"
                                autoFocus
                            ></textarea>
                            {taskError.id === task.id && <span className="error">{taskError.error}</span>}

                            <label>Edit due date</label>
                            <input type="date" value={dueDate} onChange={handleDueDateChange} />
                            {dateError.id === task.id && <span className="error">{dateError.error}</span>}
                        </div>
                        <div className="footer">
                            <div>
                                <h6>Modifying on: {formatDateToDisplay(new Date())}</h6>
                            </div>
                            <div>
                                <button
                                    onClick={() => stopEditing(task.id)}
                                    title="Cancel editing"
                                    className="warning"
                                >
                                    <FaTimes />
                                </button>
                                <button
                                    title="Update"
                                    className="success"
                                    type="submit"
                                >
                                    <FaCheck />
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="content">
                            <h3>
                                <i onClick={() => onMarkTask(task.id)}>
                                    {
                                        task.status === 'completed' ?
                                            <LiaToggleOnSolid style={{ color: 'green' }} size={24} />
                                            : <LiaToggleOffSolid size={24} />
                                    }
                                </i>
                                <span
                                    style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}
                                    title={
                                        task.status === 'completed'
                                            ? 'Mark as pending'
                                            : 'Mark as completed'
                                    }
                                >
                                    {task.task}
                                </span>
                            </h3>
                        </div>
                        <div className="footer">
                            <div>
                                <h6>Due Date: {formatDateToDisplay(task.dueDate)}</h6>
                            </div>
                            <div>
                                <button
                                    className="primary"
                                    onClick={() => (setStatus(task.status), startEditing(task.id))}
                                >
                                    <FaPen />
                                </button>
                                <button
                                    className="danger"
                                    onClick={() => onDeleteTask(task.id, task.task)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default EditTask
