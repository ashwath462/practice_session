import { Item } from '../models/Item';

import promptSync from "prompt-sync";
const prompt = promptSync();

export const itemDetailsValidationFunctions:any = { 
    "name" : (name:string)=>{
        if(name.length >= 3 && name.length<=20){
            return name.slice(0,1).toUpperCase()+name.slice(1).toLowerCase();
        }
        throw new Error('Please enter a valid name (Expected characters in range 3-20)')
    },
    "price" : (price: any)=>{
        if(!isNaN(Number(price)) && price.length >=1){
            price = Number(price);
            if(price<=10000000 && price>0) return price;
        }
        throw new Error('Kindly enter a valid number!');
    },
    "quantity" : (quantity: any)=>{
        if(!isNaN(Number(quantity)) && quantity.length>=1 && Number(quantity)>=1){
            quantity = Number(quantity);
            if(quantity%1 == 0) return quantity;
        }
        throw new Error('Quantity must be a number between 1-100!');
    },
    "type" : (type:string)=>{
        if(type == "raw" || type == "manufactured" || type == "imported") return type;
        throw new Error("Invalid type of item! Kindly enter a valid type.")
    }
}

export function mapInputDetails(input:string[]){
    let item = new Map<string, string>();
    try{
        if(input.length != 8 || input[0]!="-name") {
            throw new Error("Kindly enter all arguments correctly. -name must be entered first");
        }
        for(let i = 0; i<8; i+=2) {
            if(input[i][0] == '-'){
                item.set(input[i].slice(1),input[i+1]);
            }
        }
        if(item.size!=4) {
            throw new Error('Kindly enter all details in correct format!');
        }

        for (let [key, value] of item) {
            value = itemDetailsValidationFunctions[key](value);
            item.set(key,value);
        }
        return item;
    }
    catch(error:any){
        console.log(error.message);
        return;
    }
}

export function processUserInput(inputValues : string){
    inputValues = inputValues.replace(/\s{2,}/g, ' ').trim();
    let itemValues = inputValues.split(" ");
    
    if(itemValues.length == 8){
        itemValues.map((e:string)=>{e = e.toLowerCase()});
        return mapInputDetails(itemValues);
    }

    throw new Error("Kindly enter valid details");
}

export function saveItem(item: Item, allItemsList: Item[]):Item[] {
    console.log(item);
    while(true){
        const inputChoice = prompt("Would you like to save this item (y/n) : ");
        if(inputChoice == "Y" || inputChoice == "y"){
            allItemsList = [...allItemsList,item];
            return allItemsList;
        }
        else if(inputChoice == "N" || inputChoice == "n") break;
    }
    return [];
}

export function displayAllItems(allItemsList: Item[]){
    while(true){
        const input = prompt("Would you like to view all item list (y/n) : ")
        if(input == "Y" || input == "y"){
            console.log(allItemsList);
            break;
        }
        else if (input == "N" || input == "n") break;
        else continue;
    }
}