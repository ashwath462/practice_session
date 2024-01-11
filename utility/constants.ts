import { verifyName, verifyPrice, verifyQuantity, validateItemValues, validateType } from "./utils";

export const itemDetails = ['name','price','quantity','type'];
export const itemDetailsValidationFunctions = [verifyName, verifyPrice,verifyQuantity,validateType];