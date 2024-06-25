import React, { useState } from 'react';
import { useTask } from '../hooks/TaskProvider';
import { v4 as uuidv4 } from 'uuid';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CreateThread = ({ status }) => {
    const { addThread, addThreadItem, addChildItem } = useTask();

    const [threadName, setThreadName] = useState('');
    const [threadItem, setThreadItem] = useState('');
    const [errors, setErrors] = useState({
        threadName: '',
        threadItem: '',
    });

    const handleCreateThread = (e) => {
        e.preventDefault();

        if (!threadName) {
            setErrors({
                ...errors,
                threadName: 'Thread name is required',
            });
            return;
        }

        if (!threadItem) {
            setErrors({
                ...errors,
                threadItem: 'Thread item is required',
            });
            return;
        }

        const newThreadId = uuidv4();
        addThread({ id: newThreadId, threadName, timestamp: new Date().toISOString(), status: status });
        addThreadItem(newThreadId, threadItem);

        setThreadName('');
        setThreadItem('');
        setErrors({
            threadName: '',
            threadItem: '',
        });

        toast.success('Thread created successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleAddChildItem = (e) => {
        e.preventDefault();

        if (!threadName) {
            setErrors({
                ...errors,
                threadName: 'Thread name is required to add a child item',
            });
            return;
        }

        if (!threadItem) {
            setErrors({
                ...errors,
                threadItem: 'Thread item is required to add a child item',
            });
            return;
        }

        // Assuming the new thread is already created, find its ID
        const existingThread = threads.find(thread => thread.threadName === threadName);
        if (existingThread) {
            addChildItem(existingThread.id, existingThread.threadItems[0].id, threadItem);

            setThreadItem('');
            setErrors({
                threadName: '',
                threadItem: '',
            });

            toast.success('Child item added successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Thread not found. Please create the thread first.', {
                position: "top-right",
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
        <form onSubmit={handleCreateThread}>
            <div className="input-group">
                <label htmlFor="threadName">Thread Name</label>
                <input
                    id="threadName"
                    type="text"
                    placeholder="E.g. Learn React"
                    value={threadName}
                    onChange={(e) => setThreadName(e.target.value)}
                />
                {errors.threadName && <span>{errors.threadName}</span>}
            </div>
            <div className="input-group">
                <label htmlFor="threadItem">First Item</label>
                <input
                    id="threadItem"
                    type="text"
                    placeholder="E.g. Understand JSX"
                    value={threadItem}
                    onChange={(e) => setThreadItem(e.target.value)}
                />
                {errors.threadItem && <span>{errors.threadItem}</span>}
            </div>
            <a className="navigator" onClick={handleAddChildItem}>
                <FaPlus /> Add Child Item
            </a>
            <button className="common-button" type="submit" style={{ width: '100%' }}>
                <FaPlus /> Add Thread
            </button>
        </form>
    );
};

export default CreateThread;
