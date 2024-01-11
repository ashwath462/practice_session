export function calculateSalesTaxForItem(item:any){
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
    return item;
}