//import { useForm, SubmitHandler } from "react-hook-form"
import {useForm, useFormState} from "react-hook-form"

import * as z from "zod";
import {useParams, useResolvedPath} from "react-router-dom";


export default function AddAndEditEmployee(){
    const {id} = useParams();
    let  employee = {
        id:"",
        name: "",
        surname: "",
        patronymic: "",
        role: "",
        salary: 0,
        dateOfBirth: "",
        dateOfStart: "",
        phoneNumber: "",
        email: "",
        password: "1234567",
        city:"",
        street:"",
        zipCode: ""
    }
    const getEmployee = async () => {
        try {
            console.log("SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME");
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    "command_name": "GET_EMPLOYEE_BY_ID",
                    "id" : id
                })
            );
            const getEmployeeById = await response.json();
            employee = getEmployeeById;
        } catch (err) {
            console.log(err);
        }
    };

    if(id) getEmployee();

    const {register, handleSubmit, formState:{errors}, getValues} = useForm({
        defaultValues:
            employee
            // id:employee.id,
            // name: employee.name,
            // surname: employee.surname,
            // patronymic: "",
            // role: "",
            // salary: 0,
            // dateOfBirth: "",
            // dateOfStart: "",
            // phoneNumber: "",
            // email: "",
            // password: "1234567",
            // city:"",
            // street:"",
            // zipCode: ""

    });
const fetchData = async () => {
      console.log("adding EMPLOYEE");
    const formData = getValues();
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "command_name": "POST_ADD_EMPLOYEE"},
        body: JSON.stringify(formData),
      };
      try {
        const response = await fetch(
            "http://localhost:8080/controller",
            requestOptions
        );
        const data = await response.json();
        console.log(data);
        console.log("DONE")
         alert(`The Employee ${name} was created!`)
      } catch (err) {
        console.log(err);
      }
    };
const onSubmit = (data) => {
    console.log(data);
    fetchData();
};
 return (
     <main className={"w-full h-full bg-gradient-to-r from-violet-200 to-pink-200 pt-2 pb-2"}>
        <div className="mx-auto max-w-3xl shadow-2xl p-4 rounded-2xl bg-white">
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Create Employee</h2>
               {/*// <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>*/}

                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("name",
                                    {
                                        required: {
                                            value:true,
                                            message: 'Field first name is required!'
                                        }
                                    })}
                                placeholder={"First Name"}
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="given-name"
                                className="block pl-3  w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="surname" className="block text-sm font-medium leading-6 text-gray-900">
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("surname",
                                {
                                    required: {
                                    value:true,
                                    message: 'Field surname is required!'
                                    }
                                })}
                                placeholder={"Surname"}
                                type="text"
                                name="surname"
                                id="surname"
                                // autoComplete="family-name"
                                className="block w-full rounded-md border-1 py-1 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.surname && <span className="text-red-500">{errors.surname.message}</span>}

                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="patronymic" className="block text-sm font-medium leading-6 text-gray-900">
                            Patronymic
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("patronymic")}
                                placeholder={"Patronymic"}
                                type="text"
                                name="patronymic"
                                id="patronymic"
                                //autoComplete="family-name"
                                className="block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("email",
                                    {
                                        required: {
                                            value:true,
                                            message: 'Field email is required!'
                                        }
                                    })}
                                placeholder={"Email"}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-1 py-1.5 pl-3  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}

                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                            Choose Role
                        </label>
                        <div className="mt-2">
                            <select
                                {...register("role",
                                    {
                                        required: {
                                            value:true,
                                            message: 'Field role is required!'
                                        }
                                    })}
                                id="role"
                                name="role"

                                className="block pl-3  w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option value={"MANAGER"}>Manager</option>
                                <option value={"CASHIER"}>Cashier</option>
                            </select>
                            {errors.role && <span className="text-red-500">{errors.role.message}</span>}

                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="salary" className="block text-sm font-medium leading-6 text-gray-900">
                            Salary
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("salary",
                                    {
                                        required: {
                                            value:true,
                                            message: 'Field salary is required!'
                                        }
                                    })}
                                placeholder={"Salary"}
                                id="salary"
                                name="salary"
                                type="number"
                                autoComplete="salary"
                                className="block pl-3  w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.salary && <span className="text-red-500">{errors.salary.message}</span>}

                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium leading-6 text-gray-900">
                            Date of birth
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("dateOfBirth",
                                    {
                                        required: {
                                            value:true,
                                            message: 'Field date of birth is required!'
                                        }
                                    })}
                                placeholder={"Date of birth"}
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                                className="block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.dateOfBirth && <span className="text-red-500">{errors.dateOfBirth.message}</span>}

                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="dateOfStart" className="block text-sm font-medium leading-6 text-gray-900">
                            Date of hire on a job
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("dateOfStart",
                                    {
                                        required: {
                                            value:true,
                                            message: 'Field date of hire on a job is required!'
                                        }
                                    })}
                                placeholder={"dateOfStart"}
                                id="dateOfStart"
                                name="dateOfStart"
                                type="date"
                                className="block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.dateOfStart && <span className="text-red-500">{errors.dateOfStart.message}</span>}

                        </div>
                    </div>
                    <h2 className="text-base font-semibold col-span-full">Input your address</h2>

                    <div className="sm:col-span-3">
                        <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                            Street address
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("street", {
                                    required: {
                                        value:true,
                                        message: 'Field street is required!'
                                    }
                                })}
                                type="text"
                                name="street"
                                id="street"
                                className="block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.street && <span className="text-red-500">{errors.street.message}</span>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            City
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("city", {
                                    required: {
                                        value:true,
                                        message: 'Field city is required!'
                                    }
                                })}
                                type="text"
                                name="city"
                                id="city"
                                className="block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.city && <span className="text-red-500">{errors.city.message}</span>}
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="zipCode" className="block text-sm font-medium leading-6 text-gray-900">
                            ZIP / Postal code
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("zipCode", {
                                    required: {
                                        value:true,
                                        message: 'Field zip code is required!'
                                    }
                                })}
                                type="text"
                                name="zipCode"
                                id="zipCode"
                                autoComplete="postal-code"
                                className="block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {errors.zipCode && <span className="text-red-500">{errors.zipCode.message}</span>}
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone number
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("phoneNumber", {
                                    required: {
                                        value:true,
                                        message: 'Field phone number is required!'
                                    }
                                })}
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                autoComplete="postal-code"
                                className="block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}

                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-100"
            >
                Add employee
            </button>

        </form>
        </div>
     </main>
    )
}