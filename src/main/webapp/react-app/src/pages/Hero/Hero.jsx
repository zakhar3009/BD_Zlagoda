import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Hero() {
  // const [isLoading, setIsLoading] = useState(true);
  const [allEmployees, setAllEmployees] = useState(null);
  const [employeeById, setEmployeeById] = useState(null);
  const [allEmployeesOrderedBySurname, setAllEmployeesOrderedBySurname] = useState(null);
  const [allCashiersOrderedBySurname, setAllCashiersOrderedBySurname] = useState(null);
  const [employeeBySurname, setEmployeeBySurname] = useState(null);
  const fetchData = async () => {
        try {
          console.log("SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME");
          const response = await fetch(
              "http://localhost:8080/controller?" +
              new URLSearchParams({
                "command_name": "SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME",
                "surname" : "Smith"
              })
          );
          const getAllEmployeesOrder = await response.json();
          setAllCashiersOrderedBySurname(getAllEmployeesOrder);
          console.log(getAllEmployeesOrder);
        } catch (err) {
          console.log(err);
        }
      };


    //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("fetching all employees");
  //       const response = await fetch(
  //           "http://localhost:8080/controller?" +
  //           new URLSearchParams({
  //             "command_name": "GET_ALL_EMPLOYEES"
  //           })
  //       );
  //       const data = await response.json();
  //       setAllEmployees(data);
  //       console.log(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("fetching Employee by ID");
  //       const response = await fetch(
  //           "http://localhost:8080/controller?" +
  //           new URLSearchParams({
  //             "command_name": "GET_EMPLOYEE_BY_ID",
  //             "id": "E002"
  //           })
  //       );
  //       const employee = await response.json();
  //       setEmployeeById(employee);
  //       console.log(employee);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("fetching EMPLOYEES_ORDER_BY_SURNAME");
  //       const response = await fetch(
  //           "http://localhost:8080/controller?" +
  //           new URLSearchParams({
  //             "command_name": "GET_ALL_EMPLOYEES_ORDER_BY_SURNAME",
  //           })
  //       );
  //       const getAllEmployeesOrder = await response.json();
  //       setAllEmployeesOrderedBySurname(getAllEmployeesOrder);
  //       console.log(getAllEmployeesOrder);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log("deleting EMPLOYEE");
  //     const requestOptions = {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json",
  //         "command_name": "DELETE_EMPLOYEE"},
  //       body: JSON.stringify({
  //         id: "E001"
  //       }),
  //     };
  //     try {
  //       const response = await fetch(
  //           "http://localhost:8080/controller",
  //           requestOptions
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);
  //
  // const fetchData = async () => {
  //   console.log("adding EMPLOYEE");
  //   function generateRandomNumberString(length) {
  //     let result = '';
  //     const characters = '0123456789';
  //     const charactersLength = characters.length;
  //     for (let i = 0; i < length; i++) {
  //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //     }
  //     return result;
  //   }
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json",
  //       "command_name": "POST_ADD_EMPLOYEE"},
  //     body: JSON.stringify({
  //       email: 'test2@ukr.net.ua',
  //       password: '123',
  //       surname: 'Sparrow',
  //       id: generateRandomNumberString(10),
  //       name: 'Jack',
  //       patronymic: 'Kate',
  //       role: 'Manager'.toUpperCase(),
  //       salary: 4999.0,
  //       dateOfBirth: '1990-05-15',
  //       dateOfStart: '2022-01-01',
  //       phoneNumber: '123-456-7890',
  //       city: 'New York',
  //       street: 'Broadway',
  //       zipCode: '10001'
  //     }),
  //   };
  //   try {
  //     const response = await fetch(
  //         "http://localhost:8080/controller",
  //         requestOptions
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("ALL_CASHIERS_ORDER_BY_SURNAME");
  //       const response = await fetch(
  //           "http://localhost:8080/controller?" +
  //           new URLSearchParams({
  //             "command_name": "GET_ALL_CASHIERS_ORDER_BY_SURNAME",
  //           })
  //       );
  //       const getAllEmployeesOrder = await response.json();
  //       setAllCashiersOrderedBySurname(getAllEmployeesOrder);
  //       console.log(getAllEmployeesOrder);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("SEARCH_EMPLOYEE_ADDRESS_AND_PHONE_BY_SURNAME");
  //       const response = await fetch(
  //           "http://localhost:8080/controller?" +
  //           new URLSearchParams({
  //             "command_name": "SEARCH_EMPLOYEE_BY_SURNAME",
  //             "surname": "Johnson"
  //           })
  //       );
  //       const getAllEmployeesOrder = await response.json();
  //       setEmployeeBySurname(getAllEmployeesOrder);
  //       console.log(getAllEmployeesOrder);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-r from-violet-200 to-pink-200">
      {(
          <>
            <div>
              <label>
                GET_EMPLOYEES
              </label>
              {JSON.stringify(allEmployees)}
            </div>
            <div>
              <label>
                GET_EMPLOYEE_BY_ID
              </label>
              <div>{JSON.stringify(employeeById)} </div>
            </div>
            <div>
              <label>
                GET_ALL_EMPLOYEES_ORDER_BY_SURNAME
              </label>
              <div>{JSON.stringify(allEmployeesOrderedBySurname)} </div>
            </div>
            <div>
              <label>
                GET_ALL_CASHIERS_ORDER_BY_SURNAME
              </label>
              <div>{JSON.stringify(allCashiersOrderedBySurname)} </div>
            </div>
            <div>
              <label>
                SEARCH_EMPLOYEE_BY_SURNAME
              </label>
              <div>{JSON.stringify(employeeBySurname)} </div>
            </div>
            <button className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" onClick={() => fetchData()}> Tab here! </button>
          </>
      )}
      <div className="mr-auto ml-auto pt-44 text-center w-1/2">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to annonyms page.
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <NavLink
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login In
          </NavLink>
        </div>
      </div>
    </div>
  );
}
