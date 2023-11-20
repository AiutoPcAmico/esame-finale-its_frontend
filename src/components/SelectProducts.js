import { getProducts } from "../apis/indexAppApi";
import { useEffect, useState } from "react";
import { MyTable } from "../components/MyTable.js";
import { Button } from "@mui/material";

function SelectProducts({ confirmation, setOpenedSection }) {
  const [list, setList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  const columns = [
    {
      id: "name",
      label: "Nome",
      minWidth: 140,
      type: "string",
      align: "left",
    },
    {
      id: "type",
      label: "Tipo",
      minWidth: 140,
      type: "string",
      align: "left",
    },
    {
      id: "price",
      label: "Prezzo",
      minWidth: 80,
      type: "string",
      align: "left",
      format: (params) => params.toFixed(2) + " €",
    },
  ];

  function createData(singleRes) {
    return {
      key: singleRes.title,
      name: singleRes.title,
      type: singleRes.type,
      price: singleRes.price,
    };
  }

  useEffect(() => {
    //on page load, I'll retreieva all data from api
    getProducts().then((response) => {
      if (response.isError === false) {
        //is ok, i'll save all the data
        //preparing list
        const formattedData = response.data.data.map((single) => {
          return createData(single);
        });

        setList(formattedData);
        //setError(null);
      } else {
        //setError(response.messageError);
      }
      //setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log({ selectedList });
  }, [selectedList]);

  function selectedProduct(value) {
    console.log(value);
    var copy = JSON.parse(JSON.stringify(selectedList));

    if (value.isChecked) {
      copy.push(value.data);

      setSelectedList(copy);
    } else {
      //i remove the element
      const newArr = copy.filter(function (obj) {
        return obj.key !== value.data.key;
      });

      setSelectedList(newArr);
    }
  }

  return (
    <div>
      Seleziona i prodotti
      <MyTable
        dataTable={list}
        hasEvent
        columnsTable={columns}
        checkboxEvent={(value) => {
          selectedProduct(value);
        }}
      />
      <Button
        variant="contained"
        style={{ marginLeft: "10px" }}
        disabled={selectedList.length <= 0}
        color={"success"}
        onClick={() => {
          confirmation(selectedList);
          setOpenedSection(1);
        }}
      >
        Prosegui
      </Button>
    </div>
  );
}

export { SelectProducts };
