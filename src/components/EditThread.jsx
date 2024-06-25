import { useState } from 'react'
import { FaPen, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { LiaToggleOffSolid, LiaToggleOnSolid } from 'react-icons/lia'
import { toast } from 'react-toastify'

const EditThread = ({ thread, onMarkThread, onDeleteThread, onUpdateThread }) => {
    const [editingThreads, setEditingThreads] = useState({});
    const [threadChanges, setThreadChanges] = useState({});
    const [status, setStatus] = useState(null);

    const handleThreadChanges = (e, id) => {
        const { value } = e.target;
        setThreadChanges((prevThreadChanges) => ({
            ...prevThreadChanges,
            [id]: value,
        }));
    };

    const startEditing = (id) => {
        setEditingThreads((prevEditingThreads) => ({
            ...prevEditingThreads,
            [id]: true,
        }));

        setThreadChanges((prevThreadChanges) => ({
            ...prevThreadChanges,
            [id]: thread.threadName,
        }));

        setStatus(thread.status);
    };

    const stopEditing = (id) => {
        setEditingThreads({
            ...editingThreads,
            [id]: false,
        });
    };

    const handleEditFormSubmit = (e, id) => {
        e.preventDefault();

        if (threadChanges[id].length === 0) {
            toast.error('Thread name cannot be empty!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (threadChanges[id].length < 6) {
            toast.error('Thread name must be at least 6 characters long!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (threadChanges[id].length > 125) {
            toast.error('Thread name must be at most 125 characters long!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            const updatedThread = {
                id: id,
                threadName: threadChanges[id],
                status: status,
            };

            onUpdateThread(id, updatedThread);
            stopEditing(id);

            toast.success('Thread updated successfully', {
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
                editingThreads[thread.id] ? (
                    <form onSubmit={(e) => handleEditFormSubmit(e, thread.id)}>
                        <div className="content">
                            <label>Edit thread</label>
                            <textarea
                                name={`thread-${thread.id}`}
                                id={`thread-${thread.id}`}
                                value={threadChanges[thread.id]}
                                type="text"
                                rows="6"
                                onChange={(e) => handleThreadChanges(e, thread.id)}
                                placeholder="Edit your thread here"
                                autoFocus
                            ></textarea>
                        </div>
                        <div className="footer">
                            <div>
                                <button
                                    onClick={() => stopEditing(thread.id)}
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
                                <i onClick={() => onMarkThread(thread.id)}>
                                    {
                                        thread.status === 'completed' ?
                                            <LiaToggleOnSolid style={{ color: 'green' }} size={24} />
                                            : <LiaToggleOffSolid size={24} />
                                    }
                                </i>
                                <span
                                    style={{ textDecoration: thread.status === 'completed' ? 'line-through' : 'none' }}
                                    title={
                                        thread.status === 'completed'
                                            ? 'Mark as pending'
                                            : 'Mark as completed'
                                    }
                                >
                                    {thread.threadName}
                                </span>
                            </h3>
                        </div>
                        <div className="footer">
                            <div>
                                <button
                                    className="primary"
                                    onClick={() => (setStatus(thread.status), startEditing(thread.id))}
                                >
                                    <FaPen />
                                </button>
                                <button
                                    className="danger"
                                    onClick={() => onDeleteThread(thread.id)}
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

export default EditThread
