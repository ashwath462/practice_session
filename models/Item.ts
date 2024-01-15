export abstract class Item {
    protected name: string;
    protected price: number;   //original price
    protected quantity: number;
    protected salesTax: number;
    protected finalPrice: number;  //price after applying tax, taxedPrice
    protected type: string;

    constructor(name: string, price: number, quantity: number) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.salesTax = 0;
        this.finalPrice = 0;
        this.type = "";
    }

    public abstract calculateSalesTax(): number;

}
