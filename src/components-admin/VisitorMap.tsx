import { Spinner } from 'react-bootstrap';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    LayersControl,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { formatDistanceToNow } from 'date-fns';
import { useVisitorMapQuery } from '../hooks/useVisitorMapQuery';
import { useAutoCenter } from '../hooks/useAutoCenter';
import { useEffect, useRef } from 'react';
import { showSuccessToast } from '../utils/showToast';
import type { VisitorLocation } from '../types';
import {
    fixDefaultMarkerIcons,
    getFlagIcon,
    BaseLayer,
    MotionPopup,
    MotionCircle,
} from '../utils/mapUtils';

// 🛠️ Apply marker icon fix once on mount
fixDefaultMarkerIcons();

export const VisitorMap = () => {
    const { data: visitors = [], isLoading } = useVisitorMapQuery();
    const center = useAutoCenter();
    const prevCountRef = useRef(0);

    useEffect(() => {
        if (visitors.length > prevCountRef.current) {
            showSuccessToast('🎉 New visitor joined!');
        }
        prevCountRef.current = visitors.length;
    }, [visitors.length]);

    return (
        <>
            {isLoading || !center
                ? (
                    <div className="d-flex justify-content-center py-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <>
                        <MapContainer
                            center={center}
                            zoom={2}
                            scrollWheelZoom={true}
                            style={{ height: '550px', width: '100%', borderRadius: '12px' }}
                        >
                            <LayersControl position="topright">
                                <BaseLayer checked name="Light">
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution="© OpenStreetMap"
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
                                        icon={getFlagIcon(visitor.countryCode)}
                                    >
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
                                                    {formatDistanceToNow(new Date(visitor.lastSeen ?? Date.now()), { addSuffix: true })}
                                                </small>
                                            </MotionPopup>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MarkerClusterGroup>
                        </MapContainer>

                        <div className="mt-4 px-2">
                            <h6>🕒 Last 5 Visitors</h6>
                            <ul className="list-unstyled mb-0">
                                {visitors.slice(0, 5).map((v, i) => (
                                    <li key={i}>
                                        {v.countryCode && (
                                            <img
                                                src={`https://flagcdn.com/16x12/${v.countryCode.toLowerCase()}.png`}
                                                alt={v.country}
                                                style={{ marginRight: 6 }}
                                            />
                                        )}
                                        <strong>{v.city || 'Unknown'}, {v.country}</strong> –{' '}
                                        <small>{formatDistanceToNow(new Date(v.lastSeen ?? ''), { addSuffix: true })}</small>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )
            }
        </>
    );
};
