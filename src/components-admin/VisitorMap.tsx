import { Spinner } from 'react-bootstrap';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    LayersControl,
} from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { useVisitorMapQuery } from '../hooks/useVisitorMapQuery';
import type { VisitorLocation } from '../types';


// Fix missing marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const { BaseLayer } = LayersControl;
const MotionPopup = motion.div;
const MotionCircle = motion.circle;

export const VisitorMap = () => {
    const { data: visitors = [], isLoading } = useVisitorMapQuery();

    return (
        <>
            {isLoading
                ? (
                    <div className="d-flex justify-content-center py-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <MapContainer
                        center={[20, 0]}
                        zoom={2}
                        scrollWheelZoom={true}
                        style={{ height: '500px', width: '100%', borderRadius: '12px' }}
                    >
                        <LayersControl position="topright">
                            <BaseLayer checked name="Light">
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='© OpenStreetMap'
                                />
                            </BaseLayer>
                            <BaseLayer name="Dark">
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                    attribution="&copy; OpenStreetMap &copy; CARTO"
                                    detectRetina={false}
                                />
                            </BaseLayer>
                            <BaseLayer name="Satellite">
                                <TileLayer
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                    attribution="&copy; Esri"
                                />
                            </BaseLayer>
                        </LayersControl>

                        <MarkerClusterGroup>
                            {visitors.map((visitor: VisitorLocation, index: number) => (
                                <Marker
                                    key={index}
                                    position={[visitor.latitude, visitor.longitude]}
                                >
                                    {/* Pulsing animation under marker */}
                                    <MotionCircle
                                        cx={0}
                                        cy={0}
                                        r={12}
                                        animate={{
                                            scale: [0.8, 1.4],
                                            opacity: [0.6, 0],
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                            ease: 'easeInOut',
                                        }}
                                        style={{
                                            fill: 'rgba(0, 200, 83, 0.5)',
                                            transformOrigin: 'center',
                                        }}
                                    />

                                    {/* Animated Popup */}
                                    <Popup>
                                        <MotionPopup
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {visitor.countryCode && (
                                                <img
                                                    src={`https://flagcdn.com/24x18/${visitor.countryCode.toLowerCase()}.png`}
                                                    alt={visitor.country}
                                                    style={{
                                                        marginRight: '6px',
                                                        verticalAlign: 'middle',
                                                        borderRadius: '4px',
                                                    }}
                                                />
                                            )}
                                            <strong>
                                                {visitor.city ? `${visitor.city}, ` : ''}
                                                {visitor.region ? `${visitor.region}, ` : ''}
                                                {visitor.country}
                                            </strong>
                                            <br />
                                            <small>
                                                Last seen:{' '}
                                                {visitor.lastSeen
                                                    ? formatDistanceToNow(new Date(visitor.lastSeen), {
                                                        addSuffix: true,
                                                    })
                                                    : 'Unknown'}
                                            </small>
                                        </MotionPopup>
                                    </Popup>
                                </Marker>
                            ))}
                        </MarkerClusterGroup>
                    </MapContainer>
                )}
        </>
    );
};