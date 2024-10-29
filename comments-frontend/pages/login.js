import { useState } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Container } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("username", username);
      router.push("/");
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{ textAlign: "center", marginTop: "100px" }}
    >
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
      >
        Log In
      </Button>
    </Container>
  );
}
