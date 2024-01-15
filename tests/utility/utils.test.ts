import { expect, test } from 'vitest';
import { ItemFactory } from '../../models/ItemFactory';
import { mapInputDetails, processUserInput, itemDetailsValidationFunctions } from '../../utility/utils';
import { RawItem } from '../../models/RawItem';
import { ImportedItem } from '../../models/ImportedItem';
import { ManufacturedItem } from '../../models/ManufacturedItem';
test("Testing Validate Name", () => {
    expect(itemDetailsValidationFunctions["name"]("ashwath")).toBe("Ashwath");
    expect(itemDetailsValidationFunctions["name"]("ash")).toBe("Ash");
    expect(itemDetailsValidationFunctions["name"]("1ash")).toBe("1ash");
    expect(itemDetailsValidationFunctions["name"]("TaHJ")).toBe("Tahj");
    expect(itemDetailsValidationFunctions["name"]("Bcq HR")).toBe("Bcq hr");
})

test.fails('name validation fail', () => {
    expect(itemDetailsValidationFunctions["name"]("as")).toThrowError();
    expect(itemDetailsValidationFunctions["name"]("ashwathashwathashwath")).toThrowError(Error("Please enter a valid name (Expected characters in range 3-20)"));
})

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

test.fails('price validation fail', () => {
    expect(itemDetailsValidationFunctions["price"]("abc")).toThrowError();
    expect(itemDetailsValidationFunctions["price"]("100000000000000")).toThrowError();
    expect(itemDetailsValidationFunctions["price"]("1fg")).toThrowError();
    expect(itemDetailsValidationFunctions["price"]("-0.001")).toThrowError();
    expect(itemDetailsValidationFunctions["price"]("-100")).toThrowError();
    expect(itemDetailsValidationFunctions["price"]("0")).toThrowError();
})

test('Testing validate Quantity', () => {
    expect(itemDetailsValidationFunctions["quantity"]("1")).toBe(1);
    expect(itemDetailsValidationFunctions["quantity"]("10")).toBe(10);
    expect(itemDetailsValidationFunctions["quantity"]("100")).toBe(100);
})

test.fails('quality validation fail', () => {
    expect(itemDetailsValidationFunctions["quantity"]("-10")).toThrowError();
    expect(itemDetailsValidationFunctions["quantity"]("10.5")).toThrowError();
    expect(itemDetailsValidationFunctions["quantity"]("1.5")).toThrowError();
    expect(itemDetailsValidationFunctions["quantity"]("101")).toThrowError();
    expect(itemDetailsValidationFunctions["quantity"]("1000")).toThrowError();
    expect(itemDetailsValidationFunctions["quantity"]("0")).toThrowError();
})

test('Testing validate type', () => {
    expect(itemDetailsValidationFunctions["type"]("raw")).toBe("raw");
    expect(itemDetailsValidationFunctions["type"]("manufactured")).toBe("manufactured");
    expect(itemDetailsValidationFunctions["type"]("imported")).toBe("imported");
})

test.fails('type validation fail', () => {
    expect(itemDetailsValidationFunctions["type"]('abc')).toThrowError();
    expect(itemDetailsValidationFunctions["type"]('manufactree')).toThrowError();
    expect(itemDetailsValidationFunctions["type"]('important')).toThrowError();
    expect(itemDetailsValidationFunctions["type"](' ')).toThrowError();
    expect(itemDetailsValidationFunctions["type"]('')).toThrowError();
})

test('map input details', () => {
    expect(mapInputDetails(['-name', 'itemName', '-type', 'raw', '-price', '100', '-quantity', '12'])).toStrictEqual(new Map<string, any>([['name', 'Itemname'], ['type', 'raw'], ['price', 100], ['quantity', 12]]));
    expect(mapInputDetails(['-name', 'tea', '-price', '245', '-type', 'manufactured', '-quantity', '12'])).toStrictEqual(new Map<string, any>([['name', 'Tea'], ['price', 245], ['type', 'manufactured'], ['quantity', 12]]));
})

