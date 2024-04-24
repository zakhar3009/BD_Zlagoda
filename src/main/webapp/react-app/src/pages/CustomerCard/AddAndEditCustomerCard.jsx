import Card from "@/components/cards/Card.jsx";
import FormInput from "@/components/inputs/FormInput.jsx";
import { checkValidPhoneNumber } from "@/validators/EmployeeValidations.jsx";
import useFetchCustomerCard from "@/hooks/CustomerCard/useFetchCustomerCard.jsx";
import useCreateUpdateCustomerCard from "@/hooks/CustomerCard/useCreateUpdateCustomerCard.jsx";


export default function AddAndEditCustomerCard(){
    const {id, client} = useFetchCustomerCard();
    const {register, handleSubmit, onSubmit, errors} = useCreateUpdateCustomerCard(
        id,
        client
    );

    return(
        <Card maxW="max-w-3xl">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        {id ? "Update Client" : "Create Client"}
                    </h2>
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <FormInput
                                label="First Name"
                                name="customerName"
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
                                name="customerSurname"
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
                                name="customerPatronymic"
                                placeholder="Patronymic"
                                type="text"
                                register={register}
                                errors={errors}
                                required={false}
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
                        <h2 className="text-base font-semibold col-span-full">
                            Input your address:
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
                        <h2 className="text-base font-semibold col-span-full">
                            Input which percent the client will have:
                        </h2>
                        <div className="sm:col-span-3">
                            <FormInput
                                label="Percent"
                                name="percent"
                                type="number"
                                register={register}
                                errors={errors}
                                required={true}
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-100"
                >
                    {id ? "Update client" : "Add client"}
                </button>
            </form>
        </Card>
    )
}