import { Item } from "./Item";
import { RawItem } from "./RawItem";
import { ManufacturedItem } from "./ManufacturedItem";
import { ImportedItem } from "./ImportedItem";

export class ItemFactory {
    public static createItem(userInput: any) {
        try {
            let item: any;
            switch (userInput.get('type')) {
                case 'raw':
                    item = new RawItem(userInput.get('name'), userInput.get('price'), userInput.get('quantity'));
                    break;
                case 'manufactured':
                    item = new ManufacturedItem(userInput.get('name'), userInput.get('price'), userInput.get('quantity'));
                    break;
                case 'imported':
                    item = new ImportedItem(userInput.get('name'), userInput.get('price'), userInput.get('quantity'));
                    break;
                default:
                    throw new Error('Type doesn\'t match');
            }
            item.calculateSalesTax();
            return item;
        }
        catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }
}