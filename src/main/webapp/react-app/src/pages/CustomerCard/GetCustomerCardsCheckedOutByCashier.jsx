import Card from "@/components/cards/Card.jsx";
import EnhancedTable from "@/components/table/AddNewCheckTable.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "@/hooks/auth/useAuth.js";
import {toast} from "react-toastify";
import ChoosingCashierTable from "@/components/table/ChosingCashierTable.jsx";
import moment from "moment/moment.js";


export default function GetCustomerCardsCheckedOutByCashier(){
    const [isLoading, setIsLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [cashier, setCashier] = useState([]);
    const navigate = useNavigate();
    const { auth } = useAuth();

    const fetchCashierData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_ALL_CASHIERS_ORDER_BY_SURNAME",
                })
            );
            const data = await response.json();
            console.log(data);
            setCashier(data);
            setIsLoading(false)
        } catch (err) {
            toast.error(`ERROR: ${err}`);
        }
    };

    const fetchCustomerClientCheck = async (employee_ids) => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_CUSTOMER_CARDS_CHECKED_OUT_BY_CASHIERS",
                    employee_id: employee_ids
                })
            );
            let data = await response.json();
            // setCashier(newData);
            console.log(data)
            setIsLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    useEffect(() => {
        fetchCashierData();

    }, []);
    const returnTheResultSet = (selectedItems) => {
        const newSelectedItems = selectedItems.map((item) => (
           item.id
        ))
        fetchCustomerClientCheck(newSelectedItems);
        console.log("SELECTED ITEMS", newSelectedItems);
    }


    return (
        <Card height={"screen"} maxW="max-w-5xl">

            {!isLoading &&
                <>
                    <h1 className="text-base font-semibold leading-7 text-gray-900 mb-3">Choose cashiers</h1>

                    <ChoosingCashierTable tableRows={cashier} handleCreateCheck={returnTheResultSet}></ChoosingCashierTable>
                    {/*<EnhancedTable tableRows={cashier} handleCreateCheck={handleCreateCheck} />*/}
                </>
            }
        </Card>

    )

}