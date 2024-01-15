import { SALES_TAX } from "../utility/constants";
import { Item } from "./Item";

export class RawItem extends Item {
    constructor(name: string, price: number, quantity: number) {
        super(name, price, quantity);
        this.type = "raw";
    }

    public calculateSalesTax() {
        this.salesTax = ((this.price * SALES_TAX));
        this.finalPrice = this.price + this.salesTax;
        this.salesTax *= this.quantity;
        this.finalPrice *= this.quantity;

        return this.finalPrice;
    }
}