import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const defaultTheme = createTheme();

export default function Form() {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  const passwordErrorMessage="La contrasena debe contener: \n - 8 caracteres \n - Almenos una letra mayúscula y una minúscula \n - Almenos un número\n"
  const usernameErrorMessage="El usuario no puede estar vacío\n"
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const { username, password } = {
      username: data.get("username"),
      password: data.get("password"),
    };
    if (!username.trim())
      return changeAlertState({ message: usernameErrorMessage, severity: "error" });
    if (!passwordRegex.test(password)) {
      return changeAlertState({ message: passwordErrorMessage, severity: "error" });
    }
    var res;
    try {
      switch (e.nativeEvent.submitter.id) {
        case "login":
          res = await axios.post("/api/user/login", { username, password });
          if(res)changeAlertState({ message: 'Logeo exitoso', severity: "success" })
          break;
        case "register":
          res = await axios.post("/api/user/register", { username, password });
          if(res)changeAlertState({ message: 'Registro exitoso', severity: "success" })
          break;
        default:
          break;
      }
    } catch (e) {
      changeAlertState({ message: e.request.responseText || 'Error interno, intente más tarde...,', severity: "error" });

    }
  };
  const [passwordErrorState, changePasswordState] = React.useState(false);
  const [usernameErrorState, changeUsernameState] = React.useState(false);
  const [alertState, changeAlertState] = React.useState({message:'',severity:'success'});
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Collapse in={!!alertState.message}>
              <Alert
                severity={alertState.severity}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      changeAlertState({message:'',severity:''});
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {alertState.message}
              </Alert>
            </Collapse>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              error={usernameErrorState}
              helperText={
                usernameErrorState
                  ? usernameErrorMessage
                  : ""
              }
              onChange={(e) => {
                changeUsernameState(!e.target.value.trim());
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordErrorState}
              onChange={(e) => {
                changePasswordState(!passwordRegex.test(e.target.value));
              }}
              helperText={
                passwordErrorState
                  ? passwordErrorMessage
                  : ""
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10%",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "45%" }}
                id="login"
              >
                Login
              </Button>
              <Button
                type="submit"
                sx={{ width: "45%" }}
                variant="contained"
                id="register"
              >
                Register
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
