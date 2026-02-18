
export type Language = 'en' | 'hi' | 'mr';

export interface AstronomyData {
  moon_azimuth: string;
  moon_altitude: string;
  sun_azimuth: string;
  sun_altitude: string;
  moonrise: string;
  moonset: string;
  sunrise: string;
  sunset: string;
}

export interface RashiInfo {
  name: string;
  lord: string;
  element: string;
  modality: string;
}

export interface PanchangResult {
  tithi: string;
  tithiIndex: number;
  tithiEndTime: string;
  paksha: string;
  moonPhase: string;
  nakshatra: string;
  pada: number;
  nakshatraEndTime: string;
  deity: string;
  ruler: string;
  yoga: string;
  yogaIndex: number;
  yogaEffect: string;
  karana: string;
  vara: string;
  varaRuler: string;
  moonRashi: RashiInfo;
  sunRashi: RashiInfo;
  nextHighTide: string;
  nextLowTide: string;
  tideIntensity: string;
  rahukaal: string;
  yamaganda: string;
}

export interface UserLocation {
  lat: number;
  lon: number;
  city: string;
  status: string;
}
