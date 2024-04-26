import MatModal from "./MatModal/MatModal";
import {useForm} from "react-hook-form";
import FormInput from './../inputs/FormInput.jsx';
import {IoIosClose} from "react-icons/io";
import {toast} from "react-toastify";
import {checkValidPassword} from "@/validators/EmployeeValidations.jsx";
import {useNavigate} from "react-router-dom";
import useAuth from "@/hooks/auth/useAuth.js";

export default function ChangeUserPasswordModal({
                                                    open,
                                                    handleClose,
                                                }) {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
    } = useForm({
        defaultValues: {
            password: "",
        }
    });
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    const addEditEmployeeRequest = async (password) => {
        const user = {
            ...auth.user,
            password: password
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                command_name: "POST_UPDATE_EMPLOYEE",
            },
            body: JSON.stringify(user),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            await response.json();
            await getEmployeeById();
            handleClose();
            toast.success("User was updated");
        } catch (err) {
            toast.error(`Error: ${err}`);
        }
    };


    const getEmployeeById = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/controller?" +
                new URLSearchParams({
                    command_name: "GET_EMPLOYEE_BY_ID",
                    id_employee: auth?.user?.id,
                })
            );
            const employeeById = await response.json();
            setAuth({
                user: employeeById
            });
        } catch (err) {
            toast.error(`Error: ${err}`);
            navigate("/profile");
        }
    };



    const onSubmit = () => {
        const newPassword = getValues().password;
        addEditEmployeeRequest(newPassword);
    }

    return (
        <MatModal open={open} handleClose={handleClose}>
            <div className="flex justify-end items-center">
                <IoIosClose onClick={handleClose}
                            className="text-gray-400 text-4xl hover:text-opacity-80 active:text-opacity-50"/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    label="New password"
                    name="password"
                    placeholder="New password..."
                    type="password"
                    register={register}
                    errors={errors}
                    required={true}
                    validateFunc={checkValidPassword}
                />
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 mt-4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-100"
                >Make a new password
                </button>
            </form>
        </MatModal>
    );
}
