import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    LayersControl,
} from 'react-leaflet';
import L, { type LatLngTuple } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { useVisitorMapQuery } from '../hooks/useVisitorMapQuery';
import type { HeatPoint, VisitorLocation } from '../types';
import * as Heatmap from 'react-leaflet-heatmap-layer-v3';

const HeatmapLayerComponent =
    typeof Heatmap === 'object' && (Heatmap as any).default
        ? (Heatmap as any).default
        : Heatmap;

// Fix missing marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const { BaseLayer } = LayersControl;
const MotionPopup = motion.div;

export const VisitorMap = () => {
    const { data: visitors = [], isLoading } = useVisitorMapQuery();
    const [showHeatmap, setShowHeatmap] = useState(false);

    const centerVisitor: LatLngTuple = visitors.length > 0
        ? [visitors[0].latitude, visitors[0].longitude]
        : [20, 0];

    const heatmapPoints = visitors.map((v) => ({
        lat: v.latitude,
        lng: v.longitude,
        intensity: 1,
    }));

    return (
        <>
            {isLoading ? (
                <div className="d-flex justify-content-center py-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <>
                    <div className="d-flex justify-content-end mb-2">
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => setShowHeatmap(!showHeatmap)}
                        >
                            Toggle {showHeatmap ? 'Pins' : 'Heatmap'}
                        </button>
                    </div>

                    <MapContainer
                        center={centerVisitor}
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
                                    attribution="© CartoDB"
                                />
                            </BaseLayer>
                            <BaseLayer name="Satellite">
                                <TileLayer
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                    attribution="&copy; Esri"
                                />
                            </BaseLayer>
                        </LayersControl>

                        {showHeatmap && typeof HeatmapLayerComponent === 'function' ? (
                            <HeatmapLayerComponent
                                points={heatmapPoints}
                                longitudeExtractor={(m: HeatPoint) => m.lng}
                                latitudeExtractor={(m: HeatPoint) => m.lat}
                                intensityExtractor={(m: HeatPoint) => m.intensity}
                            />
                        ) : (
                            <MarkerClusterGroup>
                                {visitors.map((visitor: VisitorLocation, index: number) => (
                                    <Marker
                                        key={index}
                                        position={[visitor.latitude, visitor.longitude]}
                                    >
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
                        )}
                    </MapContainer>
                </>
            )}
        </>
    );
};


// import { Spinner } from 'react-bootstrap';
// import {
//     MapContainer,
//     TileLayer,
//     Marker,
//     Popup,
//     LayersControl,
// } from 'react-leaflet';
// import L from 'leaflet';
// import MarkerClusterGroup from 'react-leaflet-markercluster';
// import { motion } from 'framer-motion';
// import { formatDistanceToNow } from 'date-fns';
// import { useVisitorMapQuery } from '../hooks/useVisitorMapQuery';
// import type { VisitorLocation } from '../types';


// // Fix missing marker icons
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl:
//         'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
//     iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
//     shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
// });

// const { BaseLayer } = LayersControl;
// const MotionPopup = motion.div;
// const MotionCircle = motion.circle;

// export const VisitorMap = () => {
//     const { data: visitors = [], isLoading } = useVisitorMapQuery();

//     return (
//         <>
//             {isLoading
//                 ? (
//                     <div className="d-flex justify-content-center py-5">
//                         <Spinner animation="border" variant="primary" />
//                     </div>
//                 ) : (
//                     <MapContainer
//                         center={[20, 0]}
//                         zoom={2}
//                         scrollWheelZoom={true}
//                         style={{ height: '500px', width: '100%', borderRadius: '12px' }}
//                     >
//                         <LayersControl position="topright">
//                             <BaseLayer checked name="Light">
//                                 <TileLayer
//                                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                     attribution='© OpenStreetMap'
//                                 />
//                             </BaseLayer>
//                             <BaseLayer name="Dark">
//                                 <TileLayer
//                                     url="https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png"
//                                     attribution="&copy; Stadia Maps"
//                                 />
//                             </BaseLayer>
//                             <BaseLayer name="Satellite">
//                                 <TileLayer
//                                     url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//                                     attribution="&copy; Esri"
//                                 />
//                             </BaseLayer>
//                         </LayersControl>

//                         <MarkerClusterGroup>
//                             {visitors.map((visitor: VisitorLocation, index: number) => (
//                                 <Marker
//                                     key={index}
//                                     position={[visitor.latitude, visitor.longitude]}
//                                 >
//                                     {/* Pulsing animation under marker */}
//                                     <MotionCircle
//                                         cx={0}
//                                         cy={0}
//                                         r={12}
//                                         animate={{
//                                             scale: [0.8, 1.4],
//                                             opacity: [0.6, 0],
//                                         }}
//                                         transition={{
//                                             repeat: Infinity,
//                                             duration: 2,
//                                             ease: 'easeInOut',
//                                         }}
//                                         style={{
//                                             fill: 'rgba(0, 200, 83, 0.5)',
//                                             transformOrigin: 'center',
//                                         }}
//                                     />

//                                     {/* Animated Popup */}
//                                     <Popup>
//                                         <MotionPopup
//                                             initial={{ opacity: 0, y: 10 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ duration: 0.3 }}
//                                         >
//                                             {visitor.countryCode && (
//                                                 <img
//                                                     src={`https://flagcdn.com/24x18/${visitor.countryCode.toLowerCase()}.png`}
//                                                     alt={visitor.country}
//                                                     style={{
//                                                         marginRight: '6px',
//                                                         verticalAlign: 'middle',
//                                                         borderRadius: '4px',
//                                                     }}
//                                                 />
//                                             )}
//                                             <strong>
//                                                 {visitor.city ? `${visitor.city}, ` : ''}
//                                                 {visitor.region ? `${visitor.region}, ` : ''}
//                                                 {visitor.country}
//                                             </strong>
//                                             <br />
//                                             <small>
//                                                 Last seen:{' '}
//                                                 {visitor.lastSeen
//                                                     ? formatDistanceToNow(new Date(visitor.lastSeen), {
//                                                         addSuffix: true,
//                                                     })
//                                                     : 'Unknown'}
//                                             </small>
//                                         </MotionPopup>
//                                     </Popup>
//                                 </Marker>
//                             ))}
//                         </MarkerClusterGroup>
//                     </MapContainer>
//                 )}
//         </>
//     );
// };