import { Types } from "../utility/constants";
export class Item {
    private name: string;
    private price: number;   //original price
    private quantity: number;
    private type: string;
    private salesTax: number;
    private finalPrice: number;  //price after applying tax, taxedPrice

    constructor(mappedValues:Map<string,(string|number)>){
        this.name = String(mappedValues.get("name"));
        this.price = Number(mappedValues.get("price"));
        this.quantity = Number(mappedValues.get("quantity"));
        this.type = String(mappedValues.get("type"));
        this.salesTax = 0;
        this.finalPrice = 0;
    }

    public calculateSalesTax(){
        if(this.type == 'raw'){
            this.salesTax = ((this.price*125)/1000);
            this.finalPrice = this.price+this.salesTax;
        }
        else if(this.type == 'manufactured'){
            this.salesTax = ((this.price*125)/1000);
            this.salesTax += (2*(this.salesTax+this.price))/100;
            this.finalPrice = this.price+this.salesTax;
        }
        else{
            let surcharge:number;
            this.salesTax = (this.price*10)/100;
            this.finalPrice = this.price+this.salesTax;
            if(this.finalPrice<=100) surcharge = 5;
            else if(this.finalPrice>=100 && this.finalPrice<=200) surcharge=10;
            else surcharge = (5*this.finalPrice)/100;

            this.salesTax+=surcharge
            this.finalPrice+=surcharge;
        }
        this.salesTax *= this.quantity;
        this.finalPrice *= this.quantity;
    }

    public displayAllDetails(){
        console.log(`The details for this you have entered are as follows : \n1. Name : ${this.name}\n2. Price : ${this.price}\n3. Quantity : ${this.quantity}\n4. Type : ${this.type}\n5. Calculated Sales Tax for this this : ${this.salesTax}\n6. Final Price of this : ${this.finalPrice}`);
    }
}
