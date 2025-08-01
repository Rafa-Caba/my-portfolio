export const countryNameToCode: Record<string, string> = {
    Afghanistan: 'AF',
    Albania: 'AL',
    Algeria: 'DZ',
    Argentina: 'AR',
    Australia: 'AU',
    Austria: 'AT',
    Bangladesh: 'BD',
    Belgium: 'BE',
    Bolivia: 'BO',
    Brazil: 'BR',
    Bulgaria: 'BG',
    Canada: 'CA',
    Chile: 'CL',
    China: 'CN',
    Colombia: 'CO',
    "Costa Rica": 'CR',
    Croatia: 'HR',
    Cuba: 'CU',
    Czechia: 'CZ',
    Denmark: 'DK',
    "Dominican Republic": 'DO',
    Ecuador: 'EC',
    Egypt: 'EG',
    "El Salvador": 'SV',
    Estonia: 'EE',
    Finland: 'FI',
    France: 'FR',
    Germany: 'DE',
    Greece: 'GR',
    Guatemala: 'GT',
    Honduras: 'HN',
    Hungary: 'HU',
    Iceland: 'IS',
    India: 'IN',
    Indonesia: 'ID',
    Iran: 'IR',
    Iraq: 'IQ',
    Ireland: 'IE',
    Israel: 'IL',
    Italy: 'IT',
    Jamaica: 'JM',
    Japan: 'JP',
    Jordan: 'JO',
    Kazakhstan: 'KZ',
    Kenya: 'KE',
    Latvia: 'LV',
    Lebanon: 'LB',
    Lithuania: 'LT',
    Luxembourg: 'LU',
    Malaysia: 'MY',
    Mexico: 'MX',
    Morocco: 'MA',
    Netherlands: 'NL',
    "New Zealand": 'NZ',
    Nicaragua: 'NI',
    Nigeria: 'NG',
    "North Korea": 'KP',
    Norway: 'NO',
    Pakistan: 'PK',
    Panama: 'PA',
    Paraguay: 'PY',
    Peru: 'PE',
    Philippines: 'PH',
    Poland: 'PL',
    Portugal: 'PT',
    Romania: 'RO',
    Russia: 'RU',
    "Saudi Arabia": 'SA',
    Serbia: 'RS',
    Singapore: 'SG',
    Slovakia: 'SK',
    Slovenia: 'SI',
    "South Africa": 'ZA',
    "South Korea": 'KR',
    Spain: 'ES',
    "Sri Lanka": 'LK',
    Sweden: 'SE',
    Switzerland: 'CH',
    Syria: 'SY',
    Taiwan: 'TW',
    Thailand: 'TH',
    Tunisia: 'TN',
    Turkey: 'TR',
    Ukraine: 'UA',
    "United Arab Emirates": 'AE',
    'United Kingdom': 'GB',
    'United States': 'US',
    Uruguay: 'UY',
    Venezuela: 'VE',
    Vietnam: 'VN',
    Yemen: 'YE',
    Zimbabwe: 'ZW'
};

export function getFlagEmoji(countryName: string): string {
    if (!countryName) return '🏳️';

    const normalized = countryName.trim().replace(/\b\w/g, l => l.toUpperCase());
    const code = countryNameToCode[normalized];

    if (!code) return '🏳️';
    return code
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

// Capitalización correcta (útil en el render)
export function capitalizeWords(str: string): string {
    return str
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
}