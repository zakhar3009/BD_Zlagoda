import MatTable from "@/components/table/MatTable.jsx";
import {categoriesTableMap} from "@/constants/CategoiesCommandMap.js";
import React, {useState} from "react";
import {employeesTableMap} from "@/constants/EmployeesCommandMap.js";
import useCreateUpdateEmployee from "@/hooks/Employee/useCreateUpdateEmployee.jsx";
import useFilterChecks from "@/hooks/Checks/useFilterChecks.jsx";

export default function Checks({command}){
    const {register, handleSubmit, onSubmit, cashier, checks, isLoading} = useFilterChecks();

    return (
        <main className="px-8 py-2 h-screen bg-gradient-to-r from-violet-200 to-pink-200">
            <div className="mb-6">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid sm:grid-cols-2 gap-3 mb-4"
                >
                    <select
                        {...register("id_employee",{
                            // required: {
                            //     value: true,
                            //     message: `Field category is required!`,
                            // },
                            // validate: (value) => {
                            //     if(!value)
                            //         return "Category must be chosen!"
                            // }
                        })}
                        name="id_employee"
                        id="id_employee"
                        className="block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option value="">Choose cashier...</option>
                        {cashier.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <input
                        type="date"
                        id="default-input"
                        placeholder="Date from"
                        name = "start"
                        className="bg-gray-50 md:place-self-end sm:max-w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <input
                        type="date"
                        id="default-input"
                        placeholder="Date for"
                        name="end"
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
                        rows={checks}
                        deleteProperty={"id"}
                        pathToCreateUpdate={"/post_update_employee"}
                    ></MatTable>
                )}
                {/*{!isLoading && <h1>Not have employee with that with that surname</h1>}*/}
            </div>
        </main>
    )

}