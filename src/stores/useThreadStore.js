import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useThreadStore = create((set, get) => ({
    threads: JSON.parse(localStorage.getItem('threads')) || [],

    setThreads: (threads) => {
        set({ threads });
        localStorage.setItem('threads', JSON.stringify(threads));
    },

    addThread: (threadName) => {
        const newThread = {
            id: uuidv4(),
            threadName,
            timestamp: new Date().toISOString(),
            status: 'to-do',
            threadItems: [],
        };
        const threads = [...get().threads, newThread];
        set({ threads });
        localStorage.setItem('threads', JSON.stringify(threads));
    },

    addThreadItem: (threadId, content) => {
        const threads = get().threads.map(thread => {
            if (thread.id === threadId) {
                const newItem = { id: uuidv4(), content, timestamp: new Date().toISOString(), children: [], status: 'pending' };
                return { ...thread, threadItems: [...thread.threadItems, newItem] };
            }
            return thread;
        });
        set({ threads });
        localStorage.setItem('threads', JSON.stringify(threads));
    },

    addChildItem: (threadId, parentId, content) => {
        const threads = get().threads.map(thread => {
            if (thread.id === threadId) {
                const updatedItems = thread.threadItems.map(item => {
                    if (item.id === parentId) {
                        const newChild = { id: uuidv4(), content, timestamp: new Date().toISOString(), status: 'pending' };
                        return { ...item, children: [...item.children, newChild] };
                    }
                    return item;
                });
                return { ...thread, threadItems: updatedItems };
            }
            return thread;
        });
        set({ threads });
        localStorage.setItem('threads', JSON.stringify(threads));
    },

    removeItem: (threadId, itemId, isChild, parentId) => {
        const threads = get().threads.map(thread => {
            if (thread.id === threadId) {
                if (isChild) {
                    const updatedItems = thread.threadItems.map(item => {
                        if (item.id === parentId) {
                            const updatedChildren = item.children.filter(child => child.id !== itemId);
                            return { ...item, children: updatedChildren };
                        }
                        return item;
                    });
                    return { ...thread, threadItems: updatedItems };
                } else {
                    const updatedItems = thread.threadItems.filter(item => item.id !== itemId);
                    return { ...thread, threadItems: updatedItems };
                }
            }
            return thread;
        });
        set({ threads });
        localStorage.setItem('threads', JSON.stringify(threads));
    },

    moveThreadToCompleted: (threadId) => {
        const threads = get().threads.map(thread => {
            if (thread.id === threadId) {
                return { ...thread, status: 'completed' };
            }
            return thread;
        });
        set({ threads });
        localStorage.setItem('threads', JSON.stringify(threads));
    },

    moveThreadToInProgress: (threadId) => {
        const threads = get().threads.map(thread => {
            if (thread.id === threadId) {
                return { ...thread, status: 'in-progress' };
            }
            return thread;
        });
        set({ threads });
        localStorage.setItem('threads', JSON.stringify(threads));
    },

    moveThreadToTodo: (threadId) => {
        const threads = get().threads.map(thread => {
            if (thread.id === threadId) {
                return { ...thread, status: 'to-do' };
            }
            return thread;
        });
        set({ threads });
        localStorage.setItem('threads', JSON.stringify(threads));
    },

    markThreadItemAsDone: (threadId, itemId) => {
        const threads = get().threads.map(thread => {
            if (thread.id === threadId) {
                const updatedItems = thread.threadItems.map(item => {
                    if (item.id === itemId) {
                        return { ...item, status: 'completed' };
                    }
                    return item;
                });
                return { ...thread, threadItems: updatedItems };
            }
            return thread;
        });
        set({ threads });
        localStorage.setItem('threads', JSON.stringify(threads));
    },

    unmarkThreadItemAsDone: (threadId, itemId) => {
        const threads = get().threads.map(thread => {
            if (thread.id === threadId) {
                const updatedItems = thread.threadItems.map(item => {
                    if (item.id === itemId) {
                        return { ...item, status: 'pending' };
                    }
                    return item;
                });
                return { ...thread, threadItems: updatedItems };
            }
            return thread;
        });
        set({ threads });
        localStorage.setItem('threads', JSON.stringify(threads));
    },

    removeCompletedThread: (threadId) => {
        const threads = get().threads.filter(thread => thread.id !== threadId);
        set({ threads });
        localStorage.setItem('threads', JSON.stringify(threads));
    }
}));

export default useThreadStore;
