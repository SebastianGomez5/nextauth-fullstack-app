"use client";
import axios, {AxiosError} from "axios";
import {FormEvent,useState} from "react";
function LoginPage() {
    const [error, setError] = useState<string | undefined>();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            const res = await axios.post('/api/auth/signup', {
                name: formData.get('fullname'),
                email: formData.get('email'),
                password: formData.get('password'),
            });
            console.log('User registered:', res.data);
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                setError(error.response?.data?.error || 'An error occurred');
            } else {
                setError('An unexpected error occurred');
            }
        }

    }
    return (
        <div>
            
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500">{error}</p>}
                <h1>Signup Page</h1>
                <input type="text" 
                    placeholder="Username"
                    name="fullname"
                    className="bg-zinc-800 px-4 py-2 block mb-2"
                />
                <input type="email" 
                    placeholder="Email"
                    name="email"
                    className="bg-zinc-800 px-4 py-2 block mb-2"
                />
                <input type="password" 
                    placeholder="*********"
                    name="password"
                    className="bg-zinc-800 px-4 py-2 block mb-2"
                />
                <button type="submit" className="bg-indigo-500 px-4 py-2">Register</button>
            </form>
        </div>
    )
}

export default LoginPage;
