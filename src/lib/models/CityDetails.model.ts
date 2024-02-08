export class CityDetails{
    private iataCode:string;
    private city:string;
    private countryCode:string;

    constructor(iataCode:string, city:string,countryCode:string){
        this.iataCode = iataCode;
        this.city = city;
        this.countryCode = countryCode;
    }

    public getIataCode(){
        return this.iataCode;
    };
    public getCity(){
        return this.city;
    };
    public getCountryCode(){
        return this.countryCode;
    };
}