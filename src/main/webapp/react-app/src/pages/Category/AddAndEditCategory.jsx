
import Card from "../../components/cards/Card";
import FormInput from "../../components/inputs/FormInput";
import useFetchCategory from "../../hooks/Category/useFetchCategory.jsx";
import useCreateUpdateCategory from "../../hooks/Category/useCreateUpdateCategory.jsx";

export default function AddAndEditCategory() {
    const {id, category} = useFetchCategory();
    const {register, handleSubmit, onSubmit, errors} = useCreateUpdateCategory(
        id,
        category
    );


    return (
        <Card height="screen" maxW="max-w-3xl">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="border-b border-gray-900/10 pb-4">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        {id ? "Update Category" : "Create new category"}
                    </h2>
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <FormInput
                                label="Name of category"
                                name="name"
                                placeholder="Name of category"
                                type="text"
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
                    {id ? "Update category" : "Add category"}
                </button>
            </form>
        </Card>);
}