test.fails('map input details fails', () => {
    expect(mapInputDetails(['-name', '-price', '-type', '-quantity', 'itemName', '100', 'raw'])).toThrowError();
    expect(mapInputDetails(['-price', '-name', '-type', '-quantity', 'itemName', '100', 'raw'])).toThrowError();
    expect(mapInputDetails(['-name', '-price', '-type', '-quantity', 'itemName', '100', 'raw', 'asdf', '90'])).toThrowError();
    expect(mapInputDetails(['-name', '-price', '-type', '-quantity', '-itemName', '-100', 'raw', '90'])).toThrowError();
    expect(mapInputDetails(['-name', '-price', '-type', '-quantity', 'itemName', '100', 'raw', '90'])).toThrowError();
})

test('process user input', () => {
    expect(processUserInput("  -name item1 -price 1000      -quantity 10 -type imported")).toStrictEqual(new Map<string, any>([['name', 'Item1'], ['price', 1000], ['quantity', 10], ['type', 'imported']]));
    expect(processUserInput("  -name bag     -quantity 10000  -price 250  -type manufactured")).toStrictEqual(new Map<string, any>([['name', 'Bag'], ['price', 250], ['quantity', 10000], ['type', 'manufactured']]));
    expect(processUserInput("  -name shoe -type raw -price 2500       -quantity 22 ")).toStrictEqual(new Map<string, any>([['name', 'Shoe'], ['price', 2500], ['quantity', 22], ['type', 'raw']]));
    expect(processUserInput("  -name tie -price 200       -quantity 350 -type manufactured")).toStrictEqual(new Map<string, any>([['name', 'Tie'], ['price', 200], ['quantity', 350], ['type', 'manufactured']]));
    expect(processUserInput("  -name box -price 10       -quantity 500 -type raw")).toStrictEqual(new Map<string, any>([['name', 'Box'], ['price', 10], ['quantity', 500], ['type', 'raw']]));
})

test.fails('process user input fails', () => {
    expect(processUserInput("-price ash 10 -quantity 100 -type raw")).toThrowError();
    expect(processUserInput("-name item1 -price ash 10 -quantity 100 -type raw")).toThrowError();
    expect(processUserInput("-price item 1 10 -quantity 100 -type raw")).toThrowError();
})

test('Create Item', () => {
    let value = new RawItem("Ash", 10, 100);
    value.calculateSalesTax();
    expect(ItemFactory.createItem(new Map<string, any>([["name", "Ash"], ["price", 10], ["quantity", 100], ["type", "raw"]]))).toStrictEqual(value);

    value = new ImportedItem("Item1", 20, 50);
    value.calculateSalesTax();
    expect(ItemFactory.createItem(new Map<string, any>([["name", "Item1"], ["price", 20], ["quantity", 50], ["type", "imported"]]))).toStrictEqual(value);

    value = new ManufacturedItem("Football", 200, 25);
    value.calculateSalesTax();
    expect(ItemFactory.createItem(new Map<string, any>([["name", "Football"], ["price", 200], ["quantity", 25], ["type", "manufactured"]]))).toStrictEqual(value);

})

test.fails('Create item fails', () => {
    expect(ItemFactory.createItem(new Map<string, string>([["name", "football"], ["price", "200"], ["quantity", "125"], ["type", "manufactured"]]))).toThrowError();
    expect(ItemFactory.createItem(new Map<string, string>([["name", "item2"], ["price", "200"], ["quantity", "125"], ["type", "manufacture"]]))).toThrowError();
    expect(ItemFactory.createItem(new Map<string, string>([["name", "item3"], ["price", "200"], ["quantity", "125"], ["type", "raw"]]))).toThrowError();
    expect(ItemFactory.createItem(new Map<string, string>([["name", " "], ["price", "200"], ["quantity", "125"], ["type", "raw"]]))).toThrowError();
    expect(ItemFactory.createItem(new Map<string, string>([["name", " "], ["price", "abc"], ["quantity", "125"], ["type", "raw"]]))).toThrowError();
    expect(ItemFactory.createItem(new Map<string, string>([["name", " "], ["price", "abc"], ["quantity", "avg"], ["type", "imported"]]))).toThrowError();
})
