import MatModal from "./MatModal/MatModal";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {salesColumnsMap} from "@/constants/SalesCommandMap.js";
import {IoIosClose} from "react-icons/io";
import TablePagination from "@mui/material/TablePagination";
import usePaginate from "@/hooks/pagination/usePaginate.jsx";
import TableBody from "@mui/material/TableBody";
import TableForPrint from "@/components/table/TableForPrint.jsx";
import {employeesTableMap} from "@/constants/EmployeesCommandMap.js";
import {useReactToPrint} from "react-to-print";

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

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

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
    console.log(sales)

    useEffect(() => {
        console.log("useEffect", open)
        if (open) getCheckInfo("GET_FULL_CHECK_BY_NUMBER");
    }, [open]);

    return (
        <MatModal open={open} handleClose={handleClose}>
            <div>
                <div className="flex justify-between items-center">
                    <label className="font-bold text-gray-500">Check: {selectedCheck.number}</label>
                    <IoIosClose onClick={handleClose}
                                className="text-gray-500 text-5xl hover:text-opacity-80 active:text-opacity-50"/>
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
                            {!isLoading && <TableBody>
                                {sales
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, idx) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                                                <TableCell>{row.storeProduct.product.name}</TableCell>
                                                <TableCell>{row.storeProduct.product.category.name}</TableCell>
                                                <TableCell>{row.productNumber}</TableCell>
                                                <TableCell>{row.sellingPrice}</TableCell>
                                                <TableCell>{row.sellingPrice * row.productNumber}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>}
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
                <div ref={componentRef}>
                    <TableForPrint
                        columnNames = {salesColumnsMap.get("SALES")}
                        rows={sales}
                    />
                </div>
                <div className="flex justify-content-end mt-2">
                    <button
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={handlePrint}>To PDF
                    </button>
                </div>

            </div>
        </MatModal>
    );
}
