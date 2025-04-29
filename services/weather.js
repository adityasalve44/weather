const API_KEY = "d77c353f93344c919b3153323252804";
const BASE_URL = "http://api.weatherapi.com/v1";

export async function fetchWeather(location, days = 5) {
  if (!API_KEY) {
    throw new Error("Missing API_KEY");
  }

  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=${days}&aqi=no&alerts=no`;

  const response = await fetch(url);
  if (!response.ok) {
    console.log(`Error: ${response.status} ${response.statusText}`);
    throw new Error("Error: City not found");
  }

  const data = await response.json();
  return data;
}
