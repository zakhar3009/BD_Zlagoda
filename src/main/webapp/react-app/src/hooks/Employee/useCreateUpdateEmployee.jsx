import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useCreateUpdateEmployee(id, employee) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("name", employee.name);
    setValue("surname", employee.surname);
    setValue("patronymic", employee.patronymic);
    setValue("role", employee.role);
    setValue("salary", employee.salary);
    setValue("dateOfBirth", employee.dateOfBirth);
    setValue("dateOfStart", employee.dateOfStart);
    // ?? not have email
    setValue("email", employee.email);
    setValue("city", employee.city);
    setValue("street", employee.street);
    setValue("zipCode", employee.zipCode);
    setValue("phoneNumber", employee.phoneNumber);
  }, [employee, setValue]);

  // Toast needed
  const addEditEmployeeRequest = async (command) => {
    const formData = getValues();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        command_name: command,
      },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch(
        "http://localhost:8080/controller",
        requestOptions
      );
      const data = await response.json();
      if (id) toast.success("Employee was updated");
      else toast.success("New employee was added");
    } catch (err) {
      toast.error(`Error: ${err}`);
    } finally {
      navigate("../get_all_employees");
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    if (id) addEditEmployeeRequest("POST_UPDATE_EMPLOYEE");
    else addEditEmployeeRequest("POST_ADD_EMPLOYEE");
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}
