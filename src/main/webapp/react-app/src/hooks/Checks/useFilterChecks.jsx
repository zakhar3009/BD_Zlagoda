import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import useAuth from "@/hooks/auth/useAuth.js";
import {Roles} from "@/constants/auth/allowedRoles.js";
import moment from "moment/moment.js";

export default function useFilterChecks() {
    const [isLoading, setIsLoading] = useState(true);
    const [cashier, setCashier] = useState([]);
    const [products, setProduct] = useState([]);
    const [checks, setChecks] = useState([]);
    const [totalSum, setTotalSum] = useState("");
    const [totalValue, setTotalValue] = useState("")
    const [upcProduct, setUpcProduct] = useState("");
    const {auth} = useAuth();

    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
    } = useForm({
        defaultValues: {
            id_employee: "",
            start: "",
            end: ""
        }
    });
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
            const data = await response.json();
            fetchAllChecks("GET_ALL_CHECKS", {});
            toast.success("Check was removed!")
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };
    const fetchCashier = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_ALL_CASHIERS_ORDER_BY_SURNAME",
                })
            );
            const data = await response.json();
            setCashier(data.map((item) => ({label: item.surname, value: item.id})))
            setIsLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };
    const fetchProducts = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_ALL_PRODUCTS_IN_SHOP",
                })
            );
            const data = await response.json();
            setProduct(data.map((item) => (
                {
                    label: item.promotionalProduct ? item.product.name + " (prom)" : item.product.name,
                    value: item.UPC}
            )))
            console.log(data);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };
    const handleProductTotalSum = (event) =>{
         console.log("aa", event.target.value);
         setUpcProduct(event.target.value);
        const values = getValues();
        const parameters = {
             UPC: event.target.value,
             start: values.start,
             end: values.end
         }
        fetchTotalSum("GET_COUNT_OF_SOLD_PRODUCTS_BY_TIME_PERIOD", parameters);
    }

    useEffect(() => {
        fetchCashier();
        fetchProducts();
       // fetchAllChecks("GET_ALL_CHECKS", {})
    }, []);

    const fetchAllChecks = async (command, parameters) => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: command,
                    ...parameters
                })
            );
            const data = await response.json();
            const newData = data.map((item) =>({
                number: item.number,
                employee: item.employee.name + " "+ item.employee.surname,
                customerCard: item.customerCard.customerName +" " + item.customerCard.customerSurname,
                printDate: item.printDate,
                sumTotal: item.sumTotal,
                vat: item.vat
            }))
            setChecks(newData);
            setIsLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    const fetchTotalSum = async (command, parameters) => {
        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: command,
                    ...parameters
                })
            );
            const data = await response.json();
            if(command === "GET_SUM_ALL_OF_CHECKS_BY_TIME_PERIOD")
                setTotalSum(data);
            else setTotalValue(data);
            setIsLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    const fetchDailyCheck =() =>{
        const parameters ={
            id_employee: auth.user.id,
            day: moment().format("YYYY-MM-D")
        }
        fetchAllChecks("GET_SELF_DAILY_CHECKS",parameters )
    }

    const onSubmit = () => {
        let parameters = {};
        const values = getValues();
        if (auth.user.role === Roles.CASHIER) {
            if(values.start && values.end){
                parameters = {
                    ...values,
                    id_employee: auth.user.id
                }
                fetchAllChecks("GER_SELF_CHECKS_PER_PERIOD", parameters);
            }
        } else {
            if (values.start && values.end && values.id_employee) {
                parameters = {
                    id_employee: values.id_employee,
                    start: values.start,
                    end: values.end
                }
                fetchAllChecks("GET_CHECKS_BY_CASHIER_AND_TIME_PERIOD", parameters);
                parameters = {
                    UPC: upcProduct,
                    start: values.start,
                    end: values.end
                }
                fetchTotalSum("GET_SUM_OF_CHECKS_BY_CASHIER_AND_TIME_PERIOD", parameters);
            } else if (!values.id_employee && values.start && values.end) {
                parameters = {
                    start: values.start,
                    end: values.end
                }
                fetchAllChecks("GET_ALL_CHECKS_BY_TIME_PERIOD", parameters);
                fetchTotalSum("GET_SUM_ALL_OF_CHECKS_BY_TIME_PERIOD", parameters);

            } else if (values.id_employee && !values.start && !values.end) {
                parameters = {
                    id_employee: values.id_employee,
                }
                fetchAllChecks("GET_ALL_CHECKS_BY_CASHIER", parameters);
            }
        }
    }

    return {
        register,
        handleSubmit,
        deleteCheck,
        onSubmit,
        fetchDailyCheck,
        handleProductTotalSum,
        errors,
        totalSum,
        totalValue,
        products,
        cashier,
        checks,
        isLoading,
        auth
    };

}