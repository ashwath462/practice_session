import type { CityDetails } from "./CityDetails.model";

interface AirlineInfo {
    airlineName: string;
    airlineIconUrl: string;
}

interface FareDetails {
    fareId: string;
    partnerId: number;
    partnerName: string;
    fare: number;
    currencySymbol: string;
    fareS: string;
}

interface SpecialFeature {
    title: string;
    icon: string;
}

export interface FlightSearchResult {
    segmentId: string;
    onwardSegmentDetails: {
        arrivalTime: string;
        departTime: string;
        arrivalTimestamp: string;
        departTimestamp: string;
        duration: string;
        stops: string;
        airlineCode: string;
        sourceAirportCode: CityDetails;
        destinationAirportCode: CityDetails;
        airlineTime: string;
        airlineDuration: string;
        segmentAirlineInfos: AirlineInfo[];
    };
    refundable: boolean;
    hasFreeMeal: boolean;
    handBaggageOnlyFare: boolean;
    fareList: FareDetails[];
    specialFeatures: SpecialFeature[];
}