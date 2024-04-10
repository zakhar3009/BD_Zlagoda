import { useState } from "react";
import MatTable from "../../components/table/MatTable.jsx";
import { employeesTableMap } from "../../constants/EmployeesCommandMap.js";

export default function SearchEmployee() {
  const [surname, setSurname] = useState("");
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME");
      const response = await fetch(
        "http://localhost:8080/controller?" +
          new URLSearchParams({
            command_name: "SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME",
            surname: surname,
          })
      );
      const getAllEmployeesOrder = await response.json();
      setData(getAllEmployeesOrder);
      console.log("DATA", data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(surname);
    fetchData();
  };

  return (
    <main className="px-8 py-2">
      <div className="mb-6">
        <form
          onSubmit={handleFormSubmit}
          className="grid sm:grid-cols-2 gap-3 mb-4"
        >
          {/* <label
            htmlFor="default-input"
            className="block mb-2 text-sm text-xl font-semibold text-gray-900"
          >
            Surname:
          </label> */}
          <input
            type="text"
            id="default-input"
            placeholder="Surname"
            value={surname}
            onChange={(event) => {
              setSurname(event.target.value);
            }}
            className="bg-gray-50 md:place-self-end sm:max-w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <button
            type="submit"
            className="text-white md:max-w-64 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Search
          </button>
        </form>
        {!isLoading && (
          <MatTable
            columnNames={employeesTableMap.get(
              "SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME"
            )}
            rows={data}
          ></MatTable>
        )}
        {/*{!isLoading && <h1>Not have employee with that with that surname</h1>}*/}
      </div>
    </main>
  );
}
