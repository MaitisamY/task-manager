import { useState, useEffect, useContext, createContext } from 'react';

const TaskContext = createContext();

export const useTask = () => {
    return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    const addTask = (newTask) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        console.log(updatedTasks);
    };

    const markTask = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    status: task.status === 'pending' ? 'completed' : 'pending'
                }
            }
            return task
        })
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
        setTasks(updatedTasks)
    }

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
        setTasks(updatedTasks)
    }

    const updateTask = (id, updatedTask) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    ...updatedTask
                }
            }
            return task
        })
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
        setTasks(updatedTasks)
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, markTask, deleteTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};
