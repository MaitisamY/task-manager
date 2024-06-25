import { useState, useEffect, useContext, createContext } from 'react';
import useThreadStore from '../stores/useThreadStore.js';

const TaskContext = createContext();

export const useTask = () => {
    return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const {
        threads,
        setThreads,
        addThread,
        addThreadItem,
        addChildItem,
        removeItem,
        moveThreadToCompleted,
        moveThreadToInProgress,
        moveThreadToTodo,
        markThreadItemAsDone,
        unmarkThreadItemAsDone,
        removeCompletedThread
    } = useThreadStore();

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    const addTask = (newTask) => {
        const updatedTasks = [...tasks, { ...newTask, timestamp: new Date().toISOString() }];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const moveTaskToCompleted = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, status: 'completed' };
            }
            return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const moveTaskToInProgress = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, status: 'in-progress' };
            }
            return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const moveTaskToTodo = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, status: 'to-do' };
            }
            return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const updateTask = (id, updatedTask) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    ...updatedTask
                };
            }
            return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            addTask,
            moveTaskToCompleted,
            moveTaskToInProgress,
            moveTaskToTodo,
            deleteTask,
            updateTask,
            threads,
            addThread,
            addThreadItem,
            addChildItem,
            removeItem,
            moveThreadToCompleted,
            moveThreadToInProgress,
            moveThreadToTodo,
            markThreadItemAsDone,
            unmarkThreadItemAsDone,
            removeCompletedThread
        }}>
            {children}
        </TaskContext.Provider>
    );
};
