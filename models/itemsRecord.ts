import promptSync from "prompt-sync";
const prompt = promptSync();

export abstract class Item {
    protected name: string;
    protected price: number;   //original price
    protected quantity: number;
    protected type: string;
    protected salesTax: number;
    protected finalPrice: number;  //price after applying tax, taxedPrice

    constructor(name: string, price: number, quantity: number){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.salesTax = 0;
        this.finalPrice = 0;
    }

    public abstract calculateSalesTax();

    public displayAllDetails(){
        console.log(`The details for this you have entered are as follows : \n1. Name : ${this.name}\n2. Price : ${this.price}\n3. Quantity : ${this.quantity}\n4. Type : ${this.type}\n5. Calculated Sales Tax for this this : ${this.salesTax}\n6. Final Price of this : ${this.finalPrice}`);
    }
}

// Type = Raw
class RawItem extends Item {
    constructor(name: string,price: number, quantity:number) {
        super(name,price,quantity);
    }

    public calculateSalesTax() {
        this.salesTax = ((this.price*0.125));
        this.finalPrice = this.price+this.salesTax;
        this.salesTax *= this.quantity;
        this.finalPrice *= this.quantity;
    }
}

// Type = Manufactured
class ManufacturedItem extends Item {
    constructor(name:string, price: number, quantity: number) {
        super(name,price,quantity);
    }

    public calculateSalesTax() {
        this.salesTax = (this.price * 0.125) + (0.02 * (this.price + this.salesTax));
        this.finalPrice = this.price + this.salesTax;
        this.salesTax *= this.quantity;
        this.finalPrice *= this.quantity;
    }   
}

// Type = Imported
class Imported extends Item {
    constructor(name:string, price:number, quantity: number) {
        super(name,price,quantity);
    }

    public calculateSalesTax() {
        this.salesTax = (this.price * 0.1);
        this.finalPrice = this.price + this.salesTax;

        let surcharge: number;
        if (this.finalPrice <= 100) surcharge = 5;
        else if (this.finalPrice >= 100 && this.finalPrice <= 200) surcharge = 10;
        else surcharge = (0.05 * this.finalPrice);

        this.salesTax += surcharge;
        this.finalPrice += surcharge;

        this.salesTax *= this.quantity;
        this.finalPrice *= this.quantity;
    }
}


// Factory Item
export class ItemFactory {
    protected static allItemsList:Item[] = [];

    public static createItem(name:string, price:number, quantity:number, type:string){
        switch (type) {
            case 'raw':
                    return new RawItem(name,price,quantity);
            case 'manufactured':
                    return new ManufacturedItem(name,price,quantity);
            case 'imported':
                    return new Imported(name,price,quantity);
            default:
                    throw new Error("Kindly enter correct type");
        }
    }

    public static saveItem(item: Item){
        console.log(item);
        while(true){
            const inputChoice = prompt("Would you like to save this item (y/n) : ");
            if(inputChoice == "Y" || inputChoice == "y"){
                this.allItemsList = [...this.allItemsList,item];
                break;
            }
            else if(inputChoice == "N" || inputChoice == "n") break;
        }
    }
}