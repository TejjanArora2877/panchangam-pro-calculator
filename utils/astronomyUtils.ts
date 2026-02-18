
export function correctRefraction(altDeg: number): number {
  if (altDeg <= 0) return altDeg;
  const R = 1.02 / Math.tan((altDeg + 10.3 / (altDeg + 5.11)) * Math.PI / 180);
  return altDeg + R / 60;
}

export function getLahiriAyanamsa(JD: number): number {
  // Epoch J2000.0
  const J2000 = 2451545.0;
  const T = (JD - J2000) / 36525.0;

  // Mean Lahiri Ayanamsa formula
  // Base at J2000 is approx 23.8585 degrees (23° 51' 30")
  // Rate is approx 0.01396 degrees per year (50.27 arcsec/year)
  const ayanamsa = 23.8585 + 1.396 * T;
  return ayanamsa;
}

export function computeEclipticLongitudeFromAltAz(
  azimuthDeg: number,
  altitudeDeg: number,
  latitudeDeg: number,
  longitudeDeg: number,
  timestampUTC: string
): number {
  const DEG2RAD = Math.PI / 180;
  const RAD2DEG = 180 / Math.PI;

  const az = azimuthDeg * DEG2RAD;
  const alt = correctRefraction(altitudeDeg) * DEG2RAD;
  const lat = latitudeDeg * DEG2RAD;

  // Convert Horizontal (Alt/Az) to Equatorial (Dec/RA)
  const sinDec = Math.sin(alt) * Math.sin(lat) + Math.cos(alt) * Math.cos(lat) * Math.cos(az);
  const dec = Math.asin(sinDec);

  const cosHA = (Math.sin(alt) - Math.sin(lat) * sinDec) / (Math.cos(lat) * Math.cos(dec));
  let HA = Math.acos(Math.min(Math.max(cosHA, -1), 1));
  if (Math.sin(az) > 0) HA = 2 * Math.PI - HA;

  // Calculate Julian Date
  const date = new Date(timestampUTC);
  const JD = date.getTime() / 86400000 + 2440587.5;
  const T = (JD - 2451545.0) / 36525.0;

  // Calculate GMST
  let GMST = 280.46061837 + 360.98564736629 * (JD - 2451545.0)
           + 0.000387933 * T * T - (T * T * T) / 38710000;
  GMST = (GMST % 360 + 360) % 360;

  // LST and RA
  const LST = (GMST + longitudeDeg) % 360;
  const LSTrad = LST * DEG2RAD;
  const RA = (LSTrad - HA + 2 * Math.PI) % (2 * Math.PI);

  // Obliquity of Ecliptic
  const epsilonDeg = 23.43929111 - 0.0130042 * T;
  const epsilon = epsilonDeg * DEG2RAD;

  // Equatorial to Tropical Ecliptic
  const sinEclLon = Math.sin(RA) * Math.cos(epsilon) + Math.tan(dec) * Math.sin(epsilon);
  const cosEclLon = Math.cos(RA);
  let eclLon = Math.atan2(sinEclLon, cosEclLon);
  if (eclLon < 0) eclLon += 2 * Math.PI;

  const tropicalLongitude = eclLon * RAD2DEG;

  // Convert to Sidereal (Nirayana) for Vedic Calculations
  const ayanamsa = getLahiriAyanamsa(JD);
  let siderealLongitude = tropicalLongitude - ayanamsa;
  
  // Normalize to 0-360
  siderealLongitude = (siderealLongitude % 360 + 360) % 360;

  return siderealLongitude;
}
