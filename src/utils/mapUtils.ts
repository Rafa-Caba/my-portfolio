import L from 'leaflet';
import { motion } from 'framer-motion';
import { LayersControl } from 'react-leaflet';

// Fix for missing default marker icons
export const fixDefaultMarkerIcons = () => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl:
            'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
    });
};

// Get custom icon with country flag or fallback to default icon
export const getFlagIcon = (code?: string) =>
    code
        ? L.icon({
            iconUrl: `https://flagcdn.com/w40/${code.toLowerCase()}.png`,
            iconSize: [28, 21],
            iconAnchor: [14, 21],
            popupAnchor: [0, -21],
            shadowUrl:
                'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
            shadowSize: [41, 41],
            shadowAnchor: [12, 41],
        })
        : new L.Icon.Default();

// Export commonly reused Leaflet + Framer values
export const { BaseLayer } = LayersControl;
export const MotionPopup = motion.div;
export const MotionCircle = motion.circle;
