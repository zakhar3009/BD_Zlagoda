import MatTable from "@/components/table/MatTable.jsx";
import React, {useState} from "react";
import useFilterChecks from "@/hooks/Checks/useFilterChecks.jsx";
import {checksTableMap} from "@/constants/ChecksCommandMap.js";
import Card from "./../../components/cards/Card.jsx";
import ViewCheckModal from "@/components/modals/ViewCheckModal.jsx";
import FormInput from "./../../components/inputs/FormInput.jsx";


export default function Checks() {
    const {register, handleSubmit, onSubmit, cashier, checks, errors, isLoading} = useFilterChecks();
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

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
                    className="grid sm:grid-cols-2 gap-3"
                >
                    <select
                        {...register("id_employee", {
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
                        className="col-span-2 block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option value="">Choose cashier...</option>
                        {cashier.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </select>
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
                </form>
            </Card>

            {!isLoading && (
                <>
                    <MatTable
                        columnNames={checksTableMap.get(
                            "GET_ALL_CHECKS")}
                        rows={checks}
                        deleteProperty={"number"}
                        pathToCreateUpdate={"/post_update_employee"}
                        clickable={true}
                        onViewClick={onOpenViewModal}
                    ></MatTable>
                    <ViewCheckModal
                        open={viewModalOpen}
                        handleClose={onCloseViewModal}
                        selectedCheck={selectedItem}
                    />
                </>
            )}
        </main>
    )

}