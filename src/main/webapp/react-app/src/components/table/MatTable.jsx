import * as React from "react";
import {useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {MdDeleteOutline} from "react-icons/md";
import {GoGear} from "react-icons/go";
import DeleteModal from "../modals/DeleteModal";

export default function MatTable({
                                     columnNames,
                                     rows,
                                     deleteFunc,
                                     deleteProperty,
                                     pathToCreateUpdate
                                 }) {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [selectedItem, setSelectedItem] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
    };
    const handleClose = () => {
        setSelectedItem({});
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        ...columnNames.map((col) => {
            return {
                id: col.toLowerCase(),
                label: col,
                align: "center",
            };
        }),
        {id: "actions", label: "Actions", minWidth: 50, align: "center"},
    ];

    const capitalizeFirsLetter = (label) =>
        label.charAt(0).toUpperCase() + label.slice(1);

    const whatColumn = (column, row) => {
        const value = row[column.label];

        if (column.id === "actions") {
            return (
                <TableCell
                    className="flex flex-row justify-items-center items-center"
                    key={column.id}
                    align={column.align}
                >
                    <div className="flex flex-row justify-center items-center">
                        <GoGear
                            onClick={() => navigate("../" + row[deleteProperty] + pathToCreateUpdate)}
                            className="text-blue-700 hover:bg-blue-100 text-xl mr-1 rounded-md active:text-opacity-70"/>
                        <MdDeleteOutline
                            onClick={() => handleOpen(row)}
                            className="text-red-600 hover:bg-red-100 text-2xl rounded active:text-opacity-70"
                        />
                    </div>
                </TableCell>
            );
        }

        return (
            <TableCell key={column.id} align={column.align}>
                {value}
            </TableCell>
        );
    };

    return (
        <>
            <Paper className="w-full drop-shadow-xl overflow-hidden">
                <TableContainer className="w-screen table-for-print" sx={{maxHeight: 440}} >
                    <Table className="w-full table-for-print" stickyHeader aria-label="sticky table">
                        <TableHead className="rounded-full">
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        className="font-bold"
                                    >
                    <span className="font-black text-gray-700">
                      {capitalizeFirsLetter(column.label)}
                    </span>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column) => {
                                                return whatColumn(column, row);
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <DeleteModal
                open={open}
                handleClose={handleClose}
                item={selectedItem}
                deleteFunc={deleteFunc}
                deleteProperty={deleteProperty}
            />
        </>
    );
}
