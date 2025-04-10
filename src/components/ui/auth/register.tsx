import { Button, CircularProgress, TextField } from "@mui/material";
import { PropsForm } from "../../../types/auth.type";
import { Link } from "react-router-dom";


export default function RegisterForm({
  handleUpdateValue,
  handleSignUp,
  loading,
}: PropsForm) {
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </Button>
      </form>

      <p className="mt-2 text-sm text-gray-600 text-center">
        Already have an account?
        <Link
          to="/login"
          className="text-blue-500 hover:underline hover:text-blue-700 ml-1"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
