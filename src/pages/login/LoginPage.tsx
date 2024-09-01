import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../hooks/useLogin";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const handleShowPassChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <form
        style={{
          width: "100",
        }}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Вход
        </h1>
        <TextField
          error={error}
          fullWidth
          label="Login"
          required
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          error={error}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleShowPassChange}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Password"
          type={showPassword ? "text" : "password"}
          required
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          className={error ? "error" : ""}
        ></TextField>
        <Button
          onClick={() => {
            login(email, password);
          }}
          fullWidth
          variant="contained"
          type="submit"
          style={{
            height: "50px",
          }}
        >
          Войти
        </Button>
      </form>
    </div>
  );
};
