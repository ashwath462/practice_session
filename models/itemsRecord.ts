export type itemsRecord = {
    name: string,
    price: number,   //original price
    quantity: number ,
    type: 'raw'|'manufactured'|'imported';
    salesTax: number,
    finalPrice: number  //price after applying tax, taxedPrice
}

