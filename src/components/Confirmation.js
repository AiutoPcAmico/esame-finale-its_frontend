import { useEffect, useState } from "react";
import { MyDialogMessage } from "./MyDialogMessage";

function Confirmation({ course, gym, onConfirm, setOpenedSection }) {
  const [message, setMessage] = useState("");
  const [isOpened, setIsOpened] = useState(false);

  function useConfirm(value) {
    setIsOpened(false);
    if (value) {
      setOpenedSection(3);
    } else {
      setOpenedSection(1);
    }
  }

  useEffect(() => {
    //on load, i'll recalulcate the message

    var localMes = [];
    console.log({ course, gym });
    localMes[0] = "Confermi la prenotazione del corso: " + course.name;
    localMes[1] = "presso la palestra: " + gym.name;
    localMes[2] = "per la data del " + course.dateTime + "?";

    setMessage(localMes);
    setIsOpened(true);
  }, [course, gym]);

  return (
    <div>
      <p>jjjj</p>
      <MyDialogMessage
        onlyOk={false}
        text={message}
        isOpen={isOpened}
        title={"Conferma"}
        returnMessage={useConfirm}
      />
      ;
    </div>
  );
}

export { Confirmation };
