import promptSync from "prompt-sync";
import { itemsRecord } from "./models/itemsRecord";
import { validateName, validatePrice, validateQuantity, validateType, validateUserInput } from "./utility/utils";
import { itemDetails, itemDetailsValidationFunctions } from "./utility/constants";

const prompt = promptSync();
let allItemsCollection:itemsRecord[] = [];



function processUserInput(input:string[]){
    console.log(input);
    if(input.length != 10) return Error("Kindly enter all arguments correctly ");
    let i:number = 0;
    let item:any = {};
    try{
        for(i = 2; i<10; i+=2){
            if(i == 2 && input[i] == '-name' && item.name==null) item.name = input[i+1];
            else if(input[i] == '-price' && item.price==null) item.price = input[i+1];
            else if(input[i] == '-quantity' && item.quantity==null) item.quantity = input[i+1];
            else if(input[i] == '-type' && item.type==null) item.type = input[i+1];
            else throw Error("Kindly enter name first and do not repeat any property");
        }
    }
    catch(error:any){
        console.log(error.message);
        return;
    }
    validateAndCreateItem(item);
    takeInputForNewItem();
}




function validateAndCreateItem(userInput:any){
    // validating the input values and creating item object
    try{
        let name:string = validateName(userInput.name);
        let price:number = validatePrice(userInput.price);
        let quantity:number = validateQuantity(userInput.quantity);
        let type:('raw'|'manufactured'|'imported') = validateType(userInput.type);

        const finalItem = new itemsRecord(name,price,quantity,type);
        finalItem.calculateSalesTax();
        finalItem.displayAllDetails();
        while(true){
            const inputChoice = prompt("Would you like to save this item (y/n) : ");
            if(inputChoice == "Y" || inputChoice == "y"){
                allItemsCollection = [...allItemsCollection,finalItem];
                return;
            }
            else if(inputChoice == "N" || inputChoice == "n") return;
        }
    }
    catch(error:any){
        console.log(error.message);
        return;
    }
}


// calling the main function
function takeInputForNewItem(){
    while(true){
        let input:String = prompt("Do you want to enter details of any other item (y/n) : ");
        if(input == "Y" || input == "y") break;
        else if(input == "N" || input == "n") return;
        else continue;
    }
    let userInput:any = prompt("Enter your item -name -price -quantity and -type  (Name must be first) ");
    userInput = validateUserInput(userInput);
    processUserInput([" "," ",...userInput]);
}



// take user input from command line and process it
processUserInput(process.argv)

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


// process.argv.forEach(function (val, index, array) {
//     console.log(index + ': ' + val);
// });
