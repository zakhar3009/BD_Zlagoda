import MatModal from "./MatModal/MatModal";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {salesColumnsMap} from "@/constants/SalesCommandMap.js";
import {IoIosClose} from "react-icons/io";
import TablePagination from "@mui/material/TablePagination";
import usePaginate from "@/hooks/pagination/usePaginate.jsx";

export default function ViewCheckModal({
                                           selectedCheck,
                                           open,
                                           handleClose,
                                       }) {
    const {
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage
    } = usePaginate();

    console.log("CURRENT CHECK", selectedCheck)
    const [isLoading, setIsLoading] = useState(true);
    const [sales, setSales] = useState([]);
    const getCheckInfo = async (command) => {
        console.log("Made Request")
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: command,
                    check_number: selectedCheck.number
                })
            );
            const data = await response.json();
            setSales(data);
            setIsLoading(false);
            console.log("SALES FOR CHECK", data);
        } catch (err) {
            toast.error(err);
        }
    }

    useEffect(() => {
        console.log("useEffect", open)
        if (open) getCheckInfo("GET_FULL_CHECK_BY_NUMBER");
    }, [open]);

    return (
        <MatModal open={open} handleClose={handleClose}>
            <div className="max-w-7xl">
                <div className="flex justify-end items-center">
                    <IoIosClose onClick={handleClose}
                                className="text-gray-400 text-5xl hover:text-opacity-80 active:text-opacity-50"/>
                </div>
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{maxHeight: 440}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {salesColumnsMap.get("SALES").map((col, idx) => {
                                        return <TableCell key={idx}>{col}</TableCell>
                                    })}
                                </TableRow>
                            </TableHead>
                            {/*<TableBody>*/}
                            {/*    {sales*/}
                            {/*        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)*/}
                            {/*        .map((row) => {*/}
                            {/*            return (*/}
                            {/*                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>*/}
                            {/*                    {columns.map((column) => {*/}
                            {/*                        const value = row[column.id];*/}
                            {/*                        return (*/}
                            {/*                            <TableCell key={column.id} align={column.align}>*/}
                            {/*                                {column.format && typeof value === 'number'*/}
                            {/*                                    ? column.format(value)*/}
                            {/*                                    : value}*/}
                            {/*                            </TableCell>*/}
                            {/*                        );*/}
                            {/*                    })}*/}
                            {/*                </TableRow>*/}
                            {/*            );*/}
                            {/*        })}*/}
                            {/*</TableBody>*/}
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={sales.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </MatModal>
    );
}
