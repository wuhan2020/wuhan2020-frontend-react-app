export const ROOT = "";

export const URLS = {
	HOME: ROOT + "/",

	CLINICS: ROOT + "/hospitals",
	CLINIC: ROOT + "/hospital/:cityName/:clinicId",

	DONATE: ROOT + "/donate",

	FREE_CONSULTATION: ROOT + "/free_consultation",

	HOTELS: ROOT + "/hotels",

	LOGISTICS: ROOT + "/logistics",

	NEWS_FEED: ROOT + "/news_feed",

	OPEN_SOURCE_PROJ: "https://github.com/wuhan2020/wuhan2020",

	TRAVEL_HOTEL: ROOT + "/travel_hotel",

	PREVENTION_AND_TREATMENT: ROOT + "/treatment",
	PRODUCTION: ROOT + "/production",

}

export const getClinicUrl = (cityName: string, id: number) => {
	return `${ROOT}/hospital/${cityName}/${id}`;
}