import logo from '../assets/permit.png';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/ui/auth/login';
import RegisterForm from '../components/ui/auth/register';

export default function Login() {
    const location = useLocation();
    const [isSignIn, setIsSignIn] = useState(false);

    useEffect(() => {
        if (location.pathname.includes('login')) {
            setIsSignIn(true);
        } else {
            setIsSignIn(false);
        }
    }, [location.pathname]);
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#E8E8E8] p-4">
            <div className="bg-white w-full max-w-[800px] rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 place-content-center place-items-center p-8 gap-4">
                <img src={logo} alt="logo" className="max-w-[200px] w-full h-auto object-contain" />

                <div className="w-full">
                    <div className="mb-4">
                        <h1 className="text-center text-3xl font-bold text-blue-700">Welcome!</h1>
                        {isSignIn ? (
                            <h2 className="text-center text-lg text-blue-600">Sign in to your Account</h2>
                        ) : (
                            <h2 className="text-center text-lg text-blue-600">Please register to login</h2>
                        )}
                    </div>

                    {isSignIn ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </div>
    );
}
