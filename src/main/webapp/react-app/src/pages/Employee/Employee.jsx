import React, { useEffect, useState } from "react";
import { employeesTableMap } from "../../constants/EmployeesCommandMap.js";
import MatTable from "../../components/table/MatTable.jsx";

export default function Employee({ command }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="px-8 py-4">
      <div className="grid">
        {!isLoading && (
          <MatTable
            columnNames={employeesTableMap.get(command)}
            rows={data}
            deleteFunc={deleteEmployee}
            deleteProperty={"id"}
          ></MatTable>
        )}
      </div>
    </main>
  );
}
