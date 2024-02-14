import type { CityDetails } from "./CityDetails.model";
import type { PassengerDetails } from "./PassengerDetails.model";
import type { TravellerClass } from "./TravellerClass.model";
import type { SortFilterList } from "./SortFilterList.model";

export interface FlightDetailsModel {
    src: CityDetails;
    des: CityDetails;
    departDate: string;
    partnerCountry: string;
    passenger: PassengerDetails;
    travellerClass: TravellerClass;
    appliedSortFilter: SortFilterList;
    adultCount: number;
    infantCount: number;
    childCount: number;
    defaultSortFilter: any;
}