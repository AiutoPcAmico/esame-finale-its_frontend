import { useEffect, useState } from "react";
import { MyDialogMessage } from "./MyDialogMessage";

function Confirmation({ products, location, onConfirm, setOpenedSection }) {
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
    //on load or changing products, i'll recalculate the total price
    var localMes = [];
    localMes[0] = "Confermi l'acquisto di:";
    localMes[1] = "";
    products.map((single) => {
      return (localMes[1] = localMes[1] + single.key + "   -   ");
    });

    var total = products.reduce((total, single) => total + single.price, 0);
    console.log(total);

    localMes[2] = " al prezzo di " + total.toFixed(2) + " €?";
    localMes[3] = "Ritirerai la spesa presso: " + location.name;
    setMessage(localMes);
    console.log({ localMes });
    setIsOpened(true);
  }, [products, location.name]);

  return (
    <div>
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
