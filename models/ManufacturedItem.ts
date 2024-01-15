import { MANUFACTURING_TAX, SALES_TAX } from "../utility/constants";
import { Item } from "./Item";

export class ManufacturedItem extends Item {
    constructor(name:string, price: number, quantity: number) {
        super(name,price,quantity);
        this.type = "manufactured";
    }

    public calculateSalesTax() {
        this.salesTax = (this.price * SALES_TAX);
        this.salesTax += (MANUFACTURING_TAX * (this.price + this.salesTax));
        this.finalPrice = this.price + this.salesTax;
        this.salesTax *= this.quantity;
        this.finalPrice *= this.quantity;

        return this.finalPrice;
    }   
}