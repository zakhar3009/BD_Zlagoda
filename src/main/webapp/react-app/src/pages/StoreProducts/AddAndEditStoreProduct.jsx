import Card from "@/components/cards/Card.jsx";
import FormInput from "@/components/inputs/FormInput.jsx";
import useFetchStoreProduct from "@/hooks/StoreProduct/useFetchStoreProduct.jsx";
import useCreateUpdateStoreProduct from "@/hooks/StoreProduct/useCreateUpdateStoreProduct.jsx";
import {checkProductsNumber, checkValidPrice} from "@/validators/StoreProductValidations.jsx";

export default function AddAndEditStoreProduct() {
    const {id, product} = useFetchStoreProduct();
    const {register, handleSubmit, onSubmit, errors, products} = useCreateUpdateStoreProduct(
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
                    {!id && <div className="sm:col-span-6">
                        <label
                            htmlFor="product"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            Choose a product
                        </label>

                        <select
                            {...register("product",{
                                required: {
                                    value: true,
                                    message: `Field product is required!`,
                                },
                                validate: (value) => {
                                    if(!value)
                                        return "Product must be chosen!"
                                }
                            })}
                            name="product"
                            id="product"
                            className="block pl-3 w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option value="">Choose product...</option>
                            {products.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        {errors.product && (
                            <span className="text-red-500 text-sm">{errors.product.message}</span>
                        )}
                    </div>}
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <FormInput
                                label="Selling Price"
                                name="sellingPrice"
                                placeholder="Selling Price"
                                type="number"
                                register={register}
                                errors={errors}
                                required={true}
                                validateFunc={checkValidPrice}
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <FormInput
                                label="Products number"
                                name="productsNumber"
                                placeholder="Products number"
                                type="number"
                                register={register}
                                errors={errors}
                                required={true}
                                validateFunc={checkProductsNumber}
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-100"
                >
                    {id ? "Update store product" : "Add store product"}
                </button>
            </form>
        </Card>
    )
}