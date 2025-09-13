import { Button, CircularProgress, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import { loginService } from '../../../services/auth.service';
import { useNotification } from '../../../hooks/useNotify';


export default function LoginForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();
    const { notify } = useNotification();

    const handleUpdateValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await loginService(loginForm);
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            navigate('/');
            notify('Login successful!', 'success', 'Success');
        } catch (err: any) {
            notify('Login failed!', 'error', 'Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className="grid grid-cols-1 gap-4" onSubmit={handleLogin}>
                <TextField onChange={handleUpdateValue} name="username" label="Username" variant="outlined" required />

                <TextField
                    onChange={handleUpdateValue}
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    required
                />

                <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>
            </form>

            <p className="mt-2 text-sm text-gray-600 text-center">
                Don't have an account?
                <Link to="/register" className="text-blue-500 hover:underline hover:text-blue-700 ml-1">
                    Sign Up
                </Link>
            </p>
        </div>
    );
}
