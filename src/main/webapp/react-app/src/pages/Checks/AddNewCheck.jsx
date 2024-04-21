import Card from "./../../components/cards/Card.jsx";
import {useEffect, useState} from "react";
import EnhancedTable from './../../components/table/AddNewCheckTable.jsx'
import {toast} from "react-toastify";
import useAuth from "@/hooks/auth/useAuth.js";
import moment from "moment";
import {useNavigate} from "react-router-dom";


export default function AddNewCheck() {
    const [customerCards, setCustomerCards] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { auth } = useAuth();

// 234234234324
    const fetchClientsData = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_ALL_CLIENTS",
                })
            );
            const data = await response.json();
            setCustomerCards(data);
            setSelectedClient(data[0].number);
            console.log("LOADED CLIENTS", data);
        } catch (err) {
            toast.error(`ERROR: ${err}`);
        }
    };

    const fetchStoreProductsData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_ALL_PRODUCTS_IN_SHOP",
                })
            );
            let data = await response.json();
            let newData = data
                .filter((item) => (item.productsNumber !== 0))
                .map((item) => ({
                    ...item,
                    sellingAmount: 1
                }))
            setProducts(newData);
            setIsLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    useEffect(() => {
        fetchClientsData();
        fetchStoreProductsData();
    }, []);

    const createCheck = async (check, selectedItems) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                command_name: "POST_ADD_CHECK",
            },
            body: JSON.stringify(check),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            const checkId = await response.json();
            console.log("ID ", checkId)
            createSales(checkId, selectedItems);
            toast.success("New check was added");
        } catch (err) {
            toast.error(`Error: ${err}`);
        } finally {
            navigate('../get_all_checks')
        }
    }

    const createSales = async (check, selectedItems) => {
        selectedItems.map(async (item) => {
            let changedItem = {
                ...item
            }
            if(!changedItem.promStoreProduct) {
                changedItem.promStoreProduct = {}
            }
            delete changedItem.sellingAmount;
            const sale = {
                storeProduct: changedItem,
                check: {number: check},
                productNumber: item.sellingAmount,
                sellingPrice: item.sellingPrice
            }
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    command_name: "POST_ADD_SALE",
                },
                body: JSON.stringify(sale),
            };
            try {
                const response = await fetch(
                    "http://localhost:8080/controller",
                    requestOptions
                );
                const sale = await response.json();
                toast.success("New sale was added");
            } catch (err) {
                toast.error(`Error: ${err}`);
            }
        });


    }


    const handleCreateCheck = (selectedItems, totalSum) => {
       const client = customerCards.find((c) => c.number === selectedClient);
        const formattedDate = moment().format("YYYY-MM-D");
        const check = {
            employee : auth?.user,
            customerCard: client,
            printDate: formattedDate,
            sumTotal: totalSum * 1.2,
            vat: totalSum * 0.2
        }
        createCheck(check, selectedItems);
        console.log("SELECTED ITEMS", selectedItems);
    }

    return (
        <Card height={"screen"} maxW="max-w-5xl">
            {!isLoading &&
                <>
                <h1 className="text-base font-semibold leading-7 text-gray-900 mb-3">Create check</h1>
                <div className="mb-4">
                    <label
                        htmlFor="customer"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Choose a customer
                    </label>

                    <select
                        name="customer"
                        id="customer"
                        value={selectedClient}
                        onChange={e => setSelectedClient(e.target.value)}
                        className="block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        {customerCards.map((item) => (
                            <option key={item.number} value={item.number}>
                                {item.customerName + " " + item.customerSurname}
                            </option>
                        ))}
                    </select>
                </div>
                <EnhancedTable tableRows={products} handleCreateCheck={handleCreateCheck} />
                </>
            }
    </Card>)
}