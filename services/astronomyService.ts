
import { GEOLOCATION_API_KEY } from '../constants';
import { AstronomyData } from '../types';

export async function fetchAstronomyData(lat: number, lon: number, date: string, time?: string): Promise<AstronomyData> {
  let url = `https://api.ipgeolocation.io/astronomy?apiKey=${GEOLOCATION_API_KEY}&lat=${lat}&long=${lon}&date=${date}`;
  if (time) {
    url += `&time=${time}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Astronomy API Error:', response.status, errorText);
    throw new Error(`Failed to fetch astronomy data from API: ${response.status} ${errorText}`);
  }
  return response.json();
}
