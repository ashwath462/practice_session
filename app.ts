import promptSync from "prompt-sync";
import { itemsRecord } from "./models/itemsRecord";
import { validateItemValues } from "./utility/utils";
import { itemDetails, itemDetailsValidationFunctions } from "./utility/constants";
import { calculateSalesTaxForItem } from "./utility/Tax_Calculator";

const prompt = promptSync();
let allItemsCollection:itemsRecord[] = [];

function main(userInput:string){
    let itemValues = userInput.split(",")
    validateItemValues(itemValues);

    let item:{ [property: string] : string | number | Error } = {name:"",price:0,quantity:0,type: "raw",salesTax: 0,finalPrice: 0};
    let flag:boolean = true;
    
    // mapping the valid input values to its properties
    try{
        for(let i = 0; i<4; i++){
            try{
                let finalValue = itemDetailsValidationFunctions[i](itemValues[i]);
                if(finalValue) item[itemDetails[i]] = finalValue;
            }
            catch(error:any){
                console.log(error.message);
                flag = false;
                break;
            }
        }
        if(flag){
            // Calculate Tax for the item
            const FinalItem = calculateSalesTaxForItem(item);

            //print the values
            console.log(`The details for item you have entered are as follows : \n1. Name : ${item.name}\n2. Price : ${item.price}\n3. Quantity : ${item.quantity}\n4. Type : ${item.type}\n5. Calculated Sales Tax for this item : ${item.salesTax}\n6. Final Price of item : ${item.finalPrice}`);
            while(true){
                let input:String = prompt("Would you like to save this item? (Y/N)");
                if(input == "Y" || input == "y"){
                    allItemsCollection.push(FinalItem);
                    break;
                }
                else if(input == "N" || input == "n") break;
            }
        }
    }
    catch(error:any){
        console.log(error.message);
        return;
    }
}



// calling the main function
while(true){
    let flag = true;
    const userInput:string = prompt("Enter your item Name, Price, Quantity and Type (Input must be comma seperated): ");
    main(userInput);
    //Ask user weather he wants to add another item or not
    while(true){
        let input:String = prompt("Do you want to enter details of any other item (y/n) : ");
        if(input == "Y" || input == "y") break;
        else if(input == "N" || input == "n"){
            flag = false;
            break;
        }
    }
    if(flag == false) break;
}

// asking user weather he wants to view all items list or not
while(true){
    const input = prompt("Would you like to view all item list (y/n) : ")
    if(input == "Y" || input == "y"){
        console.log(allItemsCollection);
        break;
    }
    else if (input == "N" || input == "n") break;
    else continue;
}