'use client'
import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { collection, addDoc, getFirestore, Firestore, getDocs, deleteDoc, doc } from 'firebase/firestore';
import firebaseApp from '../lib/firebase/firebaseinit';

interface Task {
    id: string;
    task: string;
}

function ToDoComponent() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [db, setDb] = useState<Firestore | null>(null);

    useEffect(() => {
        const dbInstance = getFirestore(firebaseApp);
        setDb(dbInstance);
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            if (!db) return;
            setLoading(true);
            try {
                const tasksCollection = collection(db, 'tasks');
                const querySnapshot = await getDocs(tasksCollection);
                const taskData = querySnapshot.docs.map(doc => ({ id: doc.id, task: doc.data().task }));
                setTasks(taskData);
            } catch (error) {
                setError('Error fetching tasks');
            }
            setLoading(false);
        };

        fetchTasks();
    }, [db]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (task.trim() === '') {
            return;
        }

        try {
            if (db) {
                const tasksCollection = collection(db, 'tasks');
                const docRef = await addDoc(tasksCollection, { task }); // Capture the reference of the added document
                setTasks(prevTasks => [...prevTasks, { id: docRef.id, task }]); // Update tasks state with the new task
                setTask('');
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleDelete = async (taskId: string) => {
        try {
            if (db) {
                const tasksCollection = collection(db, 'tasks');
                await deleteDoc(doc(tasksCollection, taskId));
                setTasks(prevTasks => prevTasks.filter(item => item.id !== taskId));
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const logout = () => {
        const auth = getAuth(firebaseApp);
        signOut(auth)
            .then(() => {
                console.log("User signed out");
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };

    return (
        <div>
            <h1 className='text-4xl text-center font-bold mt-10'>Todo list </h1>
            <form onSubmit={handleSubmit} className='flex justify-center mt-6'>
                <input value={task} onChange={(e) => setTask(e.target.value)} type="text" className='border-2 text-2xl text-center border-black' />
                <button className='border-2 border-black px-6 bg-blue-600 text-xl py-1 text-white font-bold'>Add</button>
                <button onClick={logout} className='border-2 ml-4 border-black px-2 bg-blue-600 text-xl py-1 text-white font-bold'>Log out</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <div className='ml-4 mt-6 text-bold text-3xl'>
                {tasks.map((t) => (
                    <div key={t.id}>
                        <h1>{t.task}
                            <button onClick={() => handleDelete(t.id)} className='border-2 border-black px-6 bg-blue-600 text-xl ml-8 py-1 text-white font-bold'>Delete</button>
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ToDoComponent;
