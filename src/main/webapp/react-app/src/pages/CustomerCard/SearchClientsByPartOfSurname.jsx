import {useState} from "react";
import {toast} from "react-toastify";
import MatTable from "@/components/table/MatTable.jsx";
import {customerCardTableMap} from "@/constants/CustomerCardCommandMap.js";
import {Roles} from "@/constants/auth/allowedRoles.js";
import useAuth from "@/hooks/auth/useAuth.js";

export default function SearchClientsByPartOfSurname({command}) {
    const { auth } = useAuth();
    const [query, setQuery] = useState("");
    const [clients, setClients] = useState();
    const [isLoading, setLoading] = useState(true);

    const fetchClientsData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: command,
                    query: query,
                })
            );
            const getAllClients = await response.json();
            setClients(getAllClients);
            setLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchClientsData();
    };

    const deleteClient = async (clientId) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                command_name: "DELETE_CLIENT",
            },
            body: JSON.stringify({
                id: clientId,
            }),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            await response.json();
            fetchClientsData();
            toast.success("Client was removed!")
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
                    id="default-input"
                    placeholder={command === "GET_CLIENTS_BY_PART_OF_SURNAME" ? "Surname" : "Percent"}
                    type={command === "GET_CLIENTS_BY_PART_OF_SURNAME" ? "text" : "number"}
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
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
                    columnNames={customerCardTableMap.get(
                        command
                    )}
                    rows={clients}
                    deleteFunc={deleteClient}
                    deleteProperty={"number"}
                    pathToCreateUpdate={"/post_update_client"}
                    editEnabled={true}
                    deleteEnabled={auth?.user?.role === Roles.MANAGER}
                ></MatTable>
            )}
        </div>
    );
}