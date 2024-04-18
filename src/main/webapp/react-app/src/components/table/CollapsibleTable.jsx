import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {MdDeleteOutline} from "react-icons/md";
import {storeProductsTableMap} from "@/constants/StoreProductsCommandName.js";
import {capitalizeFirsLetter} from "@/constants/utils/helpers.js";

function Row({row, columns, deleteStoreProduct,
                 deletePromStoreProduct,
                 createPromStoreProduct}) {
    let promProduct = undefined;

    if (row.promStoreProduct) {
        promProduct = {
            UPC: row.promStoreProduct.UPC,
            product_id: row.promStoreProduct.product.id,
            category_number: row.promStoreProduct.product.category.number,
            characteristic: row.promStoreProduct.product.characteristic,
            sellingPrice: row.promStoreProduct.sellingPrice,
            productsNumber: row.promStoreProduct.productsNumber
        };
    }

    const [open, setOpen] = React.useState(false);

    const showRowData = (column, idx) => {
        if (column !== "actions") {
            return (<td key={idx}>
                {promProduct[column]}
            </td>)
        }
        return (
            <td key={idx}>
                <MdDeleteOutline
                    key={idx}
                    onClick={() => deletePromStoreProduct(row.UPC)}
                    className="text-red-600 text-2xl rounded active:text-opacity-50"
                />
            </td>
        )
    }

    return (
        <React.Fragment>
            <TableRow className="border-t-2 border-l-2 border-r-2 border-gray-400"
                      sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton onClick={() => setOpen(!open)} aria-label="expand row" size="small">
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                {columns.map((column, index) => (
                        <TableCell
                            align="center"
                            key={index}
                            scope="row">
                            {row[column]}
                        </TableCell>
                    )
                )}
            </TableRow>
            <TableRow className="border-l-2 border-r-2 last:border-b-2 border-gray-400">
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            {row.promStoreProduct &&
                                <div className="bg-gray-200 px-4 py-2 rounded-xl">
                                    <div className="relative overflow-x-auto">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                            <thead
                                                className="text-xs text-gray-700 bg-gray-200 border-b-2 border-gray-400">
                                            <tr>
                                                {storeProductsTableMap.get("PROM_PRODUCT_COLUMNS").map((colTitle, idx) => (
                                                    <th className="py-2" key={idx}>{capitalizeFirsLetter(colTitle)}</th>
                                                ))}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr className="border-b bg-gray-200">
                                                {storeProductsTableMap.get("PROM_PRODUCT_COLUMNS").map((column, idx) =>
                                                    showRowData(column, idx))
                                                }
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                            {!row.promStoreProduct &&
                                <div className="bg-gray-200 px-4 py-2 w-80 rounded-xl text-center">
                                    <button
                                        onClick={() => createPromStoreProduct(row.UPC)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Make
                                        the product promotional
                                    </button>
                                </div>}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable({
                                             columnNames,
                                             rows,
                                             deleteStoreProduct,
                                             deletePromStoreProduct,
                                             createPromStoreProduct
                                         }) {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        {columnNames.map((col, index) =>
                            (
                                <TableCell key={index} align="center">
                                    <span className="font-black text-gray-700">
                                    {capitalizeFirsLetter(col)}
                                    </span>
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <Row deleteStoreProduct={deleteStoreProduct}
                             deletePromStoreProduct={deletePromStoreProduct}
                             createPromStoreProduct={createPromStoreProduct}
                             key={index} row={row}
                             columns={columnNames}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
