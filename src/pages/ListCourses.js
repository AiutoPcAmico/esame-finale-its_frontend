import { useEffect, useState } from "react";
import { MyTable } from "../components/MyTable.js";
import { getCourses } from "../apis/indexAppApi.js";
import { Alert, Button } from "@mui/material";

function ListCourses({ setOpenedSection, confirmation, isSelecting = false }) {
  const [list, setList] = useState([]);
  const [error, setError] = useState("Caricamento in corso...");
  const [selected, setSelected] = useState();

  function changeCourse(el) {
    console.log(el);
    setSelected(el);
  }

  const columns = [
    { id: "name", label: "Corso", minWidth: 170, type: "string" },
    { id: "key", label: "ID", minWidth: 60, type: "string" },
    {
      id: "duration",
      label: "Durata",
      minWidth: 60,
      type: "string",
      align: "left",
    },
    {
      id: "dateTime",
      label: "Data e Ora",
      minWidth: 150,
      type: "string",
      align: "left",
    },
    {
      id: "available",
      label: "Posti",
      minWidth: 60,
      type: "number",
      align: "left",
    },
  ];

  function createData(singleRes) {
    return {
      action: null,
      key: singleRes.id,
      name: singleRes.name,
      dateTime: singleRes.dateTime,
      available: singleRes.available,
      duration: singleRes.duration,
    };
  }

  useEffect(() => {
    //on page load, I'll retreieva all data from api
    getCourses().then((response) => {
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
            changeCourse(value);
          }}
          hasEvent={isSelecting}
        />

        <Button
          variant="contained"
          style={{ marginLeft: "10px" }}
          disabled={!selected}
          color={"success"}
          onClick={() => {
            confirmation(selected.data);
            setOpenedSection(1);
          }}
        >
          Prosegui
        </Button>
      </div>
      {error && (
        <Alert style={{ marginTop: "20px", width: "220px" }} severity="error">
          {error}
        </Alert>
      )}
    </div>
  );
}

export { ListCourses };
