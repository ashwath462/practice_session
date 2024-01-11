import { forEachChild } from "typescript";

// Function to check weather the input value is a Number of not. ie the string Value must only contain digits and no character
function isNumber(value: string){
    return ((value != null) && (value !== '') && !isNaN(Number(value)));
}
 
 // Function to check weather the input value is a valid Name
export function validateName(name:string){
    if(name?.length && name[0]>='0' && name[0]<='9'){
        throw new Error('First letter of name cannot be a number!');
    }
    if(name.length >= 3 && name.length<=20){
        return name.slice(0,1).toUpperCase()+name.slice(1).toLowerCase();
    }
    throw new Error('Please enter a valid name (Expected characters in range 3-20)')
}
 
 // Function to check weather the input value is a valid price
export function validatePrice(price: string){
    price = price.trim();
    if(isNumber(price) && price.length <= 9){
        return Number(price);
    }
    throw new Error('Kindly enter a valid number!');
}
 
 
 // Function to check weather the input value is a valid Quantity
export function validateQuantity(quantity: string){
    quantity = quantity.trim();
    if(isNumber(quantity) && quantity.length <= 3 && Number(quantity)<=100 && Number(quantity)>=1){
        return Number(quantity);
    }
    throw new Error('Quantity must be a number between 1-100!');
}

export function validateUserInput(inputValues : string){
    let itemValues = inputValues.split(" ");
    let index:number[]=[];
    itemValues.map((e:any, i:number)=>{
        if(e == '') index.push(i);
    })
    for(let i = index.length-1; i>=0; i--){
        itemValues.splice(index[i],1);
    }
    if(itemValues.length == 8){
        itemValues.map((e:string)=>{e = e.toLowerCase().trim()});
        return itemValues;
    }
    throw new Error("Kindly enter valid details");
}

export function validateType(type: string){
    type = type.toLowerCase().trim();
    if(type == "raw" || type == "manufactured" || type == "imported") return type;
    throw new Error("Invalid type of item! Kindly enter a valid type.")
}


export function add(a:number, b:number): number {
    return a + b;
}