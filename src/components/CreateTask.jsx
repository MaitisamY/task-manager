import { useState } from 'react';
import { useTask } from '../hooks/TaskProvider';
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({ onToggle }) => {

    const { addTask } = useTask();

    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [errors, setErrors] = useState({
        task: '',
        dueDate: '',
    });

    const handleCreateTask = (e) => {
        e.preventDefault();

        if (!task) {
            setErrors({
                ...errors,
                task: 'Task is required',
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

        if (new Date(dueDate) < new Date()) {
            setErrors({
                ...errors,
                dueDate: 'Due date cannot be in the past',
            });
            return;
        }

        // Create a new task object
        const newTask = {
            id: uuidv4(),
            task,
            dueDate,
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
        
    };

    return (
        <form onSubmit={handleCreateTask}>
            <label htmlFor="task">Task</label>
            <textarea
                id="task"
                type="text"
                placeholder="Write a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            ></textarea>

            {errors.task && <span>{errors.task}</span>}

            <label htmlFor="dueDate">Due Date</label>
            <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            {errors.dueDate && <span>{errors.dueDate}</span>}
            <button type="submit">Create Task</button>
        </form>
    );
};

export default CreateTask;
