import {useRef} from "react";
import {useReactToPrint} from "react-to-print";

export default function TableForPrint({columnNames, rows, ref}){

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h5 className="mt-2">User List</h5>
                    <div ref={ref} style={{width:'100%'}}>
                        <table className="table table-bordered" >
                            <thead className="bg-light">
                            <tr>
                                {
                                    columnNames.map((col)=>{
                                        <th>{col.label}</th>
                                    })
                                }
                            </tr>
                            </thead>
                            <tbody>
                            <tr><td>sjdsd</td></tr>
                            {/*{*/}
                            {/*    rows.map( (row, index)=>(*/}
                            {/*        <tr key={index}>*/}
                            {/*            <td>{row}</td>*/}
                            {/*        </tr>*/}
                            {/*    )) }*/}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}
