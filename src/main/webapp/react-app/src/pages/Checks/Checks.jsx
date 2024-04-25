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


export default function Checks() {
    const {register, handleSubmit, onSubmit, fetchDailyCheck, cashier, checks, errors, isLoading, deleteCheck, auth } = useFilterChecks();
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

    return (
        <main className="px-8 py-2 pt-6 h-screen bg-gradient-to-r from-violet-200 to-pink-200">
            <Card maxW="max-w-3xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid sm:grid-cols-2 gap-3">
                    {role === Roles.MANAGER && <select
                        {...register("id_employee", {})}
                        name="id_employee"
                        id="id_employee"
                        className="col-span-2 block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option value="">Choose cashier...</option>
                        {cashier.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    }
                    <div>
                        <FormInput
                            register={register}
                            label="Date from"
                            type="date"
                            placeholder="Date from"
                            name="start"
                            errors={errors}
                        />
                    </div>
                    <div>
                        <FormInput
                            register={register}
                            label="Date end"
                            type="date"
                            placeholder="Date end"
                            name="end"
                            errors={errors}
                        />
                    </div>
                    <button
                        type="submit"
                        className="col-span-2 mt-4 text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Search
                    </button>
                    {role === Roles.CASHIER &&
                        <button
                            onClick={fetchDailyCheck}
                            className="col-span-2 text-blue-700 border-2 border-blue-700 hover:text-white bg-transparent hover:bg-blue-500  from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Get self daily checks
                        </button>
                    }
                </form>
            </Card>

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
                            columnNames={checksTableMap.get(
                                "GET_ALL_CHECKS")}
                            rows={checks}
                        />
                    </div>
                    <div className="flex justify-content-end mt-2">
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