import { Button, CircularProgress, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNotification } from '../../../hooks/useNotify';
import { registerService } from '../../../services/auth.service';

export default function RegisterForm() {
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const { notify } = useNotification();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { confirmPassword, ...payload } = registerForm;
            if (confirmPassword !== payload.password) {
                notify('Passwords do not match. Please try again.', 'error', 'Error');
                setLoading(false);
                return;
            }
            const res = await registerService(payload);
            notify(res.status || 'Register successful!', 'success', 'Success');
            navigate('/login');
        } catch (err: any) {
            notify(err.response?.data.message || 'Register failed! Try again', 'error', 'Error');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterForm((prev: any) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <form onSubmit={handleSignUp} className="grid grid-cols-1 gap-4">
                <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    required
                    onChange={handleUpdateValue}
                    autoComplete="name"
                />
                <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    required
                    onChange={handleUpdateValue}
                    autoComplete="email"
                />
                <TextField
                    name="phone"
                    label="Phone"
                    variant="outlined"
                    required
                    onChange={handleUpdateValue}
                    autoComplete="tel"
                />
                <TextField
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    required
                    onChange={handleUpdateValue}
                    autoComplete="new-password"
                />
                <TextField
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    required
                    onChange={handleUpdateValue}
                    autoComplete="new-password"
                />
                <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                </Button>
            </form>

            <p className="mt-2 text-sm text-gray-600 text-center">
                Already have an account?
                <Link to="/login" className="text-blue-500 hover:underline hover:text-blue-700 ml-1">
                    Sign In
                </Link>
            </p>
        </div>
    );
}
