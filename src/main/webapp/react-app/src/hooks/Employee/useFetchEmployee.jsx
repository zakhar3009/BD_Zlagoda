import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const employeeDefaultValues = {
  id: "",
  name: "",
  surname: "",
  patronymic: "",
  role: "",
  salary: 0,
  dateOfBirth: "",
  dateOfStart: "",
  phoneNumber: "",
  email: "",
  password: "",
  city: "",
  street: "",
  zipCode: "",
};

export default function useFetchEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(employeeDefaultValues);

  const getEmployeeById = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/controller?" +
          new URLSearchParams({
            command_name: "GET_EMPLOYEE_BY_ID",
            id_employee: id,
          })
      );
      const employeeById = await response.json();
      setEmployee(employeeById);
    } catch (err) {
      toast.error(`Error: ${err}`);
      navigate("../get_all_employees");
    }
  };

  useEffect(() => {
    if (id) getEmployeeById();
    else setEmployee(employeeDefaultValues);
  }, [id]);

  return {
    id,
    employee
  }
}
