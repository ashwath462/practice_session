// Function to check weather the input value is a valid Name
export function validateName(name:string){
    if(name.length >= 3 && name.length<=20){
        return name.slice(0,1).toUpperCase()+name.slice(1).toLowerCase();
    }
    throw new Error('Please enter a valid name (Expected characters in range 3-20)')
}
 
// Function to check weather the input value is a valid price
export function validatePrice(price: any){
    if(!isNaN(Number(price)) && price.length >=1){
        price = Number(price);
        if(price<=10000000 && price>0) return price;
    }
    throw new Error('Kindly enter a valid number!');
}
 
 
// Function to check weather the input value is a valid Quantity
export function validateQuantity(quantity: any){
    if(!isNaN(Number(quantity)) && quantity.length>=1 && quantity.length <= 3 && Number(quantity)<=100 && Number(quantity)>=1){
        quantity = Number(quantity);
        if(quantity%1 == 0) return quantity;
    }
    throw new Error('Quantity must be a number between 1-100!');
}

export function validateType(type: string){
    if(type == "raw" || type == "manufactured" || type == "imported") return type;
    throw new Error("Invalid type of item! Kindly enter a valid type.")
}