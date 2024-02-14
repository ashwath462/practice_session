import { MAX_TOTAL_GUEST, MIN_TOTAL_GUEST } from './constants';

export const getDate = () => {
	const currentDate = new Date();
	const day = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
	const date = currentDate.getDate();
	const month = currentDate.toLocaleDateString('en-US', { month: 'short' });
	return { day, date, month };
};

export const validateTravellers = (
	guest: number,
	min: number,
	max: number,
	totalGuest: number,
	increase: boolean = true
) => {
	if (increase) {
		return guest < max && totalGuest + 1 <= MAX_TOTAL_GUEST;
	} else {
		return guest > min && totalGuest - 1 >= MIN_TOTAL_GUEST;
	}
};
