import { expect, test } from 'vitest';
import { ItemFactory } from '../../models/ItemFactory';
import { mapInputDetails, processUserInput, itemDetailsValidationFunctions } from '../../utility/utils';
import { RawItem } from '../../models/RawItem';
import { ImportedItem } from '../../models/ImportedItem';
import { ManufacturedItem } from '../../models/ManufacturedItem';
import { forEachChild } from 'typescript';




test("Testing Validate Name", () => {
    expect(itemDetailsValidationFunctions["name"]("ashwath")).toBe("Ashwath");
    expect(itemDetailsValidationFunctions["name"]("ash")).toBe("Ash");
    expect(itemDetailsValidationFunctions["name"]("1ash")).toBe("1ash");
    expect(itemDetailsValidationFunctions["name"]("TaHJ")).toBe("Tahj");
    expect(itemDetailsValidationFunctions["name"]("Bcq HR")).toBe("Bcq hr");
})

test('name validation fail', () => {
    let testCases:any = [
        "as",
        "ashwathashwathashwath",
    ];

    testCases.forEach((testcase:any)=>{
        expect(()=>itemDetailsValidationFunctions["name"](testcase)).toThrowError();
    });
});

test("Testing Validate Price", () => {
    expect(itemDetailsValidationFunctions["price"]("1")).toBe(1);
    expect(itemDetailsValidationFunctions["price"]("100")).toBe(100);
    expect(itemDetailsValidationFunctions["price"]("102345")).toBe(102345);
    expect(itemDetailsValidationFunctions["price"]("0012")).toBe(12);
    expect(itemDetailsValidationFunctions["price"]("00000000000009")).toBe(9);
    expect(itemDetailsValidationFunctions["price"]("10000000")).toBe(10000000);
    expect(itemDetailsValidationFunctions["price"]("10.234")).toBe(10.234);
    expect(itemDetailsValidationFunctions["price"]("0.001")).toBe(0.001);
})

test('price validation fail', () => {
    let testCases:any = [
        "abc",
        "100000000000000",
        "1fg",
        "-0.001",
        "-100",
        "0",
    ];

    testCases.forEach((testcase:any)=>{
        expect(()=>itemDetailsValidationFunctions["price"](testcase)).toThrowError();
    });
})

test('Testing validate Quantity', () => {
    expect(itemDetailsValidationFunctions["quantity"]("1")).toBe(1);
    expect(itemDetailsValidationFunctions["quantity"]("10")).toBe(10);
    expect(itemDetailsValidationFunctions["quantity"]("100")).toBe(100);
})

test('quality validation fail', () => {
    let testCases:any = [
        "10.99",
        "-10",
        "0",
        "100.1",
        "0.5"
    ];

    testCases.forEach((testcase:any)=>{
        expect(()=>itemDetailsValidationFunctions["quantity"](testcase)).toThrowError();
    });
 
})

test('Testing validate type', () => {
    expect(itemDetailsValidationFunctions["type"]("raw")).toBe("raw");
    expect(itemDetailsValidationFunctions["type"]("manufactured")).toBe("manufactured");
    expect(itemDetailsValidationFunctions["type"]("imported")).toBe("imported");
})

test('type validation fail', () => {
    let testCases:any = [
        "abc",
        "manufactree",
        "importad",
        ' ',
        "",
    ];

    testCases.forEach((testcase:any)=>{
        expect(()=>itemDetailsValidationFunctions["type"](testcase)).toThrowError();
    });
})

test('map input details', () => {
    expect(mapInputDetails(['-name', 'itemName', '-type', 'raw', '-price', '100', '-quantity', '12'])).toStrictEqual(new Map<string, any>([['name', 'Itemname'], ['type', 'raw'], ['price', 100], ['quantity', 12]]));
    expect(mapInputDetails(['-name', 'tea', '-price', '245', '-type', 'manufactured', '-quantity', '12'])).toStrictEqual(new Map<string, any>([['name', 'Tea'], ['price', 245], ['type', 'manufactured'], ['quantity', 12]]));
})

