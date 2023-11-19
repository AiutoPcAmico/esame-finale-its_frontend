import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import "./pages.css";
import { postLogin } from "../apis/indexAppApi";
import { useDispatch } from "react-redux";
import { setSessionDetails, setSessionUser } from "../stores/sessionInfo";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";

function LoginPage({ changePage }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const [canISave, setCanISave] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [errorLogin, setErrorLogin] = useState(
    "Immetti nome utente e password!"
  );

  useEffect(() => {
    console.log("changed user proprieties");
    setErrorLogin("Immetti nome utente e password!");
    if (
      user.username !== "" &&
      user.password !== "" &&
      user.password.length > 5 &&
      (!isRegister || user.email !== "")
    ) {
      setCanISave(true);
    } else {
      setCanISave(false);
    }
  }, [user, isRegister]);

  async function executeCommand() {
    if (isRegister) {
      //if registration
      console.log("I'll call the API");
    } else {
      //if login
      const response = await postLogin(user.username, user.password);
      console.log(response);

      if (response.isError) {
        //if there is an error, i don't proceed
        setErrorLogin(response.messageError);
        setCanISave(false);
      } else {
        //if login ok , I'll save the token
        console.log("Login!");
        console.log(response.data.data);
        const user = jwtDecode(response.data.data);
        dispatch(
          setSessionDetails({
            sessionStarted: user.iat,
            sessionExpire: user.exp,
            sessionToken: response.data.data,
          })
        );

        dispatch(
          setSessionUser({
            username: user.username,
            role: user.role,
          })
        );

        setErrorLogin("Login effettuato con successo!");

        setCanISave(false);

        //display message
        enqueueSnackbar("Login effettuato con successo! ", {
          variant: "success",
          autoHideDuration: 5000,
          preventDuplicate: true,
        });
        changePage("homepage");
      }
    }
  }

  return (
    <div>
      <Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box className={"boxLogin"}>
            <Typography variant="h4">
              {isRegister ? "Registrati" : "Esegui il Login"}
            </Typography>
            <Box className={"boxLoginInternal"}>
              <div className="correctHeight">
                <TextField
                  required
                  id="username-input"
                  label="Username"
                  fullWidth
                  value={user.username}
                  error={user.username.length === 0}
                  onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
                  }}
                />
              </div>
              <div className="correctHeight">
                <TextField
                  required
                  id="password-input"
                  label="Password"
                  defaultValue=""
                  fullWidth
                  type="password"
                  error={user.password.length <= 5}
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                />
              </div>
              {isRegister && (
                <div className="correctHeight">
                  <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    defaultValue=""
                    fullWidth
                    type="email"
                    value={user.email}
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                  />
                </div>
              )}
              <div className="correctHeight">
                {
                  <Button
                    disabled={!canISave}
                    variant="contained"
                    color="success"
                    onClick={executeCommand}
                  >
                    Conferma
                  </Button>
                }
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ marginLeft: "15px" }}
                  onClick={() => {
                    setIsRegister(!isRegister);
                  }}
                >
                  {isRegister ? "Torna al login" : "Registrati"}
                </Button>
                {!canISave && (
                  <Alert style={{ marginTop: "20px" }} severity="error">
                    {errorLogin}
                  </Alert>
                )}
              </div>
              <div className="correctHeight"></div>
            </Box>
          </Box>
        </Container>
      </Fragment>
    </div>
  );
}

export { LoginPage };
