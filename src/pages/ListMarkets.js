import { useEffect, useState } from "react";
import { MyTable } from "../components/MyTable.js";
import { getMarkets } from "../apis/indexAppApi.js";
import { Alert } from "@mui/material";

function ListMarkets() {
  const [list, setList] = useState([]);
  const [error, setError] = useState("Caricamento in corso...");

  const columns = [
    { id: "name", label: "Ipermercato", minWidth: 170, type: "string" },
    {
      id: "type",
      label: "Tipo",
      minWidth: 80,
      type: "string",
      align: "left",
    },
    {
      id: "location",
      label: "Indirizzo",
      minWidth: 250,
      type: "string",
      align: "left",
    },
  ];

  function createData(singleRes) {
    return {
      action: null,
      key: singleRes.id,
      name: singleRes.name,
      type: singleRes.type,
      location: singleRes.location,
    };
  }

  useEffect(() => {
    //on page load, I'll retreieva all data from api
    getMarkets().then((response) => {
      if (response.isError === false) {
        //is ok, i'll save all the data
        //preparing list
        const formattedData = response.data.data.map((single) => {
          return createData(single);
        });

        setList(formattedData);
        setError(null);
      } else {
        setError(response.messageError);
      }
      //setIsLoading(false);
    });
  }, []);

  return (
    <div className="tablePage">
      <div style={{ maxWidth: "90%" }}>
        <MyTable columnsTable={columns} dataTable={list} searchVisible={true} />
      </div>
      {error && (
        <Alert style={{ marginTop: "20px", width: "220px" }} severity="error">
          {error}
        </Alert>
      )}
    </div>
  );
}

export { ListMarkets };
