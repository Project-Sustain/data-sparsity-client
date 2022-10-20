import {useState, useEffect} from 'react'
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';
import { IconLayer } from '@deck.gl/layers';
import {GeoJsonLayer} from '@deck.gl/layers';
// import minimalStateShapefiles from '../library/shapefiles/STATE_MINIMAL.json';
import stateShapefiles from '../library/shapefiles/STATE.json';
// import countyShapefiles from '../library/shapefiles/COUNTY.json';

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -105.086559,
    latitude: 40.573733,
    zoom: 13,
    pitch: 0,
    bearing: 0
};

const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

export default function UsMap({data, shapefileCollection}) {

    /*
    - Get all state shapefiles from mongodb, push into stateLayer
    - When a state is clicked, get all counties for that state into countyLayer
    - Selecting State or County from radios changes GISJOIN state in RequestForm.js,
        which is coming from the picked shapefile
    */

    const [stateLayer, setStateLayer] = useState([]);
    const [selectedState, setSelectedState] = useState('G080');
    const [countyLayer, setCountyLayer] = useState([]);

    useEffect(() => {
        const geoJsonLayer = new GeoJsonLayer({
            id: 'geojson', 
            data: stateShapefiles, 
            filled: true, 
            opacity: 0.01, 
            getFillColor: [76, 201, 240],
            getLineColor: [0, 0, 0],
            truelineWidthScale: 10,
            lineWidthMinPixels: 1,
            getLineWidth: 1,
        });
        setStateLayer(geoJsonLayer);
        
    }, [shapefileCollection]);
    

    const iconLayer = new IconLayer({
        id: 'icon-layer',
        pickable: true,
        data,
        iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
        iconMapping: ICON_MAPPING,
        sizeScale: 15,
        getIcon: d => 'marker',
        getPosition: d => d.coordinates,
        getSize: d => 2,
        getColor: d => d.color,
        getFillColor: d => d.color
    });

    return (
        <>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={[iconLayer, stateLayer, countyLayer]}
                getTooltip={({object}) => object && `${object.monitorId}\nAbsolute Sparsity Score: ${object.sparsityScore}`}
              >
                <StaticMap mapStyle={BASEMAP.POSITRON} />
            </DeckGL>
        </>
    );
}