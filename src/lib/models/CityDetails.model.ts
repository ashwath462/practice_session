export class CityDetails{
    public iataCode:string;
    public city:string;
    public countryCode:string;
    public name: string;

    constructor(iataCode:string, city:string, name:string, countryCode:string){
        this.iataCode = iataCode;
        this.city = city;
        this.name = name;
        this.countryCode = countryCode;
    }
}