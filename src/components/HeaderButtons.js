import { Button } from "@mui/material";
import { MyDialogMessage } from "./MyDialogMessage";
import { useDispatch } from "react-redux";
import { destroySession } from "../stores/sessionInfo";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

function HeaderButtons({ username, setWebpage }) {
  const [dialogOpened, setDialogOpened] = useState(false);
  const dispatch = useDispatch();

  function doLogout(result) {
    if (result) {
      dispatch(destroySession());

      //display logout confirmation
      enqueueSnackbar("Logout effettuato con successo! ", {
        variant: "warning",
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      setWebpage("homepage");
    } else {
      //nothing
    }

    setDialogOpened(false);
  }

  return (
    <div style={{ margin: "10px 0px 40px 0px" }}>
      {!username && (
        <Button
          variant="contained"
          style={{ marginLeft: "10px" }}
          color={"success"}
          onClick={() => setWebpage("login")}
        >
          Vai alla pagina di login
        </Button>
      )}
      {username && (
        <Button
          variant="contained"
          style={{ marginLeft: "10px" }}
          color={"warning"}
          onClick={() => {
            setDialogOpened(true);
          }}
        >
          Effettua il logout
        </Button>
      )}
      {username && (
        <Button
          variant="contained"
          style={{ marginLeft: "10px" }}
          disabled={!username}
          color={"success"}
          onClick={() => setWebpage("gyms")}
        >
          Visualizza palestre
        </Button>
      )}
      {username && (
        <Button
          variant="contained"
          style={{ marginLeft: "10px" }}
          disabled={!username}
          color={"success"}
          onClick={() => setWebpage("courses")}
        >
          Visualizza Corsi
        </Button>
      )}
      {username && (
        <Button
          variant="contained"
          style={{ marginLeft: "10px" }}
          disabled={!username}
          color={"success"}
          onClick={() => setWebpage("reservations")}
        >
          Visualizza Prenotazioni
        </Button>
      )}
      <Button
        variant="contained"
        style={{ marginLeft: "10px" }}
        color={"primary"}
        onClick={() => setWebpage("homepage")}
      >
        Vai alla HomePage
      </Button>

      {username && (
        <Button
          variant="contained"
          style={{ marginLeft: "10px" }}
          disabled={!username}
          color={"primary"}
          onClick={() => setWebpage("newres")}
        >
          Vai Esegui prenotazione
        </Button>
      )}

      <MyDialogMessage
        isOpen={dialogOpened}
        returnMessage={doLogout}
        text={[
          "Vuoi davvero effettuare il logout?",
          "Per confermare, seleziona sotto o annulla.",
        ]}
        title={"Logout"}
        key={"logout"}
        onlyOk={false}
      />
    </div>
  );
}

export { HeaderButtons };
