export class PassengerDetails{
    private adultCount:number;
    private infantCount:number;
    private childCount:number;

    constructor(adultCount:number, infantCount:number,childCount:number){
        this.adultCount = adultCount;
        this.infantCount = infantCount;
        this.childCount = childCount;
    }

    public getAdultCount(){
        return this.adultCount;
    };
    public getInfantCount(){
        return this.infantCount;
    };
    public getChildCount(){
        return this.childCount;
    };
}