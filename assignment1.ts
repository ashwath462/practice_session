import promptSync from "prompt-sync";
import { Types } from "./utility/constants";
import { Item } from "./models/itemsRecord";
import {mapInputDetails, processUserInput, validateAndCreateItem} from "./utility/main";
const prompt = promptSync();
let allItemsCollection:Item[] = [];


// Driver Code
let item:any = mapInputDetails(process.argv.slice(2));
item = validateAndCreateItem(item);
saveItem(item);

while(true){
    const input = prompt("Would you like to view all item list (y/n) : ")
    if(input == "Y" || input == "y"){
        console.log(allItemsCollection);
        break;
    }
    else if (input == "N" || input == "n") break;
    else continue;
}

// Functions 
function saveItem(item:any){
    console.log(item);
    while(true){
        const inputChoice = prompt("Would you like to save this item (y/n) : ");
        if(inputChoice == "Y" || inputChoice == "y"){
            allItemsCollection = [...allItemsCollection,item];
            break;
        }
        else if(inputChoice == "N" || inputChoice == "n") break;
    }
    takeInputForNewItem();
}

function takeInputForNewItem(){
    while(true){
        let input:string = prompt("Do you want to enter details of any other item (y/n) : ");
        if(input == "Y" || input == "y") break;
        else if(input == "N" || input == "n") return;
        else continue;
    }
    let userInput:any = prompt("Enter your item -name -price -quantity and -type  (Name must be first) ");
    userInput = processUserInput(userInput);
    let item:any = mapInputDetails(userInput);
    item = validateAndCreateItem(item);
    saveItem(item);
}