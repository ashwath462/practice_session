export class GuestType{
    public guestType: string;
    public textName: string;
    public subTextName: string;
    public defaultValue: number;
    public minValue: number;
    public maxValue: number;
    public displayOrder: number;
    public errorMessage: string;

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