import MatTable from "@/components/table/MatTable.jsx";
import React, {useEffect, useRef, useState} from "react";
import useFilterChecks from "@/hooks/Checks/useFilterChecks.jsx";
import {checksTableMap} from "@/constants/ChecksCommandMap.js";
import Card from "./../../components/cards/Card.jsx";
import ViewCheckModal from "@/components/modals/ViewCheckModal.jsx";
import FormInput from "./../../components/inputs/FormInput.jsx";
import TableForPrint from "@/components/table/TableForPrint.jsx";
import {productsTableMap} from "@/constants/ProductsCommandMap.js";
import {useReactToPrint} from "react-to-print";
import {Roles} from "@/constants/auth/allowedRoles.js";
import {toast} from "react-toastify";
import useAuth from "@/hooks/auth/useAuth.js";


export default function SearchCheckByNumber() {
    const { auth } = useAuth();
    const [query, setQuery] = useState("");
    const [checks, setChecks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllChecks = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_CHECK_BY_NUMBER",
                    check_number: query
                })
            );
            const data = await response.json();
            setChecks([{
                number: data.number,
                employee: data.employee.name + " "+ data.employee.surname,
                customerCard: data.customerCard.customerName +" " + data.customerCard.customerSurname,
                printDate: data.printDate,
                sumTotal: data.sumTotal,
                vat: data.vat
            }]);
            setIsLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    const deleteCheck = async (checkID) => {
        console.log("deleting CHECK");
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                command_name: "DELETE_CHECK",
            },
            body: JSON.stringify({
                check_number: checkID,
            }),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            await response.json();
            fetchAllChecks();
            toast.success("Check was removed!")
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    // View Modal logic and print implementation
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const componentRef = useRef();
    const role = auth?.user?.role;

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const onOpenViewModal = (item) => {
        setSelectedItem(item);
        setViewModalOpen(true);
    }
    const onCloseViewModal = () => {
        setSelectedItem({});
        setViewModalOpen(false);
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchAllChecks();
    };

    return (
        <main className="px-8 py-2 pt-6 min-h-screen bg-gradient-to-r from-violet-200 to-pink-200">
            <form
                onSubmit={handleFormSubmit}
                className="grid sm:grid-cols-2 gap-3 mb-4"
            >
                <input
                    id="default-input"
                    placeholder="Check number.."
                    type="text"
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
                <div>
                    <MatTable
                        columnNames={checksTableMap.get(
                            "GET_ALL_CHECKS")}
                        rows={checks}
                        deleteProperty={"number"}
                        pathToCreateUpdate={"/post_update_employee"}
                        clickable={true}
                        onViewClick={onOpenViewModal}
                        deleteFunc={deleteCheck}
                        deleteEnabled={role === Roles.MANAGER}
                        withActions={true}
                    ></MatTable>
                    <ViewCheckModal
                        open={viewModalOpen}
                        handleClose={onCloseViewModal}
                        selectedCheck={selectedItem}
                    />
                    <div ref={componentRef}>
                        <TableForPrint
                            columnNames={checksTableMap.get("GET_ALL_CHECKS")}
                            rows={checks}
                        />
                    </div>
                    <div className="flex justify-end m-2">
                        <button
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={handlePrint}>To PDF
                        </button>
                    </div>
                </div>
            )}
        </main>
    )

}