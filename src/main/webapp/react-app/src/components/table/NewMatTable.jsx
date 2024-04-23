import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {MdDeleteOutline, MdOutlineDiscount, MdOutlineRemoveRedEye} from "react-icons/md";
import {GoGear} from "react-icons/go";
import {capitalizeFirsLetter} from "@/constants/utils/helpers.js";

export default function NewMatTable({
                                     columnNames,
                                     rows,
                                     onDeleteClick,
                                     onViewClick,
                                     onDiscountClick,
                                     onEditClick,
                                     discountEnabled,
                                     editEnabled,
                                     deleteEnabled,
                                 }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const getLineDiscount =(row) => {
        if(row.promotionalProduct)
        return <MdOutlineDiscount
            className="text-gray-300 text-xl mr-1 rounded-md"
        />
        else
            return <MdOutlineDiscount
                onClick={() => onDiscountClick(row)}
                className="cursor-pointer text-blue-700 hover:bg-blue-100 text-xl mr-1 rounded-md active:text-opacity-70"
            />
    }
    const getLineEdit =(row) => {
        if(row.promotionalProduct)
            return <GoGear
                className="text-gray-300 text-xl mr-1 rounded-md"/>
        else
            return <GoGear
                onClick={() => onEditClick(row)}
                className="text-blue-700 cursor-pointer hover:bg-blue-100 text-xl mr-1 rounded-md active:text-opacity-70"/>
    }
    const getLineRemove =(row) =>{
        if(row.productsNumber === 0)
            return  <MdDeleteOutline
            className="text-gray-300 text-2xl rounded"
        />
        else  return  <MdDeleteOutline
            onClick={() => onDeleteClick(row)}
            className="cursor-pointer text-red-600 hover:bg-red-100 text-2xl rounded active:text-opacity-70"
        />
    }


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
    ];

    const whatColumn = (column, row) => {
        const value = String(row[column.label]);

        if (column.id === "actions") {
            return (
                <TableCell
                    className="flex flex-row justify-items-center items-center"
                    key={column.id}
                    align={column.align}
                >
                    <div className="flex flex-row justify-center items-center">
                        {onDiscountClick && discountEnabled && getLineDiscount(row)}
                        {onEditClick && editEnabled && getLineEdit(row)}
                        {onViewClick &&
                            <MdOutlineRemoveRedEye
                                className="text-xl text-blue-700 hover:bg-blue-100 rounded-md active:text-opacity-70"
                                onClick={() => onViewClick(row)}
                            />
                        }
                        {onDeleteClick && deleteEnabled && getLineRemove(row)}
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
        <Paper className="w-full drop-shadow-xl overflow-hidden">
            <TableContainer className="w-screen table-for-print" sx={{maxHeight: 700}}>
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
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
