const dev = {
    MAPBOX_ACCESS_TOKEN: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    MAPBOX_STYLE_URL: process.env.REACT_APP_MAPBOX_STYLE_URL
}

const prod = {
    MAPBOX_ACCESS_TOKEN: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    MAPBOX_STYLE_URL: process.env.REACT_APP_MAPBOX_STYLE_URL
} 

export const config = process.env.NODE_ENV === "development" ? dev : prod;

