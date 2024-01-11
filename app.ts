import * as promptSync from "prompt-sync";
const prompt = promptSync();

type itemsRecord = {
    name: string,
    price: number,   //original price
    quantity: number ,
    type: 'raw'|'manufactured'|'imported';
    salesTax: number,
    finalPrice: number  //price after applying tax, taxedPrice
}

let allItemsCollection:itemsRecord[] = [];

// Function to check weather the input value is a Number of not. ie the string Value must only contain digits and no character
function isNumber(value: string){
   return ((value != null) && (value !== '') && !isNaN(Number(value)));
}



// Function to check weather the input value is a valid Name
function verifyName(name:string){
    if(name?.length && name[0]>='0' && name[0]<='9'){
        throw new Error('First letter cannot be a number!');
    }
    if(name.length >= 3 && name.length<=20){
        return name.slice(0,1).toUpperCase()+name.slice(1).toLowerCase();
    }
    throw new Error('Please enter a valid name (Expected characters in range 3-20)')
}

// Function to check weather the input value is a valid price
function verifyPrice(price: string){
    if(isNumber(price) && price.length <= 9){
        return Number(price);
    }
    throw new Error('Kindly enter a valid number!');
}


// Function to check weather the input value is a valid Quantity
function verifyQuantity(quantity: string){
    if(isNumber(quantity) && quantity.length <= 3 && Number(quantity)<=100 && Number(quantity)>=1){
        return Number(quantity);
    }
    throw new Error('Quantity must be a number between 1-100!');
}

function setType(){
    console.log("Choose the type of item from the following : \n1. Raw\n2. Manufactured\n3. Imported\n");
    while(true){
        const input = prompt("Enter the number corresponding to the type you want to select : ")
        if(input == 1) return "raw";
        else if(input == 2) return "manufactured";
        else if (input == 3) return "imported";
        else console.log("Invalid input. Try again.");
    }
}


function main(){
    while(true){
        let itemDetails = ['price','quantity','type'];
        let itemDetailsValidationFunctions = [verifyPrice,verifyQuantity,setType];
        let item:itemsRecord = {name:"",price:0,quantity:0,type: "raw",salesTax: 0,finalPrice: 0};
        try{
            let name: string = prompt("Enter item name : ").trim();
            name = verifyName(name);
            item["name"] = name;
            for(let i = 0; i<2; i++){
                console.log('Kindly enter the further details about item : ');
                itemDetails.map((e:String, x:number)=>{
                    console.log(`${(x+1)}: Enter the ${e} of item`);
                })
                while(true){
                    let input = prompt('Kindly enter the number corresponding to property of item you want to enter : ');
                    if(input == 1 || input == 2 || (i == 0 && input == 3)){
                        let userInputValue;
                        if(itemDetails[input-1] != "type")userInputValue = prompt(`Enter item's ${itemDetails[input-1]} : `);
                        userInputValue = itemDetailsValidationFunctions[input-1](userInputValue);
                        item[itemDetails[input-1]] = userInputValue;
                        
                        //remove the entered details information from input ui
                        itemDetails.splice(input-1,1);
                        itemDetailsValidationFunctions.splice(input-1,1);
                        break;
                    }
                    else console.log("Invalid input. Try Again!");
                }

                // considering and taking input for the last left choice by default
            }
            let userInputValue;
            if(itemDetails[0] != "type") userInputValue = prompt(`Enter item ${itemDetails[0]} : `);
            userInputValue = itemDetailsValidationFunctions[0](userInputValue);
            item[itemDetails[0]] = userInputValue;



            // Calculate Tax for the item
            let taxAppliedOnItem:number;
            let finalPrice:number;
            if(item.type != 'imported'){
                taxAppliedOnItem = ((item.price*125)/1000);
                if(item.type != 'raw') taxAppliedOnItem += (2*(taxAppliedOnItem+item.price))/100;
                finalPrice = item.price+taxAppliedOnItem;
            }
            else{
                let surcharge:number;
                taxAppliedOnItem = (item.price*10)/100;
                finalPrice = item.price+taxAppliedOnItem;
                if(finalPrice<=100) surcharge = 5;
                else if(finalPrice>=100 && finalPrice<=200) surcharge=10;
                else surcharge = (5*finalPrice)/100;

                taxAppliedOnItem+=surcharge
                finalPrice+=surcharge;
            }
            item.salesTax = taxAppliedOnItem*item.quantity;
            item.finalPrice = finalPrice*item.quantity;

            //print the values
            console.log(`The details for item you have entered are as follows : \n1. Name : ${item.name}\n2. Price : ${item.price}\n3. Quantity : ${item.quantity}\n4. Type : ${item.type}\n5. Calculated Sales Tax for this item : ${item.salesTax}\n6. Final Price of item : ${item.finalPrice}`);
            while(true){
                let input:String = prompt("Would you like to save this item? (Y/N)");
                if(input == "Y" || input == "y"){
                    allItemsCollection.push(item);
                    break;
                }
                else if(input == "N" || input == "n") break;
            }
        }
        catch(error){
            console.log(error.message);
            break;
        }
    }
}


// const name: string = prompt("Enter your name : ");
// console.log(`Hello ${name}, How are you?`)
main();
console.log(allItemsCollection);