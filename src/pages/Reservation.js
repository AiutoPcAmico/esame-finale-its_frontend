import { useEffect, useState } from "react";
import { SelectProducts } from "../components/SelectProducts";
import { SelectMarket } from "../components/SelectMarket";
import { Confirmation } from "../components/Confirmation";
import { MyDialogMessage } from "../components/MyDialogMessage";
import { makeId } from "../utils/makeId";

function Reservation({ changePage }) {
  const [products, setProducts] = useState([]);
  const [market, setMarket] = useState(null);
  const [openedSection, setOpenedSection] = useState(0);
  const [finalMessage, setFinalMessage] = useState("");

  function handleClose() {
    changePage("homempage");
  }

  useEffect(() => {
    if (openedSection === 3)
      setFinalMessage(
        "Complimenti! La spesa è stata effettuata! Ritirala col seugente codice : " +
          makeId(7) +
          "       Grazie per aver usato il nostro software!"
      );
  }, [openedSection]);
  return (
    <div className="tablePage">
      <div style={{ maxWidth: "90%" }}>
        {openedSection === 0 && (
          <SelectProducts
            setOpenedSection={setOpenedSection}
            confirmation={(passed) => setProducts(passed)}
          />
        )}

        {(openedSection === 1 || openedSection === 2) && (
          <SelectMarket
            setOpenedSection={setOpenedSection}
            confirmation={(passed) => {
              setMarket(passed);
            }}
          />
        )}

        {openedSection === 2 && (
          <Confirmation
            setOpenedSection={setOpenedSection}
            products={products}
            location={market[0]}
            onConfirm={() => {
              changePage("homepage");
            }}
          />
        )}

        {openedSection === 3 && (
          <MyDialogMessage
            onlyOk={false}
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
