'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, Auth } from 'firebase/auth'; // Import Auth type
import firebaseApp from '@/app/lib/firebase/firebaseinit';
import { useRouter } from 'next/navigation';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState<Auth | null>(null); // Specify Auth type for auth state
     const router= useRouter()

    useEffect(() => {
        // Initialize auth only once on component mount
        const authInstance = getAuth(firebaseApp);
        setAuth(authInstance);
    }, []); 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailValue = e.currentTarget.email.value;
        const passwordValue = e.currentTarget.password.value;

        if (auth) {
            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential: { user: any }) => {
                    const user = userCredential.user;
                    console.log('User signed up:', user);
                    router.push('/Signin')
                })
                .catch((error: any) => {
                    console.error('Error signing up:', error);
                });
        }
    };

    return (
        <div className="max-w-md mx-auto m-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-semibold">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 font-semibold">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
