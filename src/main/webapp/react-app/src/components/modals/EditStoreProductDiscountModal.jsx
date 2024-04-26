import MatModal from "./MatModal/MatModal";
import {useForm} from "react-hook-form";
import {checkValidPrice} from "@/validators/StoreProductValidations.jsx";
import FormInput from './../inputs/FormInput.jsx';
import {IoIosClose} from "react-icons/io";
import {toast} from "react-toastify";

export default function EditStoreProductDiscountModal({
                                           selectedStoreProduct,
                                           open,
                                           handleClose,
                                           fetchStoreProductsData
                                       }) {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
    } = useForm({
        defaultValues: {
            productsNumber: 0,
        }
    });

    const validNumber = (value) =>{
        if(value < 1 || value > selectedStoreProduct.productsNumber)
            return `Number must be (1 to ${selectedStoreProduct.productsNumber})!`;
    };

    const updateStoreProduct = async (productsNumber) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                command_name: "POST_ADD_PROM_PRODUCT_IN_SHOP",
            },
            body: JSON.stringify({
                UPC: selectedStoreProduct.UPC,
                products_number: productsNumber
            }),
        };
        try {
            const response = await fetch(
                "http://localhost:8080/controller",
                requestOptions
            );
            await response.json();
            toast.success("Promotional product was created!")
            handleClose();
            fetchStoreProductsData();
        } catch (err) {
            toast.error(`ERROR: ${err}`)
        }
    }

    const onSubmit = () => {
        const productsNumber = getValues().productsNumber;
        updateStoreProduct(productsNumber);
    }
    
    return (
        <MatModal open={open} handleClose={handleClose}>
            <div className="flex justify-end items-center">
                <IoIosClose onClick={handleClose}
                            className="text-gray-400 text-4xl hover:text-opacity-80 active:text-opacity-50"/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    label="Number"
                    name="productsNumber"
                    placeholder="Number of dicount items"
                    type="number"
                    register={register}
                    errors={errors}
                    required={true}
                    validateFunc={validNumber}
                />
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 mt-4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-100"
                >Make a discount</button>
            </form>
        </MatModal>
    );
}
