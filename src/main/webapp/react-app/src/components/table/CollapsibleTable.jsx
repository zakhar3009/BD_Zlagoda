import * as React from 'react';
import PropTypes from 'prop-types';
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


function Row({row, columns}) {
    const promProductCols =
        [
            "UPC",
            "product_id",
            "category_number",
            "characteristic",
            "sellingPrice",
            "productsNumber",
        ]
    let promProduct = undefined;
    if(row.promStoreProduct) {
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

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
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
                                scope="row">
                                {row[column]}
                            </TableCell>
                        )
                    )
                }
            </TableRow>

            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>

                                    <Typography variant="h6" gutterBottom component="div">
                                        Promotional Product
                                    </Typography>
                            {row.promStoreProduct &&

                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    promProductCols.map((colTitle, index) => (
                                                        <TableCell key={index}>{colTitle}</TableCell>
                                                    ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                promProductCols.map((column, index) => (
                                                        <TableCell
                                                            key={index}
                                                            align="left"
                                                            scope="row">
                                                            {promProduct[column]}
                                                        </TableCell>

                                                    )
                                                )
                                            }
                                        </TableBody>
                                    </Table>

                            }
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable({columnNames, rows}) {
    const capitalizeFirsLetter = (label) =>
        label.charAt(0).toUpperCase() + label.slice(1);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        {columnNames.map((col, index) =>
                            (
                                <TableCell key={index}
                                           align="center"
                                           className="font-bold">
                                    {capitalizeFirsLetter(col)}
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
