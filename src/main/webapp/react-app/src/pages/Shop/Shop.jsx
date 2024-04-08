import React from 'react'
import {useState} from "react";
import "./Style.css";
import Info from "../../components/mainPage/Info.jsx";
import Table from "../../components/TableOfUser/Table.jsx";
import MatTable from "../../components/table/MatTable.jsx";
import {employeesCommandMap, employeesTableMap} from "../../constants/EmployeesCommandMap.js";
const Shop = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (command) => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    "command_name": command,
                })
            );
            const data = await response.json();
            setData(data);
            setIsLoading(false);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
<div className={"shop"}>

<div className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <a href="#"
       onClick={()=> fetchData("GET_ALL_EMPLOYEES")}
       aria-current="true"
       className="block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600">
        Get all employees order by surname
    </a>
    <a href="#"
       onClick={()=> fetchData("GET_ALL_CLIENTS_ORDER_BY_SURNAME")}
       className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        Get all clients order by surname
    </a>
    <a href="#"
       onClick={()=> fetchData("GET_ALL_CATEGORIES_ORDER_BY_NAME")}
       className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        Get all categories order by name
    </a>
    <a href="#"
       onClick={()=> fetchData("GET_ALL_PRODUCTS_ORDER_BY_NAME")}
       className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        Get all categories order by name
    </a>
    <a href="#"
       onClick={()=> fetchData("GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY")}
       className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        Get all products in shop order by quantity
    </a>
    <a href="#"
       onClick={()=> fetchData("GET_ALL_PRODUCTS_IN_SHOP_ORDER_BY_QUANTITY")}
       className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        Get all <b>products</b> in shop order by quantity
    </a>

    <a href="#"
       onClick={()=> fetchData("GET_PROM_PRODUCTS_ORDER_BY_QUANTITY")}
       className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        Get information about <b>prom products</b> order by quantity
    </a>
    <a href="#"
       onClick={()=> fetchData("GET_PROM_PRODUCTS_ORDER_BY_QUANTITY")}
       className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        Get information about <b>prom products</b> order by name
    </a>



    {/*

    */}


    <a href="#"
       className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        Get employee by ID
    </a>
    <a href="#" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        Create new employee
    </a>
    <a href="#"
       className="block w-full px-4 py-2 rounded-b-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        Edit employee
    </a>
</div>
    {!isLoading && <MatTable columnNames={employeesTableMap.get('GET_ALL_EMPLOYEES')} rows={data}></MatTable>}
    </div>
    )
}

export default Shop