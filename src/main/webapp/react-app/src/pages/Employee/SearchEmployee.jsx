import {useState} from "react";
import MatTable from "../../components/table/MatTable.jsx";
import {employeesTableMap} from "../../constants/EmployeesCommandMap.js";
import {toast} from "react-toastify";

export default function SearchEmployee() {
    const [surname, setSurname] = useState("");
    const [employees, setEmployees] = useState();
    const [isLoading, setLoading] = useState(true);

    const fetchEmployeesData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME",
                    surname: surname,
                })
            );
            const getAllEmployees = await response.json();
            setEmployees(getAllEmployees);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchEmployeesData();
    };

    const deleteEmployee = async (employeeId) => {
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
            await response.json();
            fetchEmployeesData();
            toast.success("Employee was removed!")
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    return (
        <div className="mb-6">
            <form
                onSubmit={handleFormSubmit}
                className="grid sm:grid-cols-2 gap-3 mb-4"
            >
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
                    rows={employees}
                    deleteFunc={deleteEmployee}
                    deleteProperty={"id"}
                    pathToCreateUpdate={"/post_update_employee"}
                ></MatTable>
            )}
        </div>
    );
}
