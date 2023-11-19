import { useEffect, useState } from "react";
import { MyDialogMessage } from "./MyDialogMessage";

function Confirmation({ products, location, onConfirm, setOpenedSection }) {
  const [message, setMessage] = useState("");

  function useConfirm(value) {
    if (value) {
      setOpenedSection(3);
    } else {
      setOpenedSection(1);
    }
  }

  useEffect(() => {
    //on load or changing products, i'll recalculate the total price
    var localMes = "Confermi l'acquisto di: - \n";
    products.map((single) => {
      return (localMes = localMes + single.key + "   -   ");
    });

    var total = products.reduce((total, single) => total + single.price, 0);
    console.log(total);

    localMes =
      localMes +
      " al prezzo di " +
      total +
      " €? Ritirerai la spesa presso: " +
      location.name;
    setMessage(localMes);
    console.log({ localMes });
  }, [products, location.name]);

  return (
    <div>
      <MyDialogMessage
        onlyOk={false}
        text={message}
        isOpen={true}
        title={"Conferma"}
        returnMessage={useConfirm}
      />
      ;
    </div>
  );
}

export { Confirmation };
