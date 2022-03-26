import React, { useRef, useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl'
import { config } from '../../Constants'
import "./Map.css";

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(11);
    const [lat, setLat] = useState(48);
    const [zoom, setZoom] = useState(3);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: config.MAPBOX_STYLE_URL,
        center: [lng, lat],
        zoom: zoom
        });
    });

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default Map;