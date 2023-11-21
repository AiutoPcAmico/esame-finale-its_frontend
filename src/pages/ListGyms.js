import { useEffect, useState } from "react";
import { MyTable } from "../components/MyTable.js";
import { getGyms } from "../apis/indexAppApi.js";
import { Alert, Button } from "@mui/material";

function ListGyms({ setOpenedSection, confirmation, isSelecting = false }) {
  const [list, setList] = useState([]);
  const [error, setError] = useState("Caricamento in corso...");
  const [gym, setGym] = useState();

  function changeGym(el) {
    console.log(el);
    setGym(el);
  }

  const columns = [
    { id: "name", label: "Palestra", minWidth: 170, type: "string" },
    {
      id: "type",
      label: "Tipo",
      minWidth: 120,
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
      type: singleRes.typology,
      location: singleRes.location,
    };
  }

  useEffect(() => {
    //on page load, I'll retreieva all data from api
    getGyms().then((response) => {
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
        <MyTable
          columnsTable={columns}
          dataTable={list}
          searchVisible={true}
          checkboxEvent={(value) => {
            changeGym(value);
          }}
          hasEvent={isSelecting}
        />

        {isSelecting && (
          <Button
            variant="contained"
            style={{ marginLeft: "10px" }}
            disabled={!gym}
            color={"success"}
            onClick={() => {
              confirmation(gym.data);
              setOpenedSection(2);
            }}
          >
            Prosegui
          </Button>
        )}
      </div>
      {error && (
        <Alert style={{ marginTop: "20px", width: "220px" }} severity="error">
          {error}
        </Alert>
      )}
    </div>
  );
}

export { ListGyms };
