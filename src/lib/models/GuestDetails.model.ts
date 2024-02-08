export class GuestType{
    private guestType: string;
    private textName: string;
    private subTextName: string;
    private defaultValue: number;
    private minValue: number;
    private maxValue: number;
    private displayOrder: number;
    private errorMessage: string;

    constructor(guestType:string, textName:string, subTextName:string, defaultValue:number,minValue:number, maxValue:number, displayOrder:number, errorMessage:string = ""){
        this.guestType = guestType;
        this.textName = textName;
        this.subTextName = subTextName;
        this.defaultValue = defaultValue;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.displayOrder = displayOrder;
        this.errorMessage = errorMessage;
    }
}