import useFetchEmployee from "../../hooks/Employee/useFetchEmployee";
import useCreateUpdateEmployee from "../../hooks/Employee/useCreateUpdateEmployee";
import Card from "../../components/cards/Card";
import FormInput from "../../components/inputs/FormInput";
import {
    checkValidDateOfBirth,
    checkValidDateOfStart,
    checkValidPassword,
    checkValidPhoneNumber,
    checkValidSalary
} from "../../validators/EmployeeValidations.jsx";

export default function AddAndEditEmployee() {
    const {id, employee} = useFetchEmployee();
    const {register, handleSubmit, onSubmit, errors} = useCreateUpdateEmployee(
        id,
        employee
    );

    return (
        <Card height="full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        {id ? "Update Employee" : "Create Employee"}
                    </h2>
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <FormInput
                                label="First Name"
                                name="name"
                                placeholder="First Name"
                                type="text"
                                autoComplete="given-name"
                                register={register}
                                errors={errors}
                                required={true}
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <FormInput
                                label="Last Name"
                                name="surname"
                                placeholder="Surname"
                                type="text"
                                register={register}
                                errors={errors}
                                required={true}
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <FormInput
                                label="Patronymic"
                                name="patronymic"
                                placeholder="Patronymic"
                                type="text"
                                register={register}
                                errors={errors}
                                required={false}
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <FormInput
                                label="Salary"
                                name="salary"
                                placeholder="Salary"
                                type="number"
                                register={register}
                                errors={errors}
                                required={true}
                                validateFunc={checkValidSalary}
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="role"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Choose Role
                            </label>
                            <div className="mt-2 w-100">
                                <select
                                    {...register("role", {
                                        required: {
                                            value: true,
                                            message: "Field role is required!",
                                        },
                                    })}
                                    id="role"
                                    name="role"
                                    className="block pl-3  w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option value={"MANAGER"}>Manager</option>
                                    <option value={"CASHIER"}>Cashier</option>
                                </select>
                                {errors.role && (<span className="text-red-500 text-sm">{errors.role.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <FormInput
                                label="Email address"
                                name="email"
                                placeholder="Email"
                                type="email"
                                register={register}
                                errors={errors}
                                required={true}
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <FormInput
                                label="Password"
                                name="password"
                                placeholder="Password"
                                type="password"
                                register={register}
                                errors={errors}
                                required={true}
                                validateFunc={checkValidPassword}
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <FormInput
                                label="Date of birth"
                                name="dateOfBirth"
                                type="date"
                                register={register}
                                errors={errors}
                                required={true}
                                validateFunc={checkValidDateOfBirth}
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <FormInput
                                label="Date of hire on a job"
                                name="dateOfStart"
                                type="date"
                                register={register}
                                errors={errors}
                                required={true}
                                validateFunc={checkValidDateOfStart}
                            />
                        </div>
                        <h2 className="text-base font-semibold col-span-full">
                            Input your address
                        </h2>

                        <div className="sm:col-span-3">
                            <FormInput
                                label="City"
                                name="city"
                                type="text"
                                register={register}
                                errors={errors}
                                required={true}
                            />
                        </div>


                        <div className="sm:col-span-3">
                            <FormInput
                                label="Street"
                                name="street"
                                type="text"
                                register={register}
                                errors={errors}
                                required={true}
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <FormInput
                                label="Zip code / Postcode"
                                name="zipCode"
                                type="text"
                                register={register}
                                errors={errors}
                                required={true}
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <FormInput
                                label="Phone number"
                                name="phoneNumber"
                                type="phone"
                                register={register}
                                errors={errors}
                                required={true}
                                validateFunc={checkValidPhoneNumber}
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-100"
                >
                    {id ? "Update employee" : "Add employee"}
                </button>
            </form>
        </Card>);
}
