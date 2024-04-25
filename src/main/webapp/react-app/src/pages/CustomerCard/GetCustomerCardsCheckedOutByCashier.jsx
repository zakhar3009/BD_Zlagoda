// import Card from "@/components/cards/Card.jsx";
// import EnhancedTable from "@/components/table/AddNewCheckTable.jsx";
// import {useEffect, useState} from "react";
// import {useNavigate} from "react-router-dom";
// import useAuth from "@/hooks/auth/useAuth.js";
// import {toast} from "react-toastify";
//
// export default function GetCustomerCardsCheckedOutByCashier(){
//     const [isLoading, setIsLoading] = useState(true);
//     const [selectedClient, setSelectedClient] = useState(null);
//     const [cashier, setCashier] = useState([]);
//     const navigate = useNavigate();
//     const { auth } = useAuth();
//
//     const fetchClientsData = async () => {
//         try {
//             const response = await fetch(
//                 "http://localhost:8080/controller?" +
//                 new URLSearchParams({
//                     command_name: "GET_ALL_CLIENTS",
//                 })
//             );
//             const data = await response.json();
//             setCustomerCards(data);
//             setSelectedClient(data[0].number);
//             console.log("LOADED CLIENTS", data);
//         } catch (err) {
//             toast.error(`ERROR: ${err}`);
//         }
//     };
//
//     const fetchStoreProductsData = async () => {
//         try {
//             setIsLoading(true);
//             const response = await fetch(
//                 "http://localhost:8080/controller?" +
//                 new URLSearchParams({
//                     command_name: "GET_ALL_PRODUCTS_IN_SHOP",
//                 })
//             );
//             let data = await response.json();
//             let newData = data
//                 .filter((item) => (item.productsNumber !== 0))
//                 .map((item) => ({
//                     ...item,
//                     sellingAmount: 1
//                 }))
//             setCashier(newData);
//             setIsLoading(false);
//         } catch (err) {
//             toast.error(`ERROR: ${err}`)
//         }
//     };
//
//     useEffect(() => {
//         fetchClientsData();
//         fetchStoreProductsData();
//     }, []);
//     return (
//         <Card height={"screen"} maxW="max-w-5xl">
//             {!isLoading &&
//                 <>
//                     <h1 className="text-base font-semibold leading-7 text-gray-900 mb-3">Create check</h1>
//                     <div className="mb-4">
//                         <label
//                             htmlFor="customer"
//                             className="block text-sm font-medium leading-6 text-gray-900">
//                             Choose a customer
//                         </label>
//
//                         <select
//                             name="customer"
//                             id="customer"
//                             value={selectedClient}
//                             onChange={e => setSelectedClient(e.target.value)}
//                             className="block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
//                             {customerCards.map((item) => (
//                                 <option key={item.number} value={item.number}>
//                                     {item.customerName + " " + item.customerSurname}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <EnhancedTable tableRows={cashier} handleCreateCheck={handleCreateCheck} />
//                 </>
//             }
//         </Card>)
//
//     )
//
// }