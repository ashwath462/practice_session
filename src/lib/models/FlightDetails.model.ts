import { CityDetails } from "./CityDetails.model";
import { PassengerDetails } from "./PassengerDetails.model";
import { TravellerClass } from "./TravellerClass.model";
import { SortFilterList } from "./SortFilterList.model";
export class FlightDetails{
    public src:CityDetails;
    public des:CityDetails;
    public departDate:string;
    public partnerCountry:string;
    public passenger:PassengerDetails;
    public travellers: TravellerClass;
    public appliedSortFilter: SortFilterList;
    
    constructor(src:CityDetails, des:CityDetails, departDate:string, partnerCountry:string, passenger:PassengerDetails, travellers: TravellerClass, appliedSortFilter: SortFilterList){
        this.src = src;
        this.des = des;
        this.departDate = departDate;
        this.partnerCountry = partnerCountry;
        this.passenger = passenger;
        this.travellers = travellers;
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
        return this.travellers;
    }
    public getAppliedSortFilter(){
        return this.appliedSortFilter;
    }

    public setSrc(src:CityDetails){
        return this.src = src;
    }
    public setDes(des:CityDetails){
        return this.des = des;
    }
    public setDepartDate(departDate:string){
        return this.departDate = departDate;
    }
    public setPartnerCountry(partnerCountry:string){
        return this.partnerCountry = partnerCountry;
    }
    public setPassenger(passenger:PassengerDetails){
        return this.passenger = passenger;
    }
    public setTravellerClass(travellers:TravellerClass){
        return this.travellers = travellers;
    }
    public setAppliedSortFilter(appliedSortFilter:SortFilterList){
        return this.appliedSortFilter = appliedSortFilter;
    }
}