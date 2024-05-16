'use client'
import React, { useEffect, useState } from 'react';
import ToDoComponent from './page'; // Adjusted the import to follow JavaScript naming conventions
import Signin from '../Signin/page';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth, Auth } from 'firebase/auth';
import firebaseApp from '@/app/lib/firebase/firebaseinit';

function Layout({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [auth, setAuth] = useState<Auth | null>(null);

    useEffect(() => {
        const authInstance = getAuth(firebaseApp);
        setAuth(authInstance);

        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        isAuthenticated ? children : <Signin />
    );
}

export default Layout; // Adjusted the export to match the component name
