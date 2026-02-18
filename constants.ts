
import { Language } from './types';

export const TITHI_NAMES: Record<Language, string[]> = {
  en: [
    'Pratipada', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi',
    'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi',
    'Trayodashi', 'Chaturdashi', 'Purnima', 'Pratipada', 'Dvitiya', 'Tritiya',
    'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami',
    'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'
  ],
  hi: [
    'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी',
    'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी',
    'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा', 'प्रतिपदा', 'द्वितीया', 'तृतीया',
    'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी',
    'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'अमावस्या'
  ],
  mr: [
    'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी',
    'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी',
    'त्रयोदशी', 'चतुर्दशी', 'पौर्णिमा', 'प्रतिपदा', 'द्वितीया', 'तृतीया',
    'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी',
    'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'अमावस्या'
  ]
};

export const NAKSHATRA_NAMES: Record<Language, string[]> = {
  en: [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra', 'Punarvasu',
    'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta',
    'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
    'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
    'Uttara Bhadrapada', 'Revati'
  ],
  hi: [
    'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशीर्ष', 'आर्द्रा', 'पुनर्वसु',
    'पुष्य', 'आश्लेषा', 'मघा', 'पूर्वा फाल्गुनी', 'उत्तरा फाल्गुनी', 'हस्त',
    'चित्रा', 'स्वाती', 'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूल', 'पूर्वाषाढ़ा',
    'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्वा भाद्रपद',
    'उत्तरा भाद्रपद', 'रेवती'
  ],
  mr: [
    'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशीर्ष', 'आर्द्रा', 'पुनर्वसु',
    'पुष्य', 'आश्लेषा', 'मघा', 'पूर्वा फाल्गुनी', 'उत्तरा फाल्गुनी', 'हस्त',
    'चित्रा', 'स्वाती', 'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूळ', 'पूर्वाषाढा',
    'उत्तराषाढा', 'श्रवण', 'धनिष्ठा', 'शततारका', 'पूर्वा भाद्रपदा',
    'उत्तरा भाद्रपदा', 'रेवती'
  ]
};

export const NAKSHATRA_DEITIES = [
  'Ashwini Kumars', 'Yama', 'Agni', 'Brahma', 'Soma', 'Rudra', 'Aditi',
  'Brihaspati', 'Naga', 'Pitris', 'Bhaga', 'Aryaman', 'Savitar',
  'Tvashtar', 'Vayu', 'Indra & Agni', 'Mitra', 'Indra', 'Nirriti', 'Apah',
  'Vishvadevas', 'Vishnu', 'Dharma', 'Varuna', 'Aja Ekapada',
  'Ahirbudhnya', 'Pushan'
];

export const NAKSHATRA_RULERS = [
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter',
  'Saturn', 'Mercury', 'Ketu', 'Venus', 'Sun', 'Moon',
  'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury', 'Ketu', 'Venus',
  'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter',
  'Saturn', 'Mercury'
];

export const YOGA_NAMES: Record<Language, string[]> = {
  en: [
    'Vishkumbha', 'Preeti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma',
    'Dhriti', 'Shoola', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
    'Siddhi', 'Vyatipata', 'Variyana', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha',
    'Shukla', 'Brahma', 'Indra', 'Vaidhriti'
  ],
  hi: [
    'विष्कुम्भ', 'प्रीति', 'आयुष्मान', 'सौभाग्य', 'शोभन', 'अतिगण्ड', 'सुकर्मा',
    'धृति', 'शूल', 'गण्ड', 'वृद्धि', 'ध्रुव', 'व्याघात', 'हर्षण', 'वज्र',
    'सिद्धि', 'व्यतीपात', 'वरीयान', 'परिघ', 'शिव', 'सिद्ध', 'साध्य', 'शुभ',
    'शुक्ल', 'ब्रह्म', 'ऐन्द्र', 'वैधृति'
  ],
  mr: [
    'विष्कुम्भ', 'प्रीति', 'आयुष्मान', 'सौभाग्य', 'शोभन', 'अतिगण्ड', 'सुकर्मा',
    'धृति', 'शूल', 'गण्ड', 'वृद्धि', 'ध्रुव', 'व्याघात', 'हर्षण', 'वज्र',
    'सिद्धि', 'व्यतीपात', 'वरीयान', 'परिघ', 'शिव', 'सिद्ध', 'साध्य', 'शुभ',
    'शुक्ल', 'ब्रह्म', 'ऐन्द्र', 'वैधृति'
  ]
};

