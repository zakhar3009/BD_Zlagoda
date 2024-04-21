
import "../../css/Shop.css";

export default function TableForPrint({columnNames, rows}) {
    return (
        <div className="print-only">
            <label className="text-4xl m-4">Report</label>
            <div className="px-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead
                    className="text-xs text-gray-700 bg-gray-200 border-b-2 border-gray-400">
                <tr>
                    {columnNames.map((colTitle, idx) => (
                        <th className="py-2"
                            key={idx}>{colTitle}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <tr className="border-b bg-gray-200"
                        key={index}>
                        {columnNames.map((colTitle, idx) => (
                            <td
                                key={idx}
                            >
                                {String(row[colTitle])}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            {/*<table>*/}
            {/*    <thead>*/}
            {/*    <tr>HHH</tr>*/}
            {/*    <tr>*/}

            {/*        /!*{columnNames.map((col) =>{*!/*/}
            {/*        /!*    <th>{col}</th>*!/*/}
            {/*        /!*})}*!/*/}

            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    /!*{*!/*/}
            {/*    /!*    rows.map( (row, index)=>(*!/*/}
            {/*    /!*        <tr key={index}>*!/*/}
            {/*    /!*            <td>{row}</td>*!/*/}
            {/*    /!*        </tr>*!/*/}
            {/*    /!*    )) }*!/*/}
            {/*    </tbody>*/}
            {/*</table>*/}
            {/*<h6></h6>*/}
            {/*<div className="row">*/}
            {/*    <div className="col-md-12">*/}
            {/*        <h5 className="mt-2">User List</h5>*/}
            {/*        <div  style={{width:'100%'}}>*/}
            {/*            <table className="table table-bordered" >*/}
            {/*                <thead>*/}
            {/*                <tr>*/}
            {/*                    {columnNames.map((col) =>{*/}
            {/*                        <th>{col}</th>*/}
            {/*                    })}*/}

            {/*                </tr>*/}
            {/*                </thead>*/}
            {/*                <tbody>*/}
            {/*                /!*{*!/*/}
            {/*                /!*    rows.map( (row, index)=>(*!/*/}
            {/*                /!*        <tr key={index}>*!/*/}
            {/*                /!*            <td>{row}</td>*!/*/}
            {/*                /!*        </tr>*!/*/}
            {/*                /!*    )) }*!/*/}
            {/*                </tbody>*/}
            {/*            </table>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}
