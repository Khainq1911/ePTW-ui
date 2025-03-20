import logo from "../assets/permit.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginService, registerService } from "../services/auth.service";
import { useNotification } from "../hooks/useNotify";
import { FormDataDto } from "../types/auth.type";
import LoginForm from "../components/auth/login";
import RegisterForm from "../components/auth/register";

export default function Login() {
  const { notify } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState<FormDataDto>({});
  const [loading, setLoading] = useState<boolean>(false);
  const handleUpdateValue = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginService(formData);
      localStorage.setItem("accessToken", res.accessToken);
      navigate("/");
      notify("Login successful!", "success", "Success");
    } catch (err: any) {
      notify(err.response?.data.message || "Login failed!", "error", "Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;
      if (confirmPassword !== payload.password) {
        notify("Passwords do not match. Please try again.", "error", "Error");
        setLoading(false);
        return;
      }
      const res = await registerService(payload);
      notify(res.status || "Register successful!", "success","Success");
      navigate("/login");
    } catch (err: any) {
      notify(
        err.response?.data.message || "Register failed! Try again",
        "error",
        "Error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname.includes("login")) {
      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
  }, [location.pathname]);
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#E8E8E8] p-4">
      <div className="bg-white w-full max-w-[800px] rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 place-content-center place-items-center p-8 gap-4">
        <img
          src={logo}
          alt="logo"
          className="max-w-[200px] w-full h-auto object-contain"
        />

        <div className="w-full">
          <div className="mb-4">
            <h1 className="text-center text-3xl font-bold text-blue-700">
              Welcome!
            </h1>
            {isSignIn ? (
              <h2 className="text-center text-lg text-blue-600">
                Sign in to your Account
              </h2>
            ) : (
              <h2 className="text-center text-lg text-blue-600">
                Please register to login
              </h2>
            )}
          </div>

          {isSignIn ? (
            <LoginForm
              handleUpdateValue={handleUpdateValue}
              handleLogin={handleLogin}
              
              loading={loading}
            />
          ) : (
            <RegisterForm
              handleUpdateValue={handleUpdateValue}
              handleSignUp={handleSignUp}
            
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
