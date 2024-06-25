import { useState, useEffect } from 'react'
import { useTask } from '../hooks/TaskProvider'
import { v4 as uuidv4 } from 'uuid'
import { FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { formatDateToInput } from '../util/DateFormats'

const CreateTask = () => {
    const { addTask } = useTask();
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState(formatDateToInput(new Date().toDateString()));
    const [errors, setErrors] = useState({ task: '', dueDate: '' });

    const handleCreateTask = (e) => {
        e.preventDefault();

        if (!task && !dueDate) {
            setErrors({ task: 'Task is required', dueDate: 'Due date is required' });
            return;
        }

        if (!task) {
            setErrors({ ...errors, task: 'Task is required' });
            return;
        }

        if (task.length < 6 || task.length > 125) {
            setErrors({ ...errors, task: 'Should be between 6 and 125 characters' });
            return;
        }

        if (dueDate) {
            const formattedDate = new Date(dueDate).toLocaleDateString();
            if (new Date(formattedDate) < new Date(new Date().setHours(0, 0, 0, 0))) {
                setErrors({ ...errors, dueDate: 'Due date cannot be in the past' });
                return;
            }
        }

        const formattedDueDate = dueDate ? new Date(dueDate).toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' }) : null;

        const newTask = {
            id: uuidv4(),
            task: task,
            dueDate: formattedDueDate,
            status: 'to-do',
            timestamp: new Date().toISOString()
        };

        addTask(newTask);

        setTask('');
        setDueDate(formatDateToInput(new Date().toDateString()));
        setErrors({ task: '', dueDate: '' });

        toast.success('Task created successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    useEffect(() => {
        if (task.length >= 6 && task.length < 125) {
            setErrors({ ...errors, task: '' });
        }

        if (dueDate && new Date(dueDate) > new Date(new Date().setHours(0, 0, 0, 0))) {
            setErrors({ ...errors, dueDate: '' });
        }
    }, [task, dueDate]);

    return (
        <form onSubmit={handleCreateTask}>
            <div className="input-group">
                <label htmlFor="task">Type Your Task</label>
                <textarea
                    id="task"
                    type="text"
                    placeholder="E.g. Learn React"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    rows={2}
                ></textarea>
                {errors.task && <span>{errors.task}</span>}
            </div>
            <div className="input-group">
                <label htmlFor="dueDate">Set Due Date (optional)</label>
                <input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                {errors.dueDate && <span>{errors.dueDate}</span>}
            </div>
            <p>Setting date in the past will move the task to expired.</p>
            <button
                className="common-button"
                type="submit"
                style={{ width: '100%' }}
            >
                <FaPlus /> Add Task
            </button>
        </form>
    );
};

export default CreateTask
