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
    const columnsForProduct =
        [
            "id",
            "name",
            "category_number",
            "category_name",
            "characteristic"
        ]

    const [open, setOpen] = React.useState(false);
    const whatColumn = (column, row) => {
        return row[column];
    }
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
                                component="th"
                                scope="row">
                                {whatColumn(column, row)}
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
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {
                                            columnsForProduct.map((colTitle, index) =>(
                                                <TableCell key={index}>{colTitle}</TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        columnsForProduct.map((column, index) => (
                                            <TableCell
                                                    align="left"
                                                    component="th"
                                                    scope="row">
                                                    {whatColumn(column, row.product)}
                                                </TableCell>

                                            )
                                        )
                                    }
                                    {/*{row.product.map((productRow) => (*/}
                                    {/*    <TableRow key={productRow.id}>*/}
                                    {/*        <TableCell component="th" scope="row">*/}
                                    {/*            {productRow.id}*/}
                                    {/*        </TableCell>*/}
                                    {/*        <TableCell>{productRow.name}</TableCell>*/}
                                    {/*        /!*<TableCell align="right">{productRow.amount}</TableCell>*!/*/}
                                    {/*        /!*<TableCell align="right">*!/*/}
                                    {/*        /!*    {Math.round(productRow.amount * row.price * 100) / 100}*!/*/}
                                    {/*        /!*</TableCell>*!/*/}
                                    {/*    </TableRow>*/}
                                    {/*))}*/}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

//
// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };
export default function CollapsibleTable({columnNames, rows}) {
    // const capitalizeFirsLetter = (label) =>
    //     label.charAt(0).toUpperCase() + label.slice(1);

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
                                    {/*{capitalizeFirsLetter(col)}*/}
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
