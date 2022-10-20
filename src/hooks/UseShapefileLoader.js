import {useState, useEffect} from 'react'
import {GeoJsonLayer} from '@deck.gl/layers';

export default function UseShapefileLoads(props){
    const [shapefiles, setShapefiles] = useState([]);

    useEffect(() => {
        setShapefiles($.getJSON(`../library/shapefiles.${props.shapefileCollection}.json`));
    }, [props.shapefileCollection]);

    const layers = ([
        new GeoJsonLayer({id: 'geolayer', data: shapefiles, filled: true, getFillColor: [255,0,0,255]}),
    ]);
}