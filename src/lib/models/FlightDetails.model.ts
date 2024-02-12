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
    public travellerClass: TravellerClass;
    public appliedSortFilter: SortFilterList;
    public adultCount:number;
    public infantCount:number;
    public childCount:number;
    public defaultSortFilter:any;
    
    constructor(src:CityDetails, des:CityDetails, departDate:string, partnerCountry:string, passenger:PassengerDetails, travellers: TravellerClass, appliedSortFilter: SortFilterList, childCount:number, adultCount:number, infantCount:number){
        this.src = src;
        this.des = des;
        this.departDate = departDate;
        this.partnerCountry = partnerCountry;
        this.passenger = passenger;
        this.travellerClass = travellers;
        this.appliedSortFilter = appliedSortFilter;
        this.adultCount = adultCount;
        this.childCount = childCount;
        this.infantCount = infantCount;
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
        return this.travellerClass = travellers;
    }
    public setAppliedSortFilter(appliedSortFilter:SortFilterList){
        return this.appliedSortFilter = appliedSortFilter;
    }
}