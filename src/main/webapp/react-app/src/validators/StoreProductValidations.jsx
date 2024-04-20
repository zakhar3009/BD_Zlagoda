export const checkValidPrice = (value) =>{
    if(value <= 0)
        return "Selling Price must be more then 0!"
};
export const checkProductsNumber = (value) =>{
    if(value <= 0)
        return "Products number must be more then 0!"
}