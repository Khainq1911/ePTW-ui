import { Button, CircularProgress, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { PropsForm } from "../../types/auth.type";


export default function LoginForm({
  handleUpdateValue,
  loading,
  handleLogin,
}: PropsForm) {
  return (
    <div>
      <form className="grid grid-cols-1 gap-4" onSubmit={handleLogin}>
        <TextField
          onChange={handleUpdateValue}
          name="username"
          label="Username"
          variant="outlined"
          required
        />

        <TextField
          onChange={handleUpdateValue}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          required
        />

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
        </Button>
      </form>

      <p className="mt-2 text-sm text-gray-600 text-center">
        Don't have an account?
        <Link
          to="/register"
          className="text-blue-500 hover:underline hover:text-blue-700 ml-1"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
