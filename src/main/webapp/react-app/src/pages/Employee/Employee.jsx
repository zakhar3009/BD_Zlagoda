import React, { useEffect, useState } from "react";
import { employeesTableMap } from "../../constants/EmployeesCommandMap.js";
import MatTable from "../../components/table/MatTable.jsx";

export default function Employee({ command }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log(command);
        const response = await fetch(
          "http://localhost:8080/controller?" +
            new URLSearchParams({
              command_name: command,
            })
        );
        const data = await response.json();
        setData(data);
        setIsLoading(false);
        console.log(command);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [command]);

  return (
    <main className="px-8 py-4">
      <div className="grid">
        {!isLoading && (
          <MatTable
            columnNames={employeesTableMap.get(command)}
            rows={data}
          ></MatTable>
        )}
      </div>
    </main>
  );
}

// import React, { useEffect, useState } from "react";
// import {
//   employeesCommandMap,
//   employeesTableMap,
// } from "../../constants/EmployeesCommandMap.js";
// import MatTable from "../../components/table/MatTable.jsx";
// import SearchEmployee from "../../components/Forms/SearchEmployee.jsx";

// export default function Employee() {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [command, setCommand] = useState(null);
//   // const [isActive, setIsActive] = useState(false);
//   const [searchBySurname, setSearchBySurname] = useState(false);

//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       console.log(command);
//       const response = await fetch(
//         "http://localhost:8080/controller?" +
//           new URLSearchParams({
//             command_name: command,
//           })
//       );
//       const data = await response.json();
//       setData(data);
//       setIsLoading(false);
//       console.log(command);
//       console.log(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     if (command !== null) {
//       fetchData();
//     }
//   }, [command]);

//   const onBtnClick = (commandName) => {
//     if (commandName === "SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME")
//       setSearchBySurname(true);
//     else {
//       setSearchBySurname(false);
//       setCommand(commandName);
//     }
//   };

//   return (
//     <div className="grid grid-cols-3 gap-2">
//       {/*"block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600"*/}
//       <div className="w-48 text-sm font-medium text-white bg-gray-700 border border-indigo-500 rounded-lg">
//         {Array.from(employeesCommandMap.keys()).map((value, index) => {
//           return (
//             <a
//               href="#"
//               key={index}
//               onClick={() => onBtnClick(value)}
//               className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
//             >
//               {employeesCommandMap.get(value)}
//             </a>
//           );
//         })}
//       </div>
//       {!isLoading && !searchBySurname && (
//         <MatTable
//           columnNames={employeesTableMap.get(command)}
//           rows={data}
//         ></MatTable>
//       )}
//       {searchBySurname && <SearchEmployee />}
//     </div>
//   );
// }
