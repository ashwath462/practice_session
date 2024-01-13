import {expect, test} from 'vitest';
import { Item, ItemFactory } from '../../models/itemsRecord';
import { validateName, validatePrice, validateQuantity, validateType } from '../../utility/utils';
import { mapInputDetails, processUserInput } from '../../utility/main';
test("Testing Validate Name" , () => {
    expect(validateName("ashwath")).toBe("Ashwath");
    expect(validateName("ash")).toBe("Ash");
    expect(validateName("1ash")).toBe("1ash");
    expect(validateName("TaHJ")).toBe("Tahj");
    expect(validateName("Bcq HR")).toBe("Bcq hr");
})

test.fails('name validation fail', () => {
    expect(validateName("as")).toThrowError();
    expect(validateName("ashwathashwathashwath")).toThrowError(Error("Please enter a valid name (Expected characters in range 3-20)"));
})

test("Testing Validate Price", () => {
    expect(validatePrice("1")).toBe(1);
    expect(validatePrice("100")).toBe(100);
    expect(validatePrice("102345")).toBe(102345);
    expect(validatePrice("0012")).toBe(12);
    expect(validatePrice("00000000000009")).toBe(9);
    expect(validatePrice("10000000")).toBe(10000000);
    expect(validatePrice("10.234")).toBe(10.234);
    expect(validatePrice("0.001")).toBe(0.001);
})

test.fails('price validation fail', () => {
    expect(validatePrice("abc")).toThrowError();
    expect(validatePrice("100000000000000")).toThrowError();
    expect(validatePrice("1fg")).toThrowError();
    expect(validatePrice("-0.001")).toThrowError();
    expect(validatePrice("-100")).toThrowError();
    expect(validatePrice("0")).toThrowError();
})

test('Testing validate Quantity',() => {
    expect(validateQuantity("1")).toBe(1);
    expect(validateQuantity("10")).toBe(10);
    expect(validateQuantity("100")).toBe(100);
})

test.fails('quality validation fail', () => {
    expect(validateQuantity("-10")).toThrowError();
    expect(validateQuantity("10.5")).toThrowError();
    expect(validateQuantity("1.5")).toThrowError();
    expect(validateQuantity("101")).toThrowError();
    expect(validateQuantity("1000")).toThrowError();
    expect(validateQuantity("0")).toThrowError();
})

test('Testing validate type', () => {
    expect(validateType("raw")).toBe("raw");
    expect(validateType("manufactured")).toBe("manufactured");
    expect(validateType("imported")).toBe("imported");
})

test.fails('type validation fail', () => {
    expect(validateType('abc')).toThrowError();
    expect(validateType('manufactree')).toThrowError();
    expect(validateType('important')).toThrowError();
    expect(validateType(' ')).toThrowError();
    expect(validateType('')).toThrowError();
})

test('map input details', () => {
    expect(mapInputDetails(['-name','itemName','-type','raw','-price','100','-quantity','12'])).toStrictEqual(new Map<string,string>([['name','itemName'],['type', 'raw'],['price','100'],['quantity','12']]));
    expect(mapInputDetails(['-name','tea','-price','245','-type','manufactured','-quantity','12'])).toStrictEqual(new Map<string,string>([['name','tea'],['price','245'],['type', 'manufactured'],['quantity','12']]));
})

test.fails('map input details fails', () => {
    expect(mapInputDetails(['-name','-price','-type','-quantity','itemName','100','raw'])).toThrowError();
    expect(mapInputDetails(['-price','-name','-type','-quantity','itemName','100','raw'])).toThrowError();
    expect(mapInputDetails(['-name','-price','-type','-quantity','itemName','100','raw','asdf','90'])).toThrowError();
    expect(mapInputDetails(['-name','-price','-type','-quantity','-itemName','-100','raw','90'])).toThrowError();
    expect(mapInputDetails(['-name','-price','-type','-quantity','itemName','100','raw','90'])).toThrowError();
})

