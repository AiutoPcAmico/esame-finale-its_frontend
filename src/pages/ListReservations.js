import { useEffect, useState } from "react";
import { MyTable } from "../components/MyTable.js";
import { getReservations } from "../apis/indexAppApi.js";
import { Alert } from "@mui/material";

function ListReservations() {
  const [list, setList] = useState([]);
  const [error, setError] = useState("Caricamento in corso...");

  const columns = [
    { id: "name", label: "Utente", minWidth: 110, type: "string" },
    {
      id: "gym",
      label: "Palestra",
      minWidth: 110,
      type: "string",
      align: "left",
    },
    {
      id: "course",
      label: "Corso",
      minWidth: 150,
      type: "string",
      align: "left",
    },
    {
      id: "dateTime",
      label: "Appuntamento",
      minWidth: 150,
      type: "string",
      align: "left",
    },
  ];

  function createData(singleRes) {
    return {
      action: null,
      key: singleRes.id,
      name: singleRes.user,
      gym: singleRes.gym,
      course: singleRes.course,
      dateTime: singleRes.dateTime,
    };
  }

  useEffect(() => {
    //on page load, I'll retreieva all data from api
    getReservations().then((response) => {
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

export { ListReservations };
