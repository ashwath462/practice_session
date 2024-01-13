import promptSync from "prompt-sync";
import { Types, itemDetails } from "./utility/constants";
import { Item, ItemFactory } from "./models/itemsRecord";
import {mapInputDetails, processUserInput} from "./utility/main";
import { factory } from "typescript";
const prompt = promptSync();
let allItemsCollection:Item[] = [];


// Driver Code
let item:any = mapInputDetails(process.argv.slice(2));
item = ItemFactory.createItem(item);
ItemFactory.saveItem(item);
takeInputForNewItem();
ItemFactory.displayAllItems()


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
    let item:any = mapInputDetails(userInput);
    item = ItemFactory.createItem(item);
    ItemFactory.saveItem(item);
    takeInputForNewItem();
}