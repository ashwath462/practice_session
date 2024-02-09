export class PassengerDetails{
    public adultCount:number;
    public infantCount:number;
    public childCount:number;

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