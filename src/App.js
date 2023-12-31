import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";
import { HeaderButtons } from "./components/HeaderButtons";
import { Reservation } from "./pages/Reservation.js";
import { ListGyms } from "./pages/ListGyms.js";
import { ListCourses } from "./pages/ListCourses.js";
import { ListReservations } from "./pages/ListReservations.js";

function App() {
  const username = useSelector((state) => state.sessionInfo.user?.username);
  //default view page
  const [webpage, setWebpage] = useState(username ? "homepage" : "login");

  return (
    <div className="App">
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <p style={{ color: "white" }}>
          Utente loggato: {username || "nessuno..."}
        </p>
        <HeaderButtons username={username} setWebpage={setWebpage} />

        {webpage === "login" && <LoginPage changePage={setWebpage} />}
        {webpage === "homepage" && (
          <Typography color={"white"} marginTop={"20px"}>
            "Questa è la pagina HomePage, naviga con i pulsanti qui sopra!"
          </Typography>
        )}
        {webpage === "gyms" && <ListGyms />}
        {webpage === "courses" && <ListCourses />}
        {webpage === "reservations" && <ListReservations />}
        {webpage === "newres" && <Reservation changePage={setWebpage} />}
      </SnackbarProvider>
    </div>
  );
}

export default App;
