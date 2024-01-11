import { validateName, validatePrice, validateQuantity, validateType } from "./utils";

export const itemDetails = ['name','price','quantity','type'];
export const itemDetailsValidationFunctions = [validateName, validatePrice,validateQuantity,validateType];