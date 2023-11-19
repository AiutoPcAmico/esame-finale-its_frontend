import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { MyTable } from "./MyTable";
import { getMarkets } from "../apis/indexAppApi";

function SelectMarket({ setOpenedSection, confirmation }) {
  const [selectedMarket, setSelectedMarket] = useState([]);
  const [list, setList] = useState([]);

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
      key: singleRes.id,
      name: singleRes.name,
      type: singleRes.type,
      location: singleRes.location,
    };
  }

  function changeMarket(value) {
    console.log(value);
    var copy = JSON.parse(JSON.stringify(selectedMarket));

    if (value.isChecked) {
      copy.push(value.data);

      console.log({ copy });
      setSelectedMarket(copy);
    } else {
      //i remove the element
      const newArr = copy.filter(function (obj) {
        return obj.key !== value.data.key;
      });

      console.log({ newArr });
      setSelectedMarket(newArr);
    }
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
        // setError(null);
      } else {
        //setError(response.messageError);
      }
      //setIsLoading(false);
    });
  }, []);

  return (
    <div>
      Seleziona il punto di ritiro
      <MyTable
        dataTable={list}
        hasEvent
        columnsTable={columns}
        checkboxEvent={(value) => {
          changeMarket(value);
        }}
      />
      <Button
        variant="contained"
        style={{ marginLeft: "10px" }}
        disabled={selectedMarket.length !== 1}
        color={"success"}
        onClick={() => {
          confirmation(selectedMarket);
          setOpenedSection(2);
        }}
      >
        Prosegui
      </Button>
    </div>
  );
}

export { SelectMarket };
