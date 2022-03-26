import React, { useRef, useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl'
import { config } from '../../Constants'
import "./Map.css";
import Sidebar from '../sidebar/Sidebar'
import axios from "axios";



mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;

function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(11);
    const [lat, setLat] = useState(48);
    const [zoom, setZoom] = useState(3);
    const [capitals, setCapitals] = useState();

    const fetchCapital = () => {
        axios
        .get('europe-capitals.json')
        .then(res => {
            let capitals = res.data
            setCapitals(capitals);
            map.current.on('load', () => {
                map.current.addSource('capitals', {
                    type: 'geojson',
                    data: capitals
                })
        
                map.current.addLayer( {
                    'id': 'capitals-layer',
                    'type': 'symbol',
                    'source': 'capitals',
                    'layout': {
                        'icon-image': 'location',
                        'icon-offset': [0, -15],
                    },
                })

                map.current.on('click', 'capitals-layer', (e) => {

                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const name = e.features[0].properties.name;

                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                    
                    new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(name)
                    .addTo(map.current);
                    });             
            })
        })
        .catch(err => {
        // capitalFail(err);
        });
    }

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: config.MAPBOX_STYLE_URL,
        center: [lng, lat],
        zoom: zoom
        });  
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });

        fetchCapital();
    });

    return (
        <div>
            <Sidebar lng={lng} lat={lat} zoom={zoom}/>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default Map;