export const YOGA_DETAILS = [
  'Vishkumbha – Restriction, Karma-cleansing', 'Preeti – Affection, Harmony', 'Ayushman – Long life',
  'Saubhagya – Auspiciousness', 'Shobhana – Beauty, Splendor', 'Atiganda – Danger, Obstacles',
  'Sukarma – Good deeds, success', 'Dhriti – Patience, Fortitude', 'Shoola – Sharpness, Pain',
  'Ganda – Conflict, Tension', 'Vriddhi – Growth, Success', 'Dhruva – Stability', 'Vyaghata – Obstruction',
  'Harshana – Joy, Delight', 'Vajra – Strength, Harshness', 'Siddhi – Accomplishment', 'Vyatipata – Calamity, Sudden change',
  'Variyana – Comfort, Travel', 'Parigha – Hurdles, Barriers', 'Shiva – Peace, Auspiciousness',
  'Siddha – Fulfillment', 'Sadhya – Attainability', 'Shubha – Auspicious', 'Shukla – Brightness, Purity',
  'Brahma – Creative energy', 'Indra – Power, Rulership', 'Vaidhriti – Serverance, Completion'
];

export const KARANA_MOVABLE: Record<Language, string[]> = {
  en: ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti'],
  hi: ['बव', 'बालव', 'कौलव', 'तैतिल', 'गर', 'वणिज', 'विष्टि (भद्र)'],
  mr: ['बव', 'बालव', 'कौलव', 'तैतिल', 'गर', 'वणिज', 'विष्टि (भद्र)']
};

export const KARANA_FIXED: Record<Language, string[]> = {
  en: ['Shakuni', 'Chatushpada', 'Naga', 'Kimstughna'],
  hi: ['शकुनि', 'चतुष्पद', 'नाग', 'किंस्तुघ्न'],
  mr: ['शकुनि', 'चतुष्पद', 'नाग', 'किंस्तुघ्न']
};

export const VARA_NAMES: Record<Language, string[]> = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
  mr: ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार']
};

export const VARA_RULERS = ['Sun (Surya)', 'Moon (Chandra)', 'Mars (Mangala)', 'Mercury (Budha)', 'Jupiter (Guru)', 'Venus (Shukra)', 'Saturn (Shani)'];

export const RASHI_NAMES: Record<Language, string[]> = {
  en: [
    'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)',
    'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchika (Scorpio)',
    'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
  ],
  hi: [
    'मेष', 'वृषभ', 'मिथुन', 'कर्क',
    'सिंह', 'कन्या', 'तुला', 'वृश्चिक',
    'धनु', 'मकर', 'कुम्भ', 'मीन'
  ],
  mr: [
    'मेष', 'वृषभ', 'मिथुन', 'कर्क',
    'सिंह', 'कन्या', 'तूळ', 'वृश्चिक',
    'धनु', 'मकर', 'कुंभ', 'मीन'
  ]
};

export const RASHI_DETAILS = [
  { lord: 'Mars', element: 'Fire', modality: 'Chara (Movable)' },
  { lord: 'Venus', element: 'Earth', modality: 'Sthira (Fixed)' },
  { lord: 'Mercury', element: 'Air', modality: 'Dvisvabhava (Dual)' },
  { lord: 'Moon', element: 'Water', modality: 'Chara (Movable)' },
  { lord: 'Sun', element: 'Fire', modality: 'Sthira (Fixed)' },
  { lord: 'Mercury', element: 'Earth', modality: 'Dvisvabhava (Dual)' },
  { lord: 'Venus', element: 'Air', modality: 'Chara (Movable)' },
  { lord: 'Mars', element: 'Water', modality: 'Sthira (Fixed)' },
  { lord: 'Jupiter', element: 'Fire', modality: 'Dvisvabhava (Dual)' },
  { lord: 'Saturn', element: 'Earth', modality: 'Chara (Movable)' },
  { lord: 'Saturn', element: 'Air', modality: 'Sthira (Fixed)' },
  { lord: 'Jupiter', element: 'Water', modality: 'Dvisvabhava (Dual)' }
];

export const GEOLOCATION_API_KEY =
  import.meta.env.VITE_IPGEOLOCATION_API_KEY;

if (!GEOLOCATION_API_KEY) {
  throw new Error("Missing VITE_IPGEOLOCATION_API_KEY env variable");
}

export const DEFAULT_LAT = 20.5937;
export const DEFAULT_LON = 78.9629;

// Daily motion in degrees (approximate)
export const MOON_DAILY_MOTION = 13.176;
export const SUN_DAILY_MOTION = 0.9856;