test('map input details fails', () => {
    expect(()=>mapInputDetails(['-name', '-price', '-type', '-quantity', 'itemName', '100', 'raw'])).toThrow();
    expect(()=>mapInputDetails(['-price', '-name', '-type', '-quantity', 'itemName', '100', 'raw'])).toThrow();
    expect(()=>mapInputDetails(['-name', '-price', '-type', '-quantity', 'itemName', '100', 'raw', 'asdf', '90'])).toThrow();
    expect(()=>mapInputDetails(['-name', '-price', '-type', '-quantity', '-itemName', '-100', 'raw', '90'])).toThrow();
    expect(()=>mapInputDetails(['-name', '-price', '-type', '-quantity', 'itemName', '100', 'raw', '90'])).toThrow();
})

test('process user input', () => {
    expect(processUserInput("  -name item1 -price 1000      -quantity 10 -type imported")).toStrictEqual(new Map<string, any>([['name', 'Item1'], ['price', 1000], ['quantity', 10], ['type', 'imported']]));
    expect(processUserInput("  -name bag     -quantity 10000  -price 250  -type manufactured")).toStrictEqual(new Map<string, any>([['name', 'Bag'], ['price', 250], ['quantity', 10000], ['type', 'manufactured']]));
    expect(processUserInput("  -name shoe -type raw -price 2500       -quantity 22 ")).toStrictEqual(new Map<string, any>([['name', 'Shoe'], ['price', 2500], ['quantity', 22], ['type', 'raw']]));
    expect(processUserInput("  -name tie -price 200       -quantity 350 -type manufactured")).toStrictEqual(new Map<string, any>([['name', 'Tie'], ['price', 200], ['quantity', 350], ['type', 'manufactured']]));
    expect(processUserInput("  -name box -price 10       -quantity 500 -type raw")).toStrictEqual(new Map<string, any>([['name', 'Box'], ['price', 10], ['quantity', 500], ['type', 'raw']]));
})

test('process user input fails', () => {
    let testCases:any = [
        "-price ash 10 -quantity 100 -type raw",
        "-name item1 -price ash 10 -quantity 100 -type raw",
        "-price item 1 10 -quantity 100 -type raw"
    ];

    testCases.forEach((testcase:any)=>{
        expect(()=>processUserInput(testcase)).toThrowError();
    });
})

test('Create Item', () => {
    let value = new RawItem("Ash", 10, 100);
    value.calculateSalesTax();
    expect(ItemFactory.createItem(new Map<string, any>([["name", "Ash"], ["price", 10], ["quantity", 100], ["type", "raw"]]))).toStrictEqual(value);

    value = new ImportedItem("Item1", 20, 50);
    value.calculateSalesTax();
    expect(ItemFactory.createItem(new Map<string, any>([["name", "Item1"], ["price", 20], ["quantity", 50], ["type", "imported"]]))).toStrictEqual(value);

    value = new ImportedItem("Item1", 100, 1000);
    value.calculateSalesTax();
    expect(ItemFactory.createItem(new Map<string, any>([["name", "Item1"], ["price", 100], ["quantity", 1000], ["type", "imported"]]))).toStrictEqual(value);

    value = new ImportedItem("Item1", 20000, 10);
    value.calculateSalesTax();
    expect(ItemFactory.createItem(new Map<string, any>([["name", "Item1"], ["price", 20000], ["quantity", 10], ["type", "imported"]]))).toStrictEqual(value);

    value = new ManufacturedItem("Football", 200, 25);
    value.calculateSalesTax();
    expect(ItemFactory.createItem(new Map<string, any>([["name", "Football"], ["price", 200], ["quantity", 25], ["type", "manufactured"]]))).toStrictEqual(value);
})

test('Create item fails', () => {
    let testCases:any = [
        new Map<string, string>([["name", "item2"], ["price", "200"], ["quantity", "125"], ["type", "manufacture"]]),
    ];

    testCases.forEach((testcase:any)=>{
        console.log(testcase);
        expect(()=>ItemFactory.createItem(testcase)).toThrowError();
    });

})
