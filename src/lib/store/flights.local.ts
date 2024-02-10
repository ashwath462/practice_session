import type { CityDetails } from "$lib/models/CityDetails.model"

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