import { CityDetails } from "./CityDetails";
import { PassedngerDetails } from "./PassengerDetails";
import { TravellerClass } from "./TravellerClass";
import { SortFilterList } from "./SortFilterList";
export class FlightDetails{
    private src:CityDetails;
    private des:CityDetails;
    private departDate:string;
    private partnerCountry:string;
    private passenger:PassedngerDetails;
    private travellerClass: TravellerClass;
    private appliedSortFilter: SortFilterList;
    
    constructor(src:CityDetails, des:CityDetails, departDate:string, partnerCountry:string, passenger:PassedngerDetails, travellerClass: TravellerClass, appliedSortFilter: SortFilterList){
        this.src = src;
        this.des = des;
        this.departDate = departDate;
        this.partnerCountry = partnerCountry;
        this.passenger = passenger;
        this.travellerClass = travellerClass;
        this.appliedSortFilter = appliedSortFilter;
    }

    public getSrc(){
        return this.src;
    }
    public getDes(){
        return this.des;
    }
    public getDepartDate(){
        return this.departDate;
    }
    public getPartnerCountry(){
        return this.partnerCountry;
    }
    public get(){
        return this.passenger;
    }
    public getTravellerClass(){
        return this.travellerClass;
    }
    public getAppliedSortFilter(){
        return this.appliedSortFilter;
    }
}