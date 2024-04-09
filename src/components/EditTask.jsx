import { useState } from 'react'

function EditTask() {

    const [editingTasks, setEditingTasks] = useState({})
    const [taskChanges, setTaskChanges] = useState({})
    const [status, setStatus] = useState(null);
    const [dueDate, setDueDate] = useState(null)
    const [dateError, setDateError] = useState({ id: '', error: ''})
    const [taskError, setTaskError] = useState({ id: '', error: ''})

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
            [id]: tasks.find((task) => task.id === id)?.task,
        }));

        setStatus(tasks.find((task) => task.id === id)?.status);

        setDueDate(formattedDueDate);

        setTimeout(() => {
            const textarea = document.getElementById(`task-${id}`);
            if (textarea) {
            textarea.focus();
            // Set the selection range to the end of the text
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
            }
        }, 0);
    };
    
    const stopEditing = (id) => {
        setEditingTasks({
          ...editingTasks,
          [id]: false,
        });
        setTaskError({ id: '', error: ''});
        setDateError({ id: '', error: ''});
    };
    
    const handleEditFormSubmit = (e, id) => {
        e.preventDefault();
    
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
        } else if (new Date(dueDate) < new Date()) {
          setDateError({
            ...dateError,
            id: id,
            error: 'Due date cannot be in the past!',
          });
        } else {
          editTask(id, taskChanges[id], formattedDueDate, status);
          stopEditing(id);
        }
    };

    return (
        <div>
        
        </div>
    )
}

export default EditTask
