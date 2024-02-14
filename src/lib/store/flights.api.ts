import type { CityDetails } from '$lib/models/CityDetails.model';
import { flightDetails } from './FlightDetails.store';

async function getData(url: string, body: object) {
	let data: any = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: import.meta.env.VITE_AUTH_TOKEN
		},
		body: JSON.stringify(body)
	});
	data = await data?.json();
	// console.log(data);
	return data;
}

export async function getConfigData() {
	const data: any = await getData(import.meta.env.VITE_CONFIG_API, {});
	return data.searchRequest;
}

export async function getWalletData() {
	const data = await getData(import.meta.env.VITE_WALLET_API, {});
	return data;
}

export async function getUpcomingFlightData() {
	const data = await getData(import.meta.env.VITE_UPCOMING_BOOKINGS_API, {
		requestType: 'UPCOMING',
		paginationRequest: {
			pageNumberToGet: 0,
			resultsPerPage: 5
		}
	});
	return data;
}

export async function getPopularCitiesData() {
	const data = await getData(import.meta.env.VITE_GET_POPULAR_CITIES_API, {});
	return data;
}

export async function getSearchCityData(city: string) {
	const data = await getData(import.meta.env.VITE_SEARCH_CITY_API, {
		searchText: city
	});
	console.log(data);
	return data;
}

export async function searchFlight(request: object) {
	const data = await getData(import.meta.env.VITE_SEARCH_FLIGHTS_API, request);
	return data;
}
