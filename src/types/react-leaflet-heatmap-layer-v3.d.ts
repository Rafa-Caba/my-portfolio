declare module 'react-leaflet-heatmap-layer-v3' {
    import { Component } from 'react';
    import { LayerProps } from 'react-leaflet';
    import { LatLngTuple } from 'leaflet';

    export interface HeatmapLayerProps extends LayerProps {
        points: {
            lat: number;
            lng: number;
            intensity: number;
        }[];
        longitudeExtractor: (point: any) => number;
        latitudeExtractor: (point: any) => number;
        intensityExtractor: (point: any) => number;

        fitBoundsOnLoad?: boolean;
        fitBoundsOnUpdate?: boolean;

        max?: number;
        radius?: number;
        blur?: number;
        minOpacity?: number;
    }

    export default class HeatmapLayer extends Component<HeatmapLayerProps> { }
}