test('process user input', () => {
    expect(processUserInput("  -name -price ash 10 -quantity 100 -type raw")).toStrictEqual(['-name','-price','ash','10','-quantity','100','-type','raw']);
    expect(processUserInput("  -name ash -price 10       -quantity 100 -type imported")).toStrictEqual(['-name','ash','-price','10','-quantity','100','-type','imported']);
    expect(processUserInput("  -name -price         -quantity ash 10 100 -type  manufactured")).toStrictEqual(['-name','-price','-quantity','ash','10','100','-type','manufactured']);
    expect(processUserInput("  -name -price -quantity       -type        item 100 10 raw        ")).toStrictEqual(['-name','-price','-quantity','-type','item','100','10','raw']);
    expect(processUserInput("  -name -price ash 10    -quantity 100 -type raw")).toStrictEqual(['-name','-price','ash','10','-quantity','100','-type','raw']);
})

test.fails('process user input fails', () => {
    expect(processUserInput("-price ash 10 -quantity 100 -type raw")).toThrowError();
    expect(processUserInput("-name item1 -price ash 10 -quantity 100 -type raw")).toThrowError();
    expect(processUserInput("-price item 1 10 -quantity 100 -type raw")).toThrowError();
})

test('validate and create Item', () => {
    let value:any = ItemFactory.checkType("Ash",10,100,"raw");
    value.calculateSalesTax();
    expect(ItemFactory.createItem(new Map<string,string>([ ["name","ash"],["price","10"],["quantity","100"],["type","raw"] ]))).toStrictEqual(value);

    value = ItemFactory.checkType("Item1",20,50,"imported");
    value.calculateSalesTax();
    expect(ItemFactory.createItem(new Map<string,string>([ ["name","item1"],["price","20"],["quantity","50"],["type","imported"] ]))).toStrictEqual(value);

    value = ItemFactory.checkType("Football",200,25,"manufactured");
    value.calculateSalesTax();
    expect(ItemFactory.createItem(new Map<string,string>([ ["name","football"],["price","200"],["quantity","25"],["type","manufactured"] ]))).toStrictEqual(value);

})

test.fails('validate and create item fails', () => {
    expect(ItemFactory.createItem(new Map<string,string>([ ["name","football"],["price","200"],["quantity","125"],["type","manufactured"] ]))).toThrowError();
    expect(ItemFactory.createItem(new Map<string,string>([ ["name","item2"],["price","200"],["quantity","125"],["type","manufacture"] ]))).toThrowError();
    expect(ItemFactory.createItem(new Map<string,string>([ ["name","item3"],["price","200"],["quantity","125"],["type","raw"] ]))).toThrowError();
    expect(ItemFactory.createItem(new Map<string,string>([ ["name"," "],["price","200"],["quantity","125"],["type","raw"] ]))).toThrowError();
    expect(ItemFactory.createItem(new Map<string,string>([ ["name"," "],["price","abc"],["quantity","125"],["type","raw"] ]))).toThrowError();
    expect(ItemFactory.createItem(new Map<string,string>([ ["name"," "],["price","abc"],["quantity","avg"],["type","imported"] ]))).toThrowError();
})

test('validate sales tax calculator', () => {
    let value:any = ItemFactory.checkType("football",200,25,"raw");
    expect(value.calculateSalesTax()).toBe(5625);
    value = ItemFactory.checkType("football",100,1,"raw");
    expect(value.calculateSalesTax()).toBe(112.5);
    value = ItemFactory.checkType("football",67,12,"raw");
    expect(value.calculateSalesTax()).toBe(904.5);

    value = ItemFactory.checkType("football",10,100,"manufactured");
    expect(value.calculateSalesTax()).toBe(1147.5);

    value = ItemFactory.checkType("football",500,15,"imported");
    expect(value.calculateSalesTax()).toBe(8662.5);

    value = ItemFactory.checkType("football",100,10,"imported");
    expect(value.calculateSalesTax()).toBe(1200);
})
