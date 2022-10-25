import {useState, useEffect} from 'react';
import {GeoJsonLayer} from '@deck.gl/layers';
import chroma from 'chroma-js';
import {colors} from '../helpers/colors';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';
import { IconLayer } from '@deck.gl/layers';
import { Api } from '../helpers/api';
// import UseShapefileLoader from '../hooks/UseShapefileLoader';

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 4.3,
    pitch: 30,
    bearing: 0
};

const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

export default function UsMap({data, shapefileCollection, setGisjoin, setCurrentShapeName}) {

    const [selectedState, setSelectedState] = useState('');
    const [selectedShape, setSelectedShape] = useState({});
    const [stateLayer, setStateLayer] = useState([]);
    const [countyLayer, setCountyLayer] = useState([]);

    const countyColors = chroma.scale([colors.countyLight, colors.countyDark]).colors(15);
    const stateColors = chroma.scale([colors.state, colors.state]).colors(15);

    useEffect(() => {
        if(Object.keys(selectedShape).length > 0) {
            setGisjoin(selectedShape.gisjoin);
            setCurrentShapeName(selectedShape.name);
        }
    }, [selectedShape]);

    useEffect(() => {
      if(shapefileCollection === 'COUNTY') {
          sendCountyShapefileRequest(selectedState);
      }
      else {
        setCountyLayer([]);
      }
    }, [shapefileCollection, selectedState]);

    useEffect(() => {
        console.log('useEffect to send initial shapefile request')
        sendShapefileRequest();
    }, []);

    const handleStateClick = (info, event) => {
        setSelectedState(info.object.name);
        setSelectedShape(info.object);
    }

    const handleCountyClick = (info, event) => {
      setSelectedShape(info.object);
    }

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

    let countyAsyncIterator;
    let stateAsyncIterator;

    const sendShapefileRequest = async() => {
        setStateLayer([]);
        setCountyLayer([]);
        const params = {
            'collection': 'state_geo',
            'state': ''
        };
        const body = Api.getRequestBody(params);
        let reader;
        await fetch(Api.url+'shapefiles', body).then(response => {
            reader = response.body.getReader();
        });
        stateAsyncIterator = await Api.createIterator(reader, stateColors);
        const layer = getGeoJsonLayer('statelayer', stateAsyncIterator, handleStateClick, 2);
        setStateLayer([layer]);
    }


    const sendCountyShapefileRequest = async(stateName) => {
        setCountyLayer([]);
        const params = {
            'collection': 'county_geo',
            'state': stateName
        };
        const body = Api.getRequestBody(params);
        let reader;
        await fetch(Api.url+'shapefiles', body).then(response => {
            reader = response.body.getReader();
        });
        countyAsyncIterator = await Api.createIterator(reader, countyColors);
        const layer = getGeoJsonLayer('countylayer', countyAsyncIterator, handleCountyClick, 1);
        setCountyLayer([layer]);
    }

    const getGeoJsonLayer = (id, asyncIterator, onShapeClick, lineWidth) => {
        return new GeoJsonLayer({
            id: id, 
            data: asyncIterator, 
            pickable: true,
            filled: true, 
            opacity: 0.01, 
            getFillColor: d => d.color,
            getLineColor: [0, 0, 0],
            truelineWidthScale: 15,
            lineWidthMinPixels: lineWidth,
            getLineWidth: 1,
            onClick: onShapeClick
        })
    }

    function getTooltip({object}) {
        return object && `${object.name}`;
    }

    return (
        <>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={[iconLayer, stateLayer, countyLayer]}
                getTooltip={getTooltip}
              >
                <StaticMap mapStyle={BASEMAP.POSITRON} />
            </DeckGL>
        </>
    );
}