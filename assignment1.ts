import promptSync from "prompt-sync";
import { Item } from "./models/Item";
import { ItemFactory } from "./models/ItemFactory";
import {mapInputDetails, processUserInput, saveItem, displayAllItems} from "./utility/utils";
const prompt = promptSync();
let allItemsList:Item[] = [];


// Driver Code
let userInput:any = mapInputDetails(process.argv.slice(2));
let item = ItemFactory.createItem(userInput);
allItemsList = saveItem(item,allItemsList);
takeInputForNewItem();
displayAllItems(allItemsList);  


// Functions 
function takeInputForNewItem(){
    while(true){
        let input:string = prompt("Do you want to enter details of any other item (y/n) : ");
        if(input == "Y" || input == "y") break;
        else if(input == "N" || input == "n") return;
        else continue;
    }
    let userInput:any = prompt("Enter your item -name -price -quantity and -type  (Name must be first) ");
    userInput = processUserInput(userInput);
    item = ItemFactory.createItem(userInput);
    allItemsList = saveItem(item,allItemsList);
    takeInputForNewItem();
}