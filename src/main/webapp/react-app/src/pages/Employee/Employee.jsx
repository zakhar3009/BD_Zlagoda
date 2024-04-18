import React, {useEffect, useRef, useState} from "react";
import { employeesTableMap } from "../../constants/EmployeesCommandMap.js";
import MatTable from "../../components/table/MatTable.jsx";
import {toast} from "react-toastify";
import { useReactToPrint } from 'react-to-print';
import TableForPrint from "@/components/table/TableForPrint.jsx";
export default function Employee({ command }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const fetchEmployeesData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:8080/controller?" +
          new URLSearchParams({
            command_name: command,
          })
      );
      const data = await response.json();
      setData(data);
      setIsLoading(false);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployeesData();
  }, [command]);

  const deleteEmployee = async (employeeId) => {
    console.log("deleting EMPLOYEE");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        command_name: "DELETE_EMPLOYEE",
      },
      body: JSON.stringify({
        id: employeeId,
      }),
    };
    try {
      const response = await fetch(
        "http://localhost:8080/controller",
        requestOptions
      );
      const data = await response.json();
      fetchEmployeesData();
      console.log(data);
      toast.success("Employee was removed!")
    } catch (err) {
      toast.error(`ERROR: ${err}`)
    }
  };
  const createPDF = () => {
    // Викликати друк таблиці до PDF
    componentRef.current();
  };

  return (
    <main className="px-8 py-4 h-screen bg-gradient-to-r from-violet-200 to-pink-200">
      <div className="grid" ref={componentRef} >
        {!isLoading && (
            <>
          <MatTable
            columnNames={employeesTableMap.get(command)}
            rows={data}
            deleteFunc={deleteEmployee}
            deleteProperty={"id"}
            pathToCreateUpdate={"/post_update_employee"}
          ></MatTable>
        {/*  <div style={{ display: 'none' }}> /!* Приховати таблицю для друку *!/*/}
        {/*<TableForPrint*/}
        {/*    columnNames={employeesTableMap.get(command)}*/}
        {/*    rows={data}*/}
        {/*    ref={componentRef}*/}
        {/*/>*/}
      {/*</div>*/}
      {/*<button onClick={createPDF}>To PDF</button>*/}
    </>
        )}
      </div>
      <button onClick={handlePrint}>To PDF</button>
    </main>
  );
}
