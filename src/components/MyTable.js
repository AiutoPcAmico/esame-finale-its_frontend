import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import "./components.css";

function MyTable({
  dataTable,
  columnsTable,
  searchVisible = true,
  hasEvent = false,
  checkboxEvent,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
  }, [search]);

  return (
    <Paper className="table">
      {searchVisible && (
        <div className="searchField">
          <Typography>
            Cerca {columnsTable[0].label}:&nbsp;&nbsp;&nbsp;
          </Typography>

          <TextField
            id="standard-basic"
            label={columnsTable[0].label}
            variant="outlined"
            size="small"
            value={search}
            onChange={(text) => {
              setSearch(text.target.value);
            }}
          />
        </div>
      )}
      <TableContainer sx={{ maxHeight: "100vh" }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {hasEvent && (
                <TableCell
                  key={"action"}
                  align={"left"}
                  style={{ width: "60" }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>Seleziona</Typography>
                </TableCell>
              )}
              {columnsTable.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: column.minWidth }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable &&
              dataTable.length > 0 &&
              dataTable
                .filter((row) => {
                  return row.name.toLowerCase().includes(search.toLowerCase());
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
                      {hasEvent && (
                        <TableCell key={"action"} align={"left"}>
                          <Checkbox
                            onChange={(event) => {
                              console.log(event.target.checked);
                              checkboxEvent({
                                data: row,
                                isChecked: event.target.checked,
                              });
                            }}
                            size="small"
                          />
                        </TableCell>
                      )}
                      {columnsTable.map((column) => {
                        const value = row[column.id];

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value, row) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={
          dataTable?.filter((row) => {
            return row.name.toLowerCase().includes(search.toLowerCase());
          }).length || 0
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export { MyTable };
