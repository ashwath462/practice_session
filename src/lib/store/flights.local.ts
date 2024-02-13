import type { CityDetails } from "$lib/models/CityDetails.model"
import type { FlightDetailsModel } from "$lib/models/FlightDetails.model";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const getCachedCities = ()=>{
    const data = localStorage.getItem('searchedCities');
    if(data!=null){
        let cachedData:CityDetails[] = JSON.parse(data);
        return cachedData;
    }
    return [];
}

export const cacheCity = (data:CityDetails)=>{
    let existingData:CityDetails[] = getCachedCities();
    existingData = existingData.filter((item)=>{return item.city != data.city});
    existingData = [data,...existingData];
    existingData = existingData.slice(0,5);
    localStorage.setItem('searchedCities', JSON.stringify(existingData));
}

export const getCachedSearchFlight = ()=>{
    const data = localStorage.getItem('searchedFlights');
    if(data != null){
        let cachedData:[] = JSON.parse(data);
        return cachedData;
    }
    return [];
}

export const cacheSearchFlight = (body:any)=>{
    const title = `${body.src.city} → ${body.des.city}`;
    console.log(body.departDate);
    const subtitle = `${dayjs(body.departDate, 'DD-MM-YYYY').format('ddd,D MMM')}`
    const thirdTitle = `${body.passenger.adultCount + body.passenger.childCount + body.passenger.infantCount} Traveller | ${body.travellerClass.value.split(' ')[0]}`
    const data:any = {
        title:title,
        subtitle:subtitle,
        thirdTitle:thirdTitle,
        body:body
    }
    let existingData:any = getCachedSearchFlight();
    existingData = existingData.filter((item:any)=>{return ((item.title != data.title) || (item.subtitle != data.subtitle) || (item.thirdTitle != data.thirdTitle))});
    existingData = [data, ...existingData];
    existingData = existingData.slice(0,5);
    localStorage.setItem('searchedFlights', JSON.stringify(existingData));
}
