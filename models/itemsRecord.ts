import promptSync from "prompt-sync";
const prompt = promptSync();
import { itemDetails, itemDetailsValidationFunctions } from "../utility/constants";

export abstract class Item {
    protected name: string;
    protected price: number;   //original price
    protected quantity: number;
    protected salesTax: number;
    protected finalPrice: number;  //price after applying tax, taxedPrice

    constructor(name: string, price: number, quantity: number){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.salesTax = 0;
        this.finalPrice = 0;
    }

    public abstract calculateSalesTax():number;

}

// Type = Raw
class RawItem extends Item {
    protected type:string;
    constructor(name: string,price: number, quantity:number) {
        super(name,price,quantity);
        this.type = "raw";
    }

    public calculateSalesTax() {
        this.salesTax = ((this.price*0.125));
        this.finalPrice = this.price+this.salesTax;
        this.salesTax *= this.quantity;
        this.finalPrice *= this.quantity;

        return this.finalPrice;
    }
}

// Type = Manufactured
class ManufacturedItem extends Item {
    protected type:string;
    constructor(name:string, price: number, quantity: number) {
        super(name,price,quantity);
        this.type = "manufactured";
    }

    public calculateSalesTax() {
        this.salesTax = (this.price * 0.125);
        this.salesTax += (0.02 * (this.price + this.salesTax));
        this.finalPrice = this.price + this.salesTax;
        this.salesTax *= this.quantity;
        this.finalPrice *= this.quantity;

        return this.finalPrice;
    }   
}

// Type = Imported
class Imported extends Item {
    protected type:string;
    constructor(name:string, price:number, quantity: number) {
        super(name,price,quantity);
        this.type = "imported";
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

        return this.finalPrice;
    }
}


// Factory Item
export class ItemFactory {
    protected static allItemsList:Item[] = [];
    public static checkType(name:string, price:number, quantity:number, type:string):any{
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

    public static createItem(userInput:any){
        try{
            for (let [key, value] of userInput) {
                let index:number = itemDetails.indexOf(key);
                value = itemDetailsValidationFunctions[index](value);
                userInput.set(key,value);
            }
    
            const item:any = this.checkType(userInput.get('name'),userInput.get('price'),userInput.get('quantity'),userInput.get('type'));
            item.calculateSalesTax();
            return item;
        }
        catch(error:any){
            console.log(error.message);
            return;
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

    public static displayAllItems(){
        while(true){
            const input = prompt("Would you like to view all item list (y/n) : ")
            if(input == "Y" || input == "y"){
                console.log(this.allItemsList);
                break;
            }
            else if (input == "N" || input == "n") break;
            else continue;
        }
    }
}