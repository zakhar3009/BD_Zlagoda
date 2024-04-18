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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {productsTableMap} from "@/constants/ProductsCommandName.js";


function Row({row, columns}) {
    const [open, setOpen] = React.useState(false);
    const whatColumn = (column, row) => {
        return row[column];
    }
    return (
        <React.Fragment>
            <TableRow className="border-r-2 border-l-2 border-t-2 border-b-0" sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                {
                    columns.map((column, index) => (
                            <TableCell
                                align="right"
                                key={index}
                                component="th"
                                scope="row">
                                {whatColumn(column, row)}
                            </TableCell>
                        )
                    )
                }
            </TableRow>
            <TableRow className="border-r-2 border-l-2 border-b-2 border-t-0">
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Promotional Product
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {
                                            productsTableMap.get("GET_ALL_PRODUCTS").map((colTitle, index) =>
                                                <TableCell key={index}>{colTitle}</TableCell>
                                            )
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        productsTableMap.get("GET_ALL_PRODUCTS").map((column, index) => (
                                                <TableCell
                                                    key={index}
                                                    align="center"
                                                    component="th"
                                                    scope="row">
                                                    {whatColumn(column, row.product)}
                                                </TableCell>

                                            )
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable({columnNames, rows}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        {columnNames.map((col, index) =>
                            (
                                <TableCell key={index}
                                           align={"right"}
                                           className="font-bold">
                                    {col}
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <Row key={index} row={row} columns={columnNames}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
