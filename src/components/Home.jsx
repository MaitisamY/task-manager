import { useState } from 'react'
import { useTask } from '../hooks/TaskProvider'
import { FaPen, FaTrash } from 'react-icons/fa'
import { LiaToggleOffSolid, LiaToggleOnSolid } from 'react-icons/lia'

import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'

import 'react-toastify/dist/ReactToastify.css'
import 'react-confirm-alert/src/react-confirm-alert.css'

import CreateTask from './CreateTask'

function Home() {

    const { tasks, markTask, deleteTask } = useTask()

    const today = new Date().toISOString().slice(0, 10);
    const filteredTasks = tasks.filter(task => task.dueDate >= today);

    // localStorage.removeItem('tasks')

    const handleMarkTask = (id) => {
        markTask(id)
    }

    const handleEditTask = (id) => {
        
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
                            hideProgressBar: false,
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
    
        
    if (!tasks || tasks.length === 0) {
        return (
            <>
                <div className="box">
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
            <div className="box">
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
                        <div className="content">
                            <h3>
                                <i onClick={() => handleMarkTask(task.id)}>
                                    {task.status === 'completed' ? <LiaToggleOnSolid /> : <LiaToggleOffSolid />}
                                </i>
                                <span 
                                    style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}
                                >
                                    {task.task}
                                </span>
                            </h3>
                        </div>
                        <div className="footer">
                            <div>
                                <h6>Due Date: {new Date(task.dueDate).toLocaleDateString()}</h6>
                            </div>
                            <div>
                                <button className="primary"><FaPen /></button>
                                <button className="danger" onClick={() => handleDeleteTask(task.id, task.task)}><FaTrash /></button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Home;
