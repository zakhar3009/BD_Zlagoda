import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import {IoAddCircleSharp} from "react-icons/io5";
import {FaMinusCircle} from "react-icons/fa";

const headCells = [
    {
        id: 'name',
        align: 'left',
        label: 'Product name',
    },
    {
        id: 'upc',
        align: 'right',
        label: 'UPC',
    },
    {
        id: 'sellingPrice',
        align: 'right',
        label: 'Price',
    },
    {
        id: 'productsNumber',
        align: 'right',
        label: 'Amount',
    },
    {
        id: 'quantity',
        align: 'center',
        label: 'Quantity',
    },
];

function EnhancedTableHead(props) {
    const {onSelectAllClick, numSelected, rowCount} =
        props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding='normal'
                        className='min-w-32'
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable({tableRows, handleCreateCheck}) {
    const [rows, setRows] = useState(tableRows);
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    console.log(selected)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (row) => selected.findIndex((item) => row.UPC === item.UPC) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const onIncreaseQuantity = (event, row) => {
        event.stopPropagation();
        if (row.sellingAmount < row.productsNumber) {
            setRows(prevRows => prevRows.map(
                prevRow => prevRow.UPC === row.UPC ?
                    {...prevRow, sellingAmount: prevRow.sellingAmount + 1}
                    : prevRow)
            );
            setSelected(prevRows => prevRows.map(
                prevRow => prevRow.UPC === row.UPC ?
                    {...prevRow, sellingAmount: prevRow.sellingAmount + 1}
                    : prevRow)
            );
        }
        console.log(selected);
    }
    const onDecreaseQuantity = (event, row) => {
        event.stopPropagation();
        if (row.sellingAmount > 1) {
            setRows(prevRows => prevRows.map(
                prevRow => prevRow.UPC === row.UPC ?
                    {...prevRow, sellingAmount: prevRow.sellingAmount - 1}
                    : prevRow)
            );
            setSelected(prevRows => prevRows.map(
                prevRow => prevRow.UPC === row.UPC ?
                    {...prevRow, sellingAmount: prevRow.sellingAmount - 1}
                    : prevRow)
            );
            return;
        }
        setSelected(prevRows => prevRows.filter(prevRow => prevRow.UPC !== row.UPC));
        console.log(selected);
    }

    const calculateTotalPrice = () => {
        return selected.reduce((accumulator, curValue) => accumulator + (curValue.sellingAmount * curValue.sellingPrice), 0)
    }

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%'}}>
                <TableContainer>
                    <Table
                        sx={{minWidth: 500}}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.UPC}
                                        selected={isItemSelected}
                                        sx={{cursor: 'pointer'}}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.product.name}
                                        </TableCell>
                                        <TableCell align="right">{row.UPC}</TableCell>
                                        <TableCell align="right">{row.sellingPrice}</TableCell>
                                        <TableCell align="right">{row.productsNumber}</TableCell>
                                        <TableCell align="right">
                                            {isItemSelected && <div className="grid grid-cols-3">
                                                <div className="flex justify-end items-center">
                                                    <IoAddCircleSharp
                                                        className="text-green-600 text-3xl hover:text-opacity-85 active:text-opacity-70"
                                                        onClick={(event) => onIncreaseQuantity(event, row)}
                                                    />
                                                </div>
                                                <div className="flex justify-center items-center">
                                                    <span>{row.sellingAmount}</span>
                                                </div>
                                                <div className="flex justify-start items-center">
                                                    <FaMinusCircle
                                                        className="text-red-600 text-2xl hover:text-opacity-85 active:text-opacity-70"
                                                        onClick={(event) => onDecreaseQuantity(event, row)}
                                                    />
                                                </div>
                                            </div>}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <div className="flex justify-between items-center mt-3">
                <label>
                    Total price with vat: <span className="font-bold">{calculateTotalPrice() * 1.2}$</span>
                </label>
                <button
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handleCreateCheck(selected, calculateTotalPrice())}
                >
                    Create new check
                </button>
            </div>
        </Box>
    );
}
