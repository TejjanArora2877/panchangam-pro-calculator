
import { 
  TITHI_NAMES, 
  NAKSHATRA_NAMES, 
  NAKSHATRA_DEITIES, 
  NAKSHATRA_RULERS, 
  YOGA_NAMES, 
  YOGA_DETAILS, 
  KARANA_MOVABLE,
  KARANA_FIXED,
  VARA_NAMES, 
  VARA_RULERS,
  RASHI_NAMES,
  RASHI_DETAILS,
  MOON_DAILY_MOTION,
  SUN_DAILY_MOTION
} from '../constants';
import { PanchangResult, AstronomyData, RashiInfo, Language } from '../types';

function parseTime(timeStr: string): number | null {
  if (!timeStr || timeStr === '-' || timeStr.includes('—')) return null;
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function formatMinutes(totalMinutes: number): string {
  let mins = Math.floor(totalMinutes);
  // Normalize to 0-1440 range (24 hours)
  mins = (mins % 1440 + 1440) % 1440;
  
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const modifier = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 || 12;
  return `${displayH}:${m.toString().padStart(2, '0')} ${modifier}`;
}

function calculateEndTime(
  currentDegrees: number, 
  spanDegrees: number, 
  dailyMotionDegrees: number, 
  currentTimeStr: string
): string {
  const degreesPassed = currentDegrees % spanDegrees;
  const degreesRemaining = spanDegrees - degreesPassed;
  const hoursRemaining = degreesRemaining / (dailyMotionDegrees / 24);
  const minutesRemaining = hoursRemaining * 60;

  const [currentH, currentM] = currentTimeStr.split(':').map(Number);
  const currentTotalMinutes = currentH * 60 + currentM;
  
  return formatMinutes(currentTotalMinutes + minutesRemaining);
}

function getRashiInfo(long: number, language: Language): RashiInfo {
  const index = Math.floor(long / 30) % 12;
  return {
    name: RASHI_NAMES[language][index],
    ...RASHI_DETAILS[index]
  };
}

// Rahu Kaal start offsets (0=Sun, 6=Sat) - 8th part system
const RAHU_OFFSETS = [7, 1, 6, 4, 5, 3, 2];
// Yamaganda start offsets (0=Sun, 6=Sat)
const YAMAGANDA_OFFSETS = [4, 3, 2, 1, 0, 6, 5];

function calculateDaySegment(
  weekday: number, 
  sunriseMin: number, 
  sunsetMin: number, 
  offsets: number[]
): string {
  const dayDuration = sunsetMin - sunriseMin;
  const segmentDuration = dayDuration / 8;
  const startSegment = offsets[weekday];
  
  const startMin = sunriseMin + (startSegment * segmentDuration);
  const endMin = startMin + segmentDuration;
  
  return `${formatMinutes(startMin)} - ${formatMinutes(endMin)}`;
}

export function calculatePanchang(
  moonLong: number, 
  sunLong: number, 
  dateStr: string,
  timeStr: string,
  astronomy?: AstronomyData | null,
  language: Language = 'en'
): PanchangResult {
  // Tithi Calculation
  let diff = moonLong - sunLong;
  if (diff < 0) diff += 360;
  const tithiIndex = Math.floor(diff / 12);
  const tithiName = TITHI_NAMES[language][tithiIndex] || 'Unknown';
  
  const pakshaLabels = {
    en: ['Shukla Paksha (Waxing)', 'Krishna Paksha (Waning)'],
    hi: ['शुक्ल पक्ष', 'कृष्ण पक्ष'],
    mr: ['शुक्ल पक्ष', 'कृष्ण पक्ष']
  };
  const paksha = tithiIndex < 15 ? pakshaLabels[language][0] : pakshaLabels[language][1];
  
  // Calculate Tithi End Time
  const relativeMotion = MOON_DAILY_MOTION - SUN_DAILY_MOTION;
  const tithiEndTime = calculateEndTime(diff, 12, relativeMotion, timeStr);

  // Karana Calculation
  let karana = "";
  const karanaIndex = Math.floor(diff / 6); // 0 to 59
  
  if (karanaIndex === 0) karana = KARANA_FIXED[language][3]; // Kimstughna
  else if (karanaIndex >= 57) karana = KARANA_FIXED[language][karanaIndex - 57]; 
  else {
    const movableIndex = (karanaIndex - 1) % 7;
    karana = KARANA_MOVABLE[language][movableIndex];
  }

  // Moon Phase
  const phaseAngle = (diff % 360);
  let phaseName = "";
  let phaseEmoji = "";
  
  const phases = {
    en: ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"],
    hi: ["अमावस्या", "शुक्ल बालचंद्र", "शुक्ल अष्टमी", "शुक्ल त्रयोदशी", "पूर्णिमा", "कृष्ण त्रयोदशी", "कृष्ण अष्टमी", "कृष्ण बालचंद्र"],
    mr: ["अमावस्या", "शुक्ल बालचंद्र", "शुक्ल अष्टमी", "शुक्ल त्रयोदशी", "पौर्णिमा", "कृष्ण त्रयोदशी", "कृष्ण अष्टमी", "कृष्ण बालचंद्र"]
  };
  
  const p = phases[language];

  if (phaseAngle < 22.5 || phaseAngle >= 337.5) { phaseName = p[0]; phaseEmoji = "🌑"; }
  else if (phaseAngle < 67.5) { phaseName = p[1]; phaseEmoji = "🌒"; }
  else if (phaseAngle < 112.5) { phaseName = p[2]; phaseEmoji = "🌓"; }
  else if (phaseAngle < 157.5) { phaseName = p[3]; phaseEmoji = "🌔"; }
  else if (phaseAngle < 202.5) { phaseName = p[4]; phaseEmoji = "🌕"; }
  else if (phaseAngle < 247.5) { phaseName = p[5]; phaseEmoji = "🌖"; }
  else if (phaseAngle < 292.5) { phaseName = p[6]; phaseEmoji = "🌗"; }
  else { phaseName = p[7]; phaseEmoji = "🌘"; }

  // Nakshatra Calculation
  const nakshatraSize = 13.33333; // 360 / 27
  const nakIndex = Math.floor(moonLong / nakshatraSize);
  const nakshatra = NAKSHATRA_NAMES[language][nakIndex] || 'Unknown';
  const positionInNakshatra = moonLong % nakshatraSize;
  const pada = Math.floor(positionInNakshatra / (nakshatraSize / 4)) + 1;
  const deity = NAKSHATRA_DEITIES[nakIndex] || '—';
  const ruler = NAKSHATRA_RULERS[nakIndex] || '—';
  const nakshatraEndTime = calculateEndTime(moonLong, nakshatraSize, MOON_DAILY_MOTION, timeStr);

  // Rashi Calculation
  const moonRashi = getRashiInfo(moonLong, language);
  const sunRashi = getRashiInfo(sunLong, language);

  // Yoga Calculation
  const totalDegrees = (moonLong + sunLong) % 360;
  const yogaIndex = Math.floor(totalDegrees / (360 / 27));
  const yoga = YOGA_NAMES[language][yogaIndex] || 'Unknown';
  const yogaEffect = YOGA_DETAILS[yogaIndex] || '—';

  // Vara Calculation
  const selectedDate = new Date(dateStr);
  const dayIndex = selectedDate.getDay();
  const vara = VARA_NAMES[language][dayIndex];
  const varaRuler = VARA_RULERS[dayIndex];

  // Timing & Tides
  let nextHighTide = "Data Unavailable";
  let nextLowTide = "Data Unavailable";
  let tideIntensity = "Moderate";
  let rahukaal = "Requires Sunrise/Set data";
  let yamaganda = "Requires Sunrise/Set data";

  if (astronomy) {
    const rise = parseTime(astronomy.moonrise);
    const set = parseTime(astronomy.moonset);
    const sunriseMin = parseTime(astronomy.sunrise);
    const sunsetMin = parseTime(astronomy.sunset);

    // Rahu Kaal & Yamaganda
    if (sunriseMin !== null && sunsetMin !== null) {
      rahukaal = calculateDaySegment(dayIndex, sunriseMin, sunsetMin, RAHU_OFFSETS);
      yamaganda = calculateDaySegment(dayIndex, sunriseMin, sunsetMin, YAMAGANDA_OFFSETS);
    }

    // Advanced Tide Estimation
    if (rise !== null && set !== null) {
      // Transit time is approximate midpoint
      // Handle day wrap cases for transit calc (if set < rise, set is next day)
      let effectiveSet = set;
      if (set < rise) effectiveSet += 1440; // Add 24h
      
      let transit = (rise + effectiveSet) / 2;
      
      // Normalize to 24h
      transit = transit % 1440;

      nextHighTide = formatMinutes(transit);
      nextLowTide = formatMinutes(transit + 372.5); // + ~6h 12.5m (average tidal lag)
      
      const distFromNew = Math.min(Math.abs(phaseAngle - 0), Math.abs(360 - phaseAngle));
      const distFromFull = Math.abs(phaseAngle - 180);
      const distFromSyzygy = Math.min(distFromNew, distFromFull);

      if (distFromSyzygy < 15) {
        tideIntensity = "Spring Tide (Strong)";
      } else if (Math.abs(distFromSyzygy - 90) < 15) {
        tideIntensity = "Neap Tide (Weak)";
      } else {
        tideIntensity = "Moderate Tide";
      }
    }
  }

  return {
    tithi: tithiName,
    tithiIndex: tithiIndex + 1,
    tithiEndTime,
    paksha,
    moonPhase: `${phaseName} ${phaseEmoji}`,
    nakshatra,
    pada,
    nakshatraEndTime,
    deity,
    ruler,
    yoga,
    yogaIndex: yogaIndex + 1,
    yogaEffect,
    karana,
    vara,
    varaRuler,
    moonRashi,
    sunRashi,
    nextHighTide,
    nextLowTide,
    tideIntensity,
    rahukaal,
    yamaganda
  };
}
