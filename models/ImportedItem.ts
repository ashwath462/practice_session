import { HIGH_SURCHARGE, IMPORT_DUTY, LOW_SURCHARGE, MID_SURCHARGE } from "../utility/constants";
import { Item } from "./Item";

export class ImportedItem extends Item {
    constructor(name: string, price: number, quantity: number) {
        super(name, price, quantity);
        this.type = "imported";
    }

    public calculateSalesTax() {
        this.salesTax = (this.price * IMPORT_DUTY);
        this.finalPrice = this.price + this.salesTax;

        let surcharge: number;
        if (this.finalPrice <= 100) surcharge = LOW_SURCHARGE;
        else if (this.finalPrice >= 100 && this.finalPrice <= 200) surcharge = MID_SURCHARGE;
        else surcharge = (HIGH_SURCHARGE * this.finalPrice);

        this.salesTax += surcharge;
        this.finalPrice += surcharge;

        this.salesTax *= this.quantity;
        this.finalPrice *= this.quantity;

        return this.finalPrice;
    }
}