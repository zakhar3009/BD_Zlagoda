import Card from "@/components/cards/Card.jsx";
import FormInput from "@/components/inputs/FormInput.jsx";
import useFetchProduct from "@/hooks/Product/useFetchProduct.jsx";
import useCreateUpdateProduct from "@/hooks/Product/useCreateUpdateProduct.jsx";

export default function AddAndEditProduct() {
    const {id, product} = useFetchProduct();
    const {register, handleSubmit, onSubmit, errors, categories, getValues} = useCreateUpdateProduct(
        id,
        product
    );

    return (
        <Card height="screen" maxW="max-w-3xl">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="border-b border-gray-900/10 pb-4">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        {id ? "Update Product" : "Create new product"}
                    </h2>
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <FormInput
                                label="Name of product"
                                name="name"
                                placeholder="Name of product"
                                type="text"
                                register={register}
                                errors={errors}
                                required={true}

                            />
                        </div>
                        <div className="sm:col-span-6">
                            <FormInput
                                label="Characteristic"
                                name="characteristic"
                                placeholder="Characteristic"
                                type="text"
                                register={register}
                                errors={errors}
                                required={true}
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium leading-6 text-gray-900">
                                Choose a category
                            </label>

                            <select
                                {...register("category",{
                                    required: {
                                        value: true,
                                        message: `Field category is required!`,
                                    },
                                    validate: (value) => {
                                        if(!value)
                                            return "Category must be chosen!"
                                    }
                                })}
                                name="category"
                                id="category"
                                className="block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option value="">Choose category...</option>
                                {categories.map((item) => (
                                    <option key={item.value} value={item.value}>{item.label}</option>
                                ))}
                            </select>
                            {errors.category && (
                                <span className="text-red-500 text-sm">{errors.category.message}</span>
                            )}
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-100"
                >
                    {id ? "Update product" : "Add product"}
                </button>
            </form>
        </Card>
    )
}