import { ItemFactory } from '../models/itemsRecord';
import { itemDetails, itemDetailsValidationFunctions } from './constants';

export function mapInputDetails(input:string[]){
    let i:number = 0;
    let key:string[] = [];
    let value:string[] = [];
    try{
        if(input.length != 8 || input[0]!="-name") throw new Error("Kindly enter all arguments correctly. -name must be entered first");
        for(i = 0; i<8; i+=2){
            if(input[i][0] == '-'){
                key.push(input[i].slice(1));
                value.push(input[i+1]);
            }
        }
        if(key.length!=4 || value.length!=4) throw new Error('Kindly enter all details in correct format!');
    }
    catch(error:any){
        console.log(error.message);
        return;
    }
    let item = new Map<string, string>();
    key.map((key:string, i:number)=>{item.set(key,value[i])});
    return item;
}

export function processUserInput(inputValues : string){
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
