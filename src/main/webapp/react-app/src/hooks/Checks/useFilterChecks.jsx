import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export default function useFilterChecks() {
    const [isLoading, setIsLoading] = useState(true);
    const [cashier, setCashier] = useState([]);
    const [checks, setChecks] = useState([]);

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

    const fetchCashier = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_ALL_CASHIERS_ORDER_BY_SURNAME",
                })
            );
            const data = await response.json();
            setCashier(data.map((item) => ({label: item.surname, value: item.id})))
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    useEffect(() => {
        fetchCashier();
        fetchAllChecks("GET_ALL_CHECKS", {})
    }, []);

    // Toast needed
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
            console.log("CHECKS", newData)
            setIsLoading(false);
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    };

    const onSubmit = () => {
        let parameters = {};
        const values = getValues();
        if (values.start && values.end && values.id_employee) {
            parameters = {
                id_employee: values.id_employee,
                start: values.start,
                end: values.end
            }
            fetchAllChecks("GET_CHECKS_BY_CASHIER_AND_TIME_PERIOD", parameters);
        }
        else if(!values.id_employee && values.start && values.end) {
            parameters = {
                start: values.start,
                end: values.end
            }
            fetchAllChecks("GET_ALL_CHECKS_BY_TIME_PERIOD", parameters);
        }
        else if(values.id_employee && !values.start && !values.end){
            parameters = {
                id_employee: values.id_employee,
            }
            fetchAllChecks("GET_ALL_CHECKS_BY_CASHIER", parameters);
        }
        else fetchAllChecks("GET_ALL_CHECKS", parameters)
    }

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        cashier,
        checks,
        isLoading
    };

}