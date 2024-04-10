import { useState } from 'react';
import { useTask } from '../hooks/TaskProvider';
import { v4 as uuidv4 } from 'uuid';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify'
import { formatDateToInput } from '../util/DateFormats'

import 'react-toastify/dist/ReactToastify.css'

const CreateTask = () => {

    const { addTask } = useTask();

    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState(formatDateToInput(new Date().toDateString()));
    const [errors, setErrors] = useState({
        task: '',
        dueDate: '',
    });

    const handleCreateTask = (e) => {
        e.preventDefault();

        if (!task && !dueDate) {
            setErrors({
                ...errors,
                task: 'Task is required',
                dueDate: 'Due date is required',
            });
            return;
        }

        if (!task) {
            setErrors({
                ...errors,
                task: 'Task is required',
            });
            return;
        }

        if (task.length < 6 || task.length > 125) {
            setErrors({
                ...errors,
                task: 'Should be between 6 and 125 characters',
            });
            return;
        }

        if (!dueDate) {
            setErrors({
                ...errors,
                dueDate: 'Due date is required',
            });
            return;
        }

        if (dueDate) {
            const formattedDate = new Date(dueDate).toLocaleDateString();
            if (new Date(formattedDate) < new Date(new Date().setHours(0, 0, 0, 0))) {
                setErrors({
                    ...errors,
                    dueDate: 'Due date cannot be in the past',
                });
                return;
            }
        }

        const formattedDueDate = new Date(dueDate).toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' });

        // Create a new task object
        const newTask = {
            id: uuidv4(),
            task: task,
            dueDate: formattedDueDate,
            status: 'pending', // Assuming you want to set initial status as 'pending'
        };

        addTask(newTask);

        // Clear form fields after adding the task
        setTask('');
        setDueDate('');
        setErrors({
            task: '',
            dueDate: '',
        })

        toast.success('Task created successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        
    };

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
                    rows={1}
                ></textarea>

                {errors.task && <span>{errors.task}</span>}
            </div>
            <div className="input-group">
                <label htmlFor="dueDate">Set Due Date</label>
                <input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                {errors.dueDate && <span>{errors.dueDate}</span>}
            </div>
            <button type="submit"><FaPlus /></button>
        </form>
    );
};

export default CreateTask;
