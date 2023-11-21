import { useEffect, useState } from "react";
import { Confirmation } from "../components/Confirmation";
import { MyDialogMessage } from "../components/MyDialogMessage";
import { makeId } from "../utils/makeId";
import { ListCourses } from "./ListCourses";
import { ListGyms } from "./ListGyms";
import { putReservation } from "../apis/indexAppApi";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

function Reservation({ changePage }) {
  const [gym, setGym] = useState([]);
  const [course, setCourse] = useState(null);
  const [openedSection, setOpenedSection] = useState(0);
  const [finalMessage, setFinalMessage] = useState();
  const username = useSelector((state) => state.sessionInfo.user?.username);

  async function handleClose() {
    console.log("chiusura");
    const value = await putReservation(username, gym.key, course.key);
    if (value.isError) {
      enqueueSnackbar(
        "Si è verificato un errore durante il salvataggio!  " + value.data,
        {
          variant: "warning",
          autoHideDuration: 5000,
          preventDuplicate: true,
        }
      );
    } else {
      enqueueSnackbar("Salvataggio avvenuto con successo! ", {
        variant: "success",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
    }
    // for debugging
    // setOpenedSection(3);
    changePage("homepage");
  }

  useEffect(() => {
    if (openedSection === 3) {
      var msg = [];
      msg[0] = "Complimenti! La prenotazione è stata effettuata!";
      msg[1] = "Per accedere, utilizza il seguente codice: ";
      msg[2] =
        "----> " +
        course.key +
        "-" +
        gym.name.substr(0, 2) +
        "-" +
        makeId(4) +
        " <----";
      msg[3] = "Grazie per aver usato il nostro software!";

      setFinalMessage(msg);
    }
  }, [course, gym, openedSection]);
  return (
    <div className="tablePage">
      <div style={{ maxWidth: "90%" }}>
        {openedSection === 0 && (
          <ListCourses
            isSelecting={true}
            setOpenedSection={setOpenedSection}
            confirmation={(passed) => {
              setCourse(passed);
            }}
          />
        )}

        {openedSection === 1 && (
          <ListGyms
            isSelecting={true}
            setOpenedSection={setOpenedSection}
            confirmation={(passed) => {
              setGym(passed);
            }}
          />
        )}

        {console.log(openedSection)}
        {openedSection === 2 && (
          <Confirmation
            setOpenedSection={setOpenedSection}
            course={course}
            gym={gym}
          />
        )}

        {openedSection === 3 && (
          <MyDialogMessage
            onlyOk={true}
            text={finalMessage}
            isOpen={true}
            title={"Ritiro"}
            returnMessage={handleClose}
          />
        )}
      </div>
    </div>
  );
}

export { Reservation };
