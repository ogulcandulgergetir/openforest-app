import React, { useRef, useEffect, useState } from "react";
import "./Sidebar.css";

function Sidebar( {lng,lat,zoom} ) {
    return (
        <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
    );
}

export default Sidebar;