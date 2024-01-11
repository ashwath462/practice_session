export class itemsRecord {
    private name: string;
    private price: number;   //original price
    private quantity: number;
    private type: "raw"|"manufactured"|"imported";
    private salesTax: number;
    private finalPrice: number;  //price after applying tax, taxedPrice

    constructor(name:string,price:number,quantity:number,type:("raw"|"manufactured"|"imported")){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.type = type;
        this.salesTax = 0;
        this.finalPrice = 0;
    }

    public calculateSalesTax(){
        let taxAppliedOnItem:number;
        let finalPrice:number;
        if(this.type == 'raw'){
            taxAppliedOnItem = ((this.price*125)/1000);
            finalPrice = this.price+taxAppliedOnItem;
        }
        else if(this.type == 'manufactured'){
            taxAppliedOnItem = ((this.price*125)/1000);
            taxAppliedOnItem += (2*(taxAppliedOnItem+this.price))/100;
            finalPrice = this.price+taxAppliedOnItem;
        }
        else{
            let surcharge:number;
            taxAppliedOnItem = (this.price*10)/100;
            finalPrice = this.price+taxAppliedOnItem;
            if(finalPrice<=100) surcharge = 5;
            else if(finalPrice>=100 && finalPrice<=200) surcharge=10;
            else surcharge = (5*finalPrice)/100;

            taxAppliedOnItem+=surcharge
            finalPrice+=surcharge;
        }
        this.salesTax = taxAppliedOnItem*this.quantity;
        this.finalPrice = finalPrice*this.quantity;
    }

    public displayAllDetails(){
        console.log(`The details for this you have entered are as follows : \n1. Name : ${this.name}\n2. Price : ${this.price}\n3. Quantity : ${this.quantity}\n4. Type : ${this.type}\n5. Calculated Sales Tax for this this : ${this.salesTax}\n6. Final Price of this : ${this.finalPrice}`);
    }
